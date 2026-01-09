import { Machine, MachineStatus, MachineStatusChange } from "../interfaces/machine.interface";
import { uuid } from "../interfaces/uuid.interface";

export interface MachinesState {
    machineById: Record<uuid, Machine | undefined>;
    currentStatusById: Record<uuid,MachineStatus | undefined>;
    changeCountById: Record<uuid, number | undefined>;
    historyById: Record<uuid, MachineStatusChange[] | undefined>;
    loadingById: Record<uuid, boolean | undefined>;
    errorById: Record<uuid, string | undefined>;
}