import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { CameraView } from './components'
import { MapView } from './components/Map/MapView'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CameraView />
    <MapView/>
  </React.StrictMode>,
)
