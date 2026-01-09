import { createActionGroup, props } from "@ngrx/store";
import { Machine, MachineStatusFromWebSocket } from "../interfaces/machine.interface";
import { uuid } from "../interfaces/uuid.interface";

export const MachineActions = createActionGroup({
    source: 'Machines',
    events: {
        'Websocket Status Received' : props<{payload:MachineStatusFromWebSocket}>(),
        'Load Machine': props<{id:uuid}>(),
        'Load Machine Success': props<{machine:Machine}>(),
        'Load Machine Failure': props<{id:uuid,error:string}>()
    }
});