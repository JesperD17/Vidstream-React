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
import News from "./componants/Pages/NewsPage/News";
import Movies from "./componants/Pages/MoviesPage/Movies";
import Series from "./componants/Pages/SeriesPage/Series";
import Info from "./componants/Pages/InfoPage/Info";
import Sources from "./componants/Pages/SourcesPage/Sources";

const homepage = ReactDOM.createRoot(document.getElementById('all_homepage'));
homepage.render(
  <div>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route>
          <Route path="/" element={<Homepage />}>
            <Route path="News" element={<News />} />
            <Route path="Movies" element={<Movies />} />
            <Route path="Series" element={<Series />} />
            <Route path="Info" element={<Info />} />
            <Route path="Sources" element={<Sources />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
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




