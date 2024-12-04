
import './header.css';

import React, { useState, useEffect } from 'react';


function Header() {
  // Icons onclick changes icon.
  var stateMenu = false; // refresh active icons true or false.
  var stateSearch = false;
  if (window.innerWidth > 1586) {
    stateMenu = true;
  } else {
    stateMenu = false;
  }
  if (window.innerWidth > 700) { 
    stateSearch = true;
  } else {
    stateSearch = false;
  }

  const [menuActive, setMenuActive] = useState(stateMenu);
  function menuStyle() {
    setMenuActive(!menuActive)
  }

  const [searchActive, setSearchActive] = useState(stateSearch);
  function searchStyle() {
    setSearchActive(!searchActive)
  }

  document.addEventListener("DOMContentLoaded", (event) => {
  })

  // changes things on screen width change.
  useEffect(() => {
    const handleResize = () => {
      console.log("Screen width = ", window.innerWidth);
      if (window.innerWidth > 1586) { // menu higher then screen width
        setMenuActive(menuActive);
      } 
      else {
        setMenuActive(!menuActive);
      }

      if (window.innerWidth > 700) { // searchbar higher then screen width
        setSearchActive(searchActive);
      } 
      else {
        setSearchActive(!searchActive);
      }
    };
    // adds the event listener
    window.addEventListener("resize", handleResize);
    // removes the even listener so there isnt a loop
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  return (
  <div id="navigation">
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
                onClick={menuStyle}>
              </i>

            {menuActive &&
              <summary>
                <div className="links">
                  <a href="http://localhost/Vidstream/Vidstream/Onscreen/html/homepage.php" 
                  className="hover">
                    <div className="spaceBetween">
                      HOME 
                      <i className='bx bxs-chevron-right'></i>
                    </div>
                  </a> 
                  <a href="#" 
                  className="hover">
                    <div className="spaceBetween">
                      NEWS 
                      <i className='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                  <a href="#" 
                  className="hover">
                    <div className="spaceBetween">
                      IN THEATERS 
                      <i className='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                  <a href="#" 
                  className="hover">
                    <div className="spaceBetween">
                      COMING SOON 
                      <i className='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                  <a href="#" 
                  className="hover">
                    <div className="spaceBetween">
                      CONTACT 
                      <i className='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                  <a href="#" 
                  className="hover">
                    <div className="spaceBetween">
                      ADVERTISE 
                      <i className='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                </div>
            </summary>
            }
          
          </div>
        </div>

        {/* Search bar, icons for searchbar */}
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
      </div>

    </div>


  );
}
// collapse()

export default Header;