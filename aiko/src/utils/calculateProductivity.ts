// src/utils/calculateProductivity.ts
import { EquipmentState } from '../types';

export const calculateProductivity = (
    stateHistory: { date: string; equipmentStateId: string }[],
    equipmentStates: EquipmentState[]
): number => {
    const totalHours = stateHistory.length;
    const operatingHours = stateHistory.filter(entry => {
        const state = equipmentStates.find(s => s.id === entry.equipmentStateId);
        return state?.name === 'Operando';
    }).length;

    return totalHours > 0 ? (operatingHours / totalHours) * 100 : 0;
};
