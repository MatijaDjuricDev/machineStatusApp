import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MachineStatusComponent } from '../machine-status/machine-status.component';
import { Machine, MachineStatus } from '../../../interfaces/machine.interface';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectChangeCountById, selectHistoryById, selectMachineById, selectStatusById } from '../../../state/machines.selectors';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MachineStatusComponent, MatCardModule, AsyncPipe, DatePipe],
})
export class MachineComponent {
  public MachineStatus = MachineStatus;
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  machineId$ = this.route.paramMap.pipe(
    map(p => p.get('id') as string),
    distinctUntilChanged()
  );

  machine$(id:string){
    return this.store.select(selectMachineById(id));
  }

  status$(id:string){
    return this.store.select(selectStatusById(id));
  }

  count$(id:string){
      return this.store.select(selectChangeCountById(id))
  }

  history$(id:string){
    return this.store.select(selectHistoryById(id));
  }
}
