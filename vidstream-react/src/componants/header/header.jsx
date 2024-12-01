
import './header.css';

import React, { useState } from 'react';


// import collapse from '../../js/collapsibleIcons';

// function icons() {
// }



function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  function icons() {
    setMenuActive(!menuActive)
  }
  function searchStyle() {
    setSearchActive(!searchActive)
  }

  // function for screen width to shw 'links a' on specific width and the nuse menuActive under specific width. 
  function screenWidth() {
    
  }
  return (
    <>
    {/* Logo's */}
     <a href="http://localhost/Vidstream/Vidstream/Onscreen/html/homepage.php">
      <img id="logo" src="../pics/2e logo kopie.png"/>
      <img id="logo2" src="../pics/Logo Icon.png"/>
    </a>
    
      {/* Link bar */}
      <div className="alignBars">
        <div className="Full_collapsible_content">
          <div id="content">
          
              <i className={"bx " + (!menuActive ? 'bx-align-left' : 'bx-align-middle')} 
              onClick={icons}></i>
              {menuActive &&
            <summary>
              <div className="links">
                <a href="http://localhost/Vidstream/Vidstream/Onscreen/html/homepage.php" className="hover">HOME</a>
                <a href="#" className="hover">NEWS</a>
                <a href="#" className="hover">IN THEATERS</a>
                <a href="#" className="hover">COMING SOON</a>
                <a href="#" className="hover">CONTACT</a>
                <a href="#" className="hover">ADVERTISE</a>
              </div>
           </summary>
                }
          
          </div>
        </div>

        {/* Search bar */}
        <div className="full_search_bar">
          <i id="searchIcon1"
          className={"bx " + (!searchActive ? 'bx-search bx-tada' : 'bxs-search')} onClick={searchStyle}></i>
        {searchActive &&
          <div id="search">
            <input type="text" name="search-field" placeholder="Zoeken..." id="search-field" className="blink search-field"/>
              
              <i id="IconNoClick" className="bx bx-search bx-tada"></i>
            {/* </input> */}
          </div>
            } 
        </div>
        {/* End search bar */}
      </div>
      {/* End link bar */}

    </>


  );
}
// collapse()

export default Header;