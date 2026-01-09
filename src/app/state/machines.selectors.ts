import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MachinesState } from "./machines.state";

export const selectMachinesState = 
    createFeatureSelector<MachinesState>('machines');

export const selectMachinesById = createSelector(
    selectMachinesState,
    (state)=> state.machineById
)

export const selectStatusesById = createSelector(
    selectMachinesState,
    (state)=> state.currentStatusById
)

export const selectChangeCountsById = createSelector(
    selectMachinesState,
    (state)=> state.changeCountById
)

export const selectHistoriesById = createSelector(
    selectMachinesState,
    (state)=> state.historyById
)

export const selectLoadingById = createSelector(
    selectMachinesState,
    (state)=> state.loadingById
)

export const selectErrorsById = createSelector(
    selectMachinesState,
    (state)=> state.errorById
)

export const selectAllMachines = createSelector(
    selectMachinesById,
    (machines)=> Object.values(machines)
);

export const selectMachineById = (id:string)=>
    createSelector(
        selectMachinesById,
        (machines)=> machines[id]
    )

export const selectStatusById = (id:string)=>
    createSelector(
        selectStatusesById,
        (statuses)=> statuses[id]
    )

export const selectChangeCountById = (id:string)=>
    createSelector(
        selectChangeCountsById,
        (counts)=> counts[id]
    )

export const selectHistoryById = (id:string)=>
    createSelector(
        selectHistoriesById,
        (histories)=> histories[id]
    )

export const selectLoadingForId = (id:string)=>
    createSelector(
        selectLoadingById,
        (loading)=> loading[id]
    )

export const selectErrorForId = (id:string)=>
    createSelector(
        selectErrorsById,
        (errors)=> errors[id]
    )




    