import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './components/catalog/Catalog';
import Register from './components/Register';
import About from './components/About';
import NoMatch from './components/NoMatch';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<About />}></Route>
                    <Route path='/catalog' element={<Catalog />} ></Route>
                    <Route path='/register' element={<Register />} ></Route>
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>

        </BrowserRouter>
    </React.StrictMode >
);