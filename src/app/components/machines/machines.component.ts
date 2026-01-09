import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MachineStatusComponent } from './machine-status/machine-status.component';
import { Machine, MachineStatus } from '../../interfaces/machine.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { selectAllMachines, selectChangeCountById, selectStatusById } from '../../state/machines.selectors';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule, MachineStatusComponent, MatListModule, MatBadgeModule, MatButtonModule,AsyncPipe],
})
export class MachinesComponent {
  public MachineStatus = MachineStatus;
  private store = inject(Store);

  machines$: Observable<(Machine|undefined)[]> = this.store.select(selectAllMachines);

  status$(id:string){
    return this.store.select(selectStatusById(id));
  }

  count$(id:string){
    return this.store.select(selectChangeCountById(id))
  }


}