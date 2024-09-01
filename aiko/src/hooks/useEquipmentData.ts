import { useEffect, useState } from 'react';
import { fetchData } from '../services/api';
import { Equipment, EquipmentModel, EquipmentState, EquipmentStateHistory, EquipmentPositionHistory } from '../types';

export const useEquipmentData = () => {
    const [positions, setPositions] = useState<EquipmentPositionHistory[]>([]);
    const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
    const [equipmentModels, setEquipmentModels] = useState<EquipmentModel[]>([]);
    const [equipmentStates, setEquipmentStates] = useState<EquipmentState[]>([]);
    const [equipmentStateHistories, setEquipmentStateHistories] = useState<EquipmentStateHistory[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const positionsData = await fetchData('equipmentPositionHistory.json');
                const equipmentData = await fetchData('equipment.json');
                const equipmentModels = await fetchData('equipmentModel.json');
                const equipmentStates = await fetchData('equipmentState.json');
                const equipmentStateHistories = await fetchData('equipmentStateHistory.json');

                setPositions(positionsData);
                setEquipmentData(equipmentData);
                setEquipmentModels(equipmentModels);
                setEquipmentStates(equipmentStates);
                setEquipmentStateHistories(equipmentStateHistories);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        loadData();
    }, []);

    return { positions, equipmentData, equipmentModels, equipmentStates, equipmentStateHistories };
};