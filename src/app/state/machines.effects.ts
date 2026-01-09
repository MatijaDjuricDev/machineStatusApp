import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Socket } from "ngx-socket-io";
import { MachineActions } from "./machines.actions";
import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map, withLatestFrom } from 'rxjs/operators';
import { Machine, MachineStatusFromWebSocket } from "../interfaces/machine.interface";
import { selectLoadingById, selectMachinesById } from "./machines.selectors";

@Injectable()
export class MachinesEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private socket = inject(Socket);
    private http = inject(HttpClient);

    websocketStatus$ = createEffect(() =>
    this.socket
      .fromEvent<MachineStatusFromWebSocket,'MACHINE_STATUS_CHANGES'>('MACHINE_STATUS_CHANGES')
      .pipe(map((payload) => MachineActions.websocketStatusReceived({ payload })))
    );

    loadMachineIfMissing$ = createEffect(() =>
    this.actions$.pipe(
            ofType(MachineActions.websocketStatusReceived),

            withLatestFrom(this.store.select(selectMachinesById), this.store.select(selectLoadingById)),

            filter(([{ payload }, machinesById, loadingById]) => !machinesById[payload.id] && !loadingById[payload.id]),

            map(([{ payload }]) =>
            MachineActions.loadMachine({ id: payload.id })
            )
        )
    );

    loadMachine$ = createEffect(() =>
        this.actions$.pipe(

            ofType(MachineActions.loadMachine),

            exhaustMap(({ id }) =>

                this.http.get<Machine>(`http://localhost:3000/machines/${id}`).pipe(

                    map((machine) => MachineActions.loadMachineSuccess({ machine })),
            
                    catchError((error) =>
                        of(MachineActions.loadMachineFailure({id,error: error?.message ?? 'Machine load failed'})))

                ))));

}