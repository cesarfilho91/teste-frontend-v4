import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Modal, Button } from 'react-bootstrap';
import { EquipmentStateHistory, EquipmentState } from '../types';

interface EquipmentHistoryModalProps {
    show: boolean;
    onHide: () => void;
    history: EquipmentStateHistory | null;
    states: EquipmentState[];
    equipmentName: string;
}

const EquipmentHistoryModal: React.FC<EquipmentHistoryModalProps> = ({ show, onHide, history, states, equipmentName }) => {
    if (!history) return null;

    // Reverter a ordem dos itens da lista
    const sortedStates = [...history.states].reverse();

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Histórico de estados - {equipmentName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className="list-group">
                    {sortedStates.map((state, index) => {
                        const equipmentState = states.find(s => s.id === state.equipmentStateId);
                        return (
                            <li key={index} className="list-group-item">
                                {equipmentState ? (
                                    <span style={{ color: equipmentState.color }}>
                                        {equipmentState.name} - {format(new Date(state.date), 'dd/MM/yyyy - HH:mm:ss', { locale: ptBR })}
                                    </span>
                                ) : (
                                    'Estado desconhecido'
                                )}
                            </li>
                        );
                    })}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EquipmentHistoryModal;