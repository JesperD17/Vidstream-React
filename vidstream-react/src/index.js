import './css/general.css';
import './css/cards.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

// standard components
import Header from './componants/header/header';
import Footer from './componants/footer/footer';
import Homepage from './componants/api/Allapi';

// pages components
// import Timer from './componants/timerTest/timer';


const homepage = ReactDOM.createRoot(document.getElementById('all_homepage'));
homepage.render(
  <div>
    <Header />
      {/* <Timer /> */}
      <Homepage />
    <Footer />
  </div> 
);


// import React from 'react';
// import ReactDOM from 'react-dom/client';

// // standard components
// import { Demo } from './componants/global functions/buttonForCards';
// // pages components
// // import Timer from './componants/timerTest/timer';


// const homepage = ReactDOM.createRoot(document.getElementById('all_homepage'));
// homepage.render(
//   <div>
//     <Demo />
//   </div> 
// );




