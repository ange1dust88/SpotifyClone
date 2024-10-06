import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { DataLayer } from './DataLayer.jsx'
import reducer, { initialState } from './reducer.jsx'
import './style/index.css'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataLayer>
  </StrictMode>,
)
