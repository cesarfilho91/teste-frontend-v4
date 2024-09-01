import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import { Equipment, EquipmentModel, EquipmentState, EquipmentStateHistory, EquipmentPositionHistory } from '../types';

interface EquipmentContextData {
    positions: EquipmentPositionHistory[];
    equipmentData: Equipment[];
    equipmentModels: EquipmentModel[];
    equipmentStates: EquipmentState[];
    equipmentStateHistories: EquipmentStateHistory[];
}

const EquipmentContext = createContext<EquipmentContextData | undefined>(undefined);

export const EquipmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [positions, setPositions] = useState<EquipmentPositionHistory[]>([]);
    const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
    const [equipmentModels, setEquipmentModels] = useState<EquipmentModel[]>([]);
    const [equipmentStates, setEquipmentStates] = useState<EquipmentState[]>([]);
    const [equipmentStateHistories, setEquipmentStateHistories] = useState<EquipmentStateHistory[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const positionsData = await fetchData('/data/equipmentPositionHistory.json');
                const equipmentData = await fetchData('/data/equipment.json');
                const equipmentModels = await fetchData('/data/equipmentModel.json');
                const equipmentStates = await fetchData('/data/equipmentState.json');
                const equipmentStateHistories = await fetchData('/data/equipmentStateHistory.json');

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

    return (
        <EquipmentContext.Provider value={{ positions, equipmentData, equipmentModels, equipmentStates, equipmentStateHistories }}>
            {children}
        </EquipmentContext.Provider>
    );
};

export const useEquipmentContext = () => {
    const context = useContext(EquipmentContext);
    if (!context) {
        throw new Error('useEquipmentContext must be used within an EquipmentProvider');
    }
    return context;
};