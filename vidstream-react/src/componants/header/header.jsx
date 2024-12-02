
import './header.css';

import React, { useState, useEffect } from 'react';

// import collapse from '../../js/collapsibleIcons';

// function icons() {
// }



function Header() {

  // Icons onclick changes icon.
  const [menuActive, setMenuActive] = useState(false);
  function menStyle() {
    setMenuActive(!menuActive)
  }

  const [searchActive, setSearchActive] = useState(false);
  function searchStyle() {
    setSearchActive(!searchActive)
  }

  // changes things on screen width change.

  
  window.addEventListener("resize", handleResize);
  function handleResize() {

    // useEffect(() => {
      if (window.innerWidth < 1586) {
        // setMenuActive(!menuActive);
        console.log("1");
      }
      else {
        console.log("2")
        setMenuActive(!menuActive);
      }
      
      if (window.innerWidth < 700) {
        console.log(window.innerWidth);
      }
      else {
        console.log("aaa");
        setSearchActive(!searchActive);
      }
    // }, [])
    console.log(window.innerWidth);
    return () => window.removeEventListener("resize", handleResize);
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
                onClick={menStyle}>
              </i>

            {menuActive &&
              <summary>
                <div className="links">
                  <a href="http://localhost/Vidstream/Vidstream/Onscreen/html/homepage.php" 
                  className="hover">
                    <div className="spaceBetween">
                      HOME 
                      <i class='bx bxs-chevron-right'></i>
                    </div>
                  </a> 
                  <a href="#" 
                  className="hover">
                    <div className="spaceBetween">
                      NEWS 
                      <i class='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                  <a href="#" 
                  className="hover">
                    <div className="spaceBetween">
                      IN THEATERS 
                      <i class='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                  <a href="#" 
                  className="hover">
                    <div className="spaceBetween">
                      COMING SOON 
                      <i class='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                  <a href="#" 
                  className="hover">
                    <div className="spaceBetween">
                      CONTACT 
                      <i class='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                  <a href="#" 
                  className="hover">
                    <div className="spaceBetween">
                      ADVERTISE 
                      <i class='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                </div>
            </summary>
            }
          
          </div>
        </div>

        {/* Search bar */}
        <div className="full_search_bar">
          <i id="searchIcon1"
            className={"bx " + (!searchActive ? 'bx-search bx-tada' : 'bxs-search')} 
            onClick={searchStyle}>
          </i>

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