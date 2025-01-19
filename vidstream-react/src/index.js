import './css/general.css';
import './css/cards.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// standard components
import Header from './componants/header/header';
import Footer from './componants/footer/footer';
import Homepage from './componants/Pages/HomePage/Homepage';
// page 
import Status from "./componants/Pages/StatusPage/Status";
import Info from "./componants/Pages/InfoPage/Info";
import Sources from "./componants/Pages/SourcesPage/Sources";

import Search from './componants/Pages/searchPage/Search';

const homepage = ReactDOM.createRoot(document.getElementById('all_homepage'));
homepage.render(
  <div id="Routing">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Status" element={<Status />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Sources" element={<Sources />} />

        <Route path="/Search" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
);