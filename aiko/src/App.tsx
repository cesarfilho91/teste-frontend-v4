import React from 'react';
import { EquipmentProvider } from './contexts/EquipmentContext';
import Map from './components/Map';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
        <EquipmentProvider>
            <Map />
        </EquipmentProvider>
    );
};

export default App;