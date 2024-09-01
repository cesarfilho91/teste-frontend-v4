import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap, Polyline } from 'react-leaflet';
import { useEquipmentContext } from '../contexts/EquipmentContext';
import PopupContent from './PopupContent';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map.scss';
import { calculateProductivity } from '../utils/calculateProductivity';
import { calculateGain } from '../utils/calculateGain';
import CaminhaoCargaIcon from '../assets/icons/caminhao-carga.png';
import HarvesterIcon from '../assets/icons/harvester.png';
import GarraTracadoraIcon from '../assets/icons/garra-tracadora.png';
import DefaultIcon from '../assets/icons/default.png';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const getIconByModelId = (modelId: string): L.Icon => {
    const iconSize: L.PointTuple = [50, 54];
    const iconAnchor: L.PointTuple = [16, 32];
    const popupAnchor: L.PointTuple = [0, -32];

    switch (modelId) {
        case 'a3540227-2f0e-4362-9517-92f41dabbfdf':
            return new L.Icon({
                iconUrl: CaminhaoCargaIcon,
                iconSize,
                iconAnchor,
                popupAnchor,
            });
        case 'a4b0c114-acd8-4151-9449-7d12ab9bf40f':
            return new L.Icon({
                iconUrl: HarvesterIcon,
                iconSize,
                iconAnchor,
                popupAnchor,
            });
        case '9c3d009e-0d42-4a6e-9036-193e9bca3199':
            return new L.Icon({
                iconUrl: GarraTracadoraIcon,
                iconSize,
                iconAnchor,
                popupAnchor,
            });
        default:
            return new L.Icon({
                iconUrl: DefaultIcon,
                iconSize: [50, 83],
                iconAnchor,
                popupAnchor,
            });
    }
};

const MapUpdater: React.FC<{ positions: L.LatLngTuple[] }> = ({ positions }) => {
    const map = useMap();

    useEffect(() => {
        if (positions.length > 0) {
            const bounds = new L.LatLngBounds(positions);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [positions, map]);

    return null;
};

const Map: React.FC = () => {
    const { equipmentData, equipmentModels, equipmentStates, equipmentStateHistories, positions } = useEquipmentContext();

    const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
    const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [routePositions, setRoutePositions] = useState<LatLngTuple[] | null>(null);
    const [routeMarkers, setRouteMarkers] = useState<LatLngTuple[] | null>(null);

    const getLatestPosition = (equipmentId: string): LatLngTuple | null => {
        const equipmentPositions = positions.find(p => p.equipmentId === equipmentId);
        if (equipmentPositions && equipmentPositions.positions.length > 0) {
            const latestPosition = equipmentPositions.positions[equipmentPositions.positions.length - 1];
            return [latestPosition.lat, latestPosition.lon] as LatLngTuple;
        }
        return null;
    };

    const getLatestState = (equipmentId: string) => {
        const stateHistory = equipmentStateHistories.find(s => s.equipmentId === equipmentId);
        if (stateHistory && stateHistory.states.length > 0) {
            const latestStateId = stateHistory.states[stateHistory.states.length - 1].equipmentStateId;
            return equipmentStates.find(state => state.id === latestStateId);
        }
        return null;
    };

    const getEquipmentProductivity = (equipmentId: string) => {
        const stateHistory = equipmentStateHistories.find(s => s.equipmentId === equipmentId)?.states ?? [];
        return calculateProductivity(stateHistory, equipmentStates);
    };

    const getEquipmentGain = (equipmentId: string) => {
        const stateHistory = equipmentStateHistories.find(s => s.equipmentId === equipmentId)?.states ?? [];
        return calculateGain(stateHistory, equipmentStates, equipmentModels);
    };

    const filteredEquipmentData = equipmentData.filter(equipment => {
        const latestState = getLatestState(equipment.id);
        const isStateMatch = selectedStateId ? latestState?.id === selectedStateId : true;
        const isModelMatch = selectedModelId ? equipment.equipmentModelId === selectedModelId : true;
        const isSearchMatch = equipment.name.toLowerCase().includes(searchQuery.toLowerCase());
        return isStateMatch && isModelMatch && isSearchMatch;
    });

    const positionsForMap = filteredEquipmentData
        .map(equipment => getLatestPosition(equipment.id))
        .filter((position): position is L.LatLngTuple => position !== null);

    const handleShowRouteHistory = (equipmentId: string) => {
        const equipmentPositions = positions.find(p => p.equipmentId === equipmentId);
        if (equipmentPositions) {
            const routeCoords = equipmentPositions.positions.map(pos => [pos.lat, pos.lon] as LatLngTuple);
            setRoutePositions(routeCoords);
        }
    };

    const handleClearRouteHistory = () => {
        setRoutePositions(null);
    };

    return (
        <>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Pesquisar por equipamento"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select value={selectedStateId || ''} onChange={(e) => setSelectedStateId(e.target.value || null)}>
                    <option value="">Todos os Estados</option>
                    {equipmentStates.map(state => (
                        <option key={state.id} value={state.id}>
                            {state.name}
                        </option>
                    ))}
                </select>

                <select value={selectedModelId || ''} onChange={(e) => setSelectedModelId(e.target.value || null)}>
                    <option value="">Todos os Modelos</option>
                    {equipmentModels.map(model => (
                        <option key={model.id} value={model.id}>
                            {model.name}
                        </option>
                    ))}
                </select>
            </div>

            <MapContainer center={[-19.126536, -45.947756]} zoom={13} style={{ height: '100vh', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapUpdater positions={positionsForMap} />
                {filteredEquipmentData.map((equipment) => {
                    const latestPosition = getLatestPosition(equipment.id);
                    const latestState = getLatestState(equipment.id);
                    const equipmentModel = equipmentModels.find(m => m.id === equipment.equipmentModelId);
                    const equipmentHistory = equipmentStateHistories.find(h => h.equipmentId === equipment.id);

                    if (!latestPosition || !latestState || !equipmentModel) return null;

                    const productivity = getEquipmentProductivity(equipment.id);
                    const gain = getEquipmentGain(equipment.id);

                    return (
                        <Marker key={equipment.id} position={latestPosition} icon={getIconByModelId(equipment.equipmentModelId)}>
                            <Tooltip
                                className="custom-tooltip"
                                direction="top"
                                offset={[0, -10]}
                                opacity={1}
                                sticky
                            >
                                <div className="tooltip-content" style={{ backgroundColor: latestState.color }}>
                                    {equipment.name}
                                    <br />
                                    {latestState.name}
                                </div>
                            </Tooltip>
                            <Popup>
                                <PopupContent
                                    equipment={equipment}
                                    model={equipmentModel}
                                    state={latestState}
                                    history={equipmentHistory || null}
                                    states={equipmentStates}
                                    productivity={productivity}
                                    gain={gain}
                                    onShowRouteHistory={() => handleShowRouteHistory(equipment.id)}
                                    onClearRouteHistory={handleClearRouteHistory}
                                />
                            </Popup>
                        </Marker>
                    );
                })}
                {routePositions && (
                    <Polyline positions={routePositions} color="blue" weight={4} />
                )}
                {routeMarkers && routeMarkers.map((position, index) => (
                    <Marker key={index} position={position} icon={getIconByModelId('default')} />
                ))}
            </MapContainer>
        </>
    );
};

export default Map;
