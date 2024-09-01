import React, { useState } from 'react';
import { Equipment, EquipmentModel, EquipmentState, EquipmentStateHistory } from '../types';
import EquipmentHistoryModal from './EquipmentHistoryModal';

interface PopupContentProps {
    equipment: Equipment;
    model: EquipmentModel;
    state: EquipmentState;
    history: EquipmentStateHistory | null;
    states: EquipmentState[];
    productivity: number;
    gain: number;
    onShowRouteHistory: () => void; // Nova prop para exibir rotas
    onClearRouteHistory: () => void; // Nova prop para limpar histórico de rotas
}

const PopupContent: React.FC<PopupContentProps> = ({
    equipment,
    model,
    state,
    history,
    states,
    productivity,
    gain,
    onShowRouteHistory,
    onClearRouteHistory
}) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="popup-content" style={{ backgroundColor: state.color }}>
            <h4>Equipamento: {equipment.name}</h4>
            <p>Modelo: {model.name}</p>
            <p>Estado: {state.name}</p>
            <p>Produtividade Média: {productivity.toFixed(2)}%</p>
            <p>Ganho Médio: {gain.toFixed(2)}</p>
            <hr />
            <button className="btn btn-light btn-sm mt-3" onClick={() => setModalShow(true)}>
                Histórico de estados do equipamento
            </button>
            <hr />
            <button className="btn btn-light btn-sm mt-3" onClick={onShowRouteHistory}>
                Histórico de Rotas
            </button>
            <button className="btn btn-light btn-sm mt-3" onClick={onClearRouteHistory}>
                Limpar Histórico de Rotas
            </button>

            <EquipmentHistoryModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                history={history}
                states={states}
                equipmentName={equipment.name}
            />
        </div>
    );
};

export default PopupContent;
