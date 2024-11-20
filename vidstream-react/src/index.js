import React from 'react';

import './css/general';
import Header from './htmlStructure/header';
import Footer from './htmlStructure/footer';

const header = ReactDOM.createRoot(document.getElementById('header'));
header.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>
);

const footer = ReactDOM.createRoot(document.getElementById('footer'));
footer.render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>
);

import ReactDOM from 'react-dom/client';