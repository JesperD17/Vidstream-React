import './css/general.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

// import Swr from './componants/api/api';
// import { tab } from '@testing-library/user-event/dist/tab';

// standard components
import Header from './componants/header/header';
import Footer from './componants/footer/footer';
import Swr from './componants/api/api';

// pages components
import Homepage from './componants/homepage/homePage';

<tab forceRenderTabPanel={true} />
const homepage = ReactDOM.createRoot(document.getElementById('all_homepage'));
homepage.render(
  <div>
    <Header />
      <Homepage />
      <Swr />
    <Footer />
  </div>
  
);


