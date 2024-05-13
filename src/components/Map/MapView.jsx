import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet" 
import 'leaflet/dist/leaflet.css'
import './Map.css'
import { useSocketData } from "../../Hooks/useSocketData";
import { useState, useEffect } from "react";

export const MapView=()=>{

    const data=useSocketData();
    const [mapPosition, setMap] = useState([0,0])
    const [Position, setPosition] = useState([0,0])

    useEffect(() => {
        if (data.Lat && data.Lng) {
            setMap([data.Lat, data.Lng])
        }
    }, [])
    
    useEffect(() => {
        if (data.Lat && data.Lng) {
            setPosition([data.Lat, data.Lng])
        }
    }, [data])

    return (
        <div className="map-box">
            <MapContainer
                className='map-container'
                center={mapPosition}
                zoom={13}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker 
                    position={Position} 
                >
                    <Popup>
                        Soldado 1
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
