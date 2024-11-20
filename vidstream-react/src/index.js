import './css/general.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import Header from './htmlStructure/header';
import Footer from './htmlStructure/footer';
import Slideshow from './htmlStructure/slideshow';

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

const slideshow = ReactDOM.createRoot(document.getElementById('slideshow'));
slideshow.render(
  <React.StrictMode>
    <Slideshow />
  </React.StrictMode>
);
