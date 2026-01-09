import { createReducer, on } from "@ngrx/store";
import { MachinesState } from "./machines.state";
import { MachineActions } from "./machines.actions";

export const initialState : MachinesState = {
    machineById: {},
    currentStatusById: {},
    changeCountById: {},
    historyById: {},
    loadingById: {},
    errorById: {}
};

export const machinesReducer = createReducer(
    initialState,
    on(MachineActions.websocketStatusReceived, (state,{payload})=>{
        const id = payload.id;
        const previousStatus = state.currentStatusById[id];

        if(previousStatus === payload.status){
            return state;
        }

        const previousHistory = state.historyById[id] ?? [];
        const previousCount = state.changeCountById[id] ?? 0;

        return{
            ...state,
            historyById:{
                ...state.historyById,
                [id]:[...previousHistory, {timestamp:Date.now(), status:payload.status}],
            },
            currentStatusById:{
                ...state.currentStatusById,
                [id]:payload.status
            },
            changeCountById:{
                ...state.changeCountById,
                [id]:previousCount + 1
            }
        }
    }),
    on(MachineActions.loadMachine, (state,{id})=>{
        return {
            ...state,
            loadingById: {...state.loadingById, [id]: true},
            errorById: {...state.errorById, [id]: undefined},
        };
    }),
    on(MachineActions.loadMachineSuccess, (state,{machine})=>{
        return{
            ...state,
            loadingById: {...state.loadingById, [machine.id]: false},
            machineById: {...state.machineById, [machine.id]: machine},
        };
    }),
    on(MachineActions.loadMachineFailure, (state,{id,error})=>{
        return{
            ...state,
            loadingById: {...state.loadingById,[id]: false},
            errorById: {...state.errorById, [id]: error},
        };
    })
);  