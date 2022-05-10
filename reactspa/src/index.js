import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './components/catalog/Catalog';
import Register from './components/Register';
import About from './components/About';
import NoMatch from './components/NoMatch';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';
import PaperIssuesList from './components/catalog/PaperIssuesList';
import IssueView from './components/catalog/IssueView';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ListingView from './components/listing/ListingView';
import CreateListing from './components/listing/CreateListing';

const root = ReactDOM.createRoot(document.getElementById('root'));
const engine = new Styletron();

root.render(
    <React.StrictMode>
        <HelmetProvider>
            <Helmet>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Helmet>
            <StyletronProvider value={engine}>
                <BaseProvider theme={LightTheme}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<App />}>
                                <Route index element={<About />}></Route>
                                <Route path='/catalog' element={<Catalog />} ></Route>
                                <Route path='/lccn/:lccn' element={<PaperIssuesList />} ></Route>
                                <Route path='/lccn/:lccn/issue/:date/:edition' element={<IssueView />} ></Route>
                                <Route path='/lccn/:lccn/issue/:date/:edition/new' element={<CreateListing />} ></Route>
                                <Route path='/register' element={<Register />} ></Route>
                                <Route path='/listing/:id' element={<ListingView />} ></Route>
                                <Route path="*" element={<NoMatch />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </BaseProvider>
            </StyletronProvider>
        </HelmetProvider>
    </React.StrictMode >
);