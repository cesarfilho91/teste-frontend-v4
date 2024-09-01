// src/utils/calculateGain.ts

import { EquipmentState, EquipmentModel, EquipmentStateHistory } from '../types';

export const calculateGain = (
    stateHistory: EquipmentStateHistory['states'],
    equipmentStates: EquipmentState[],
    equipmentModels: EquipmentModel[]
): number => {
    let totalGain = 0;

    stateHistory.forEach((stateEntry) => {
        // Encontrar o estado associado à entrada do histórico
        const state = equipmentStates.find(s => s.id === stateEntry.equipmentStateId);
        if (state) {
            // Encontrar o modelo de equipamento usando a relação apropriada (por exemplo, por ID de equipamento se disponível)
            const model = equipmentModels.find(m => m.hourlyEarnings.some(e => e.equipmentStateId === state.id));
            if (model) {
                // Encontrar o valor de ganho por hora para o estado
                const earning = model.hourlyEarnings.find(e => e.equipmentStateId === state.id)?.value ?? 0;
                // Adicionar ao ganho total
                totalGain += earning;
            }
        }
    });

    return totalGain;
};
