import './header.css';
import React, { useState, useEffect, useRef } from 'react';

import { useLocation } from 'react-router-dom';
import { SearchBar } from './searchBar';
// import Searching from '../Pages/searchPage/Search';

import { Link } from "react-router-dom";

function Header() {

  // collapsible items.
  var itemOneBoolean;
  if (window.innerWidth > 1400) {
    itemOneBoolean = true
  } else {
    itemOneBoolean = false
  }

  var itemTwoBoolean;
  if (window.innerWidth > 700) {
    itemTwoBoolean = true
  } else {
    itemTwoBoolean = false
  }
  
  const [menuActive, setMenuActive] = useState(itemOneBoolean);
  const [searchActive, setSearchActive] = useState(itemTwoBoolean);

  function menuStyle() {
    if (searchActive && window.innerWidth < 700) { // if Search is active closes it
      setSearchActive(!searchActive)
    }
    if(window.innerWidth < 1400) {

      setMenuActive(!menuActive)
    }
  }

  function searchStyle() {
    if (menuActive && window.innerWidth < 1400) { // if Menu is active closes it
      setMenuActive(!menuActive)
    }
    setSearchActive(!searchActive)
  }

  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => { // hides the searchbar onUrl change to "/Search"
    if (isFirstRender.current) {
      // Skips running the if statment on the first render.
      isFirstRender.current = false;
      return; // returns nothing which blocks the function underneath.
    }

    var urlPath = location.pathname;
    // console.log(location.search) //urlSearch === "?q="
    
    if (urlPath === "/Search" && window.innerWidth < 700 && menuActive === false) {
      console.log(urlPath);
      setMenuActive(menuActive)
      searchStyle(); 
      // console.log("url changed");
    }

  }, [location.search]) // if location.search changes ("?q=searched item")

  const { handleSubmit, handleChange } = SearchBar();

  return (
    <div id="navigation">
      <Link to="/">
        <img id="logo" src="../pics/2e logo kopie.png" />
        <img id="logo2" src="../pics/Logo Icon.png" />
      </Link>
      <div className="alignBars">
        <div className="Full_collapsible_content">
          <div id="content">
            <i
              className={`bx ${menuActive ? 'bx-align-middle' : 'bx-align-left'}`}
              onClick={menuStyle}
            ></i>
            {menuActive && (
              <summary>
                <div className="links">
                  <div
                    className="hover">
                    <Link to="/" className="Link_Icon_alignment" onClick={menuStyle}>
                      HOME <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                  <div
                    className="hover">
                    <Link to="/Status" className="Link_Icon_alignment" onClick={menuStyle}>
                      STATUS <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                  <div
                    className="hover">
                    <Link to="/Movies" className="Link_Icon_alignment" onClick={menuStyle}>
                      ALL MOVIES <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                  <div
                    className="hover">
                    <Link to="/Series" className="Link_Icon_alignment" onClick={menuStyle}>
                      ALL SERIES <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                  <div
                    className="hover">
                    <Link to="/Info" className="Link_Icon_alignment" onClick={menuStyle}>
                      INFO <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                  <div
                    className="hover">
                    <Link to="/Sources" className="Link_Icon_alignment" onClick={menuStyle}>
                      SOURCES <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                </div>
              </summary>
            )}
          </div>
        </div>
        <div className="full_search_bar">
          <i
            id="searchIcon1"
            className={`bx ${searchActive ? 'bxs-search' : 'bx-search bx-tada'}`}
            onClick={searchStyle}
          ></i>
          {searchActive && (
            <>
              <form id="search"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  id="search-field"

                  onInput={handleChange}
                  // onSubmit={closeBar}
                  required

                />
                <i id="IconNoClick" className="bx bx-search bx-tada" ></i>
              </form>
            </>
          )}
        </div>
      </div>

    </div>
  );
}

export default Header;
