import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { machinesReducer } from './state/machines.reducer';
import { MachinesEffects } from './state/machines.effects';

const socketIoConfig: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    transports: ['websocket', 'polling'],
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(SocketIoModule.forRoot(socketIoConfig)),
    provideStore({}),
    provideEffects([MachinesEffects]),
    provideState('machines',machinesReducer),
    provideStoreDevtools({maxAge: 25}),
  ],
};
