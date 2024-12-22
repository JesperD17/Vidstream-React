import './css/general.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

// standard components
import Header from './componants/header/header';
import Footer from './componants/footer/footer';
import Homepage from './componants/api/Allapi';

// pages components
import Skeleton from './componants/skeleton/skeleton';



const homepage = ReactDOM.createRoot(document.getElementById('all_homepage'));
homepage.render(
  <div>
    <Header />
      <Skeleton />
      <Homepage />
    <Footer />
  </div> 
);


