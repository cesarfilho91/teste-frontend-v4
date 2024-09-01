import React from 'react';
import { useEquipmentContext } from '../contexts/EquipmentContext';
import { Equipment } from '../types';

interface EquipmentListProps {
    stateFilter: string;
    modelFilter: string;
}

const EquipmentList: React.FC<EquipmentListProps> = ({ stateFilter, modelFilter }) => {
    const { equipmentData, equipmentModels, equipmentStates, equipmentStateHistories } = useEquipmentContext();

    const getLatestStateId = (equipmentId: string) => {
        const stateHistory = equipmentStateHistories.find(s => s.equipmentId === equipmentId);
        if (stateHistory && stateHistory.states.length > 0) {
            return stateHistory.states[stateHistory.states.length - 1].equipmentStateId;
        }
        return null;
    };

    const filteredData = equipmentData.filter(equipment => {
        const latestStateId = getLatestStateId(equipment.id);
        const matchesState = stateFilter === '' || equipmentStates.find(s => s.id === latestStateId)?.name === stateFilter;
        const matchesModel = modelFilter === '' || equipmentModels.find(m => m.id === equipment.equipmentModelId)?.name === modelFilter;
        return matchesState && matchesModel;
    });

    return (
        <div>
            {filteredData.map(equipment => (
                <div key={equipment.id}>
                    {equipment.name}
                </div>
            ))}
        </div>
    );
};

export default EquipmentList;
