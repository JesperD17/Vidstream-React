import './header.css';
import React, { useState, useEffect, useRef } from 'react';

import { useLocation } from 'react-router-dom';
import { SearchBar } from './searchBar';
// import Searching from '../Pages/searchPage/Search';

import { Link } from "react-router-dom";

function Header() {

  function openSearch() {
    if (menuActive) {
      console.log("search")
      setMenuActive(!menuActive)
      setSearchActive(!searchActive)
    }
    setSearchActive(!searchActive)
  }

  function openCollapse() {
    if (searchActive) {
      console.log("search")
      setSearchActive(!searchActive)
      setMenuActive(!menuActive)
    }
    setMenuActive(!menuActive)
  }

  // searchUrl
  const location = useLocation();
  const isFirstRender = useRef(true);
  var urlPath = location.pathname;

  // window resize collapsible content
  const [menuActive, setMenuActive] = useState(window.innerWidth > 1400); // onpage load defines the width
  const [searchActive, setSearchActive] = useState(window.innerWidth > 700);

  useEffect(() => {
    const handleResize = () => {
      // collapsible items.
      setMenuActive(window.innerWidth > 1400);
      setSearchActive(window.innerWidth > 700);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // searchUrl
  useEffect(() => { // hides the searchbar onUrl change to "/Search"
    if (isFirstRender.current) {
      // Skips running the if statment on the first render.
      isFirstRender.current = false;
      return; // returns nothing which blocks the function underneath.
    }

    if (urlPath === "/Search" && window.innerWidth < 700 && menuActive === false) {
      console.log(urlPath);
      // setMenuActive(menuActive)
      setSearchActive(!searchActive);
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
              onClick={() => openCollapse()}
            ></i>
            {menuActive && (
              <summary>
                <div className="links">
                  <div className="hover">
                    <Link to="/" className="Link_Icon_alignment" onClick={() => setMenuActive(!menuActive)}>
                      HOME <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                  <div className="hover">
                    <Link to="/Status" className="Link_Icon_alignment" onClick={() => setMenuActive(!menuActive)}>
                      STATUS <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                  <div className="hover">
                    <Link to="/Movies" className="Link_Icon_alignment" onClick={() => setMenuActive(!menuActive)}>
                      ALL MOVIES <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                  <div className="hover">
                    <Link to="/Series" className="Link_Icon_alignment" onClick={() => setMenuActive(!menuActive)}>
                      ALL SERIES <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                  <div className="hover">
                    <Link to="/Info" className="Link_Icon_alignment" onClick={() => setMenuActive(!menuActive)}>
                      INFO <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                  <div className="hover">
                    <Link to="/Sources" className="Link_Icon_alignment" onClick={() => setMenuActive(!menuActive)}>
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
            onClick={() => openSearch()}
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
