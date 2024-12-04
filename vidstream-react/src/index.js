import './css/general.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import LoadInAPI from './componants/api/api';

// standard components
import Header from './componants/header/header';
import Footer from './componants/footer/footer';

// pages components
import Homepage from './componants/homepage/homePage';


const homepage = ReactDOM.createRoot(document.getElementById('all_homepage'));
homepage.render(
  <React.StrictMode>
    <LoadInAPI />
    <Header />
      <Homepage />
    <Footer />
  </React.StrictMode>
);


