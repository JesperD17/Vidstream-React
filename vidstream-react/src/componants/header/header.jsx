import './header.css';
import React, { useState, useEffect } from 'react';


import { SearchBar } from './searchBar';
// import Searching from '../Pages/searchPage/Search';

import { Link } from "react-router-dom";

function Header() {

  // collapsible items.
  const [menuActive, setMenuActive] = useState(window.innerWidth > 1586);
  const [searchActive, setSearchActive] = useState(window.innerWidth > 700);

  const menuStyle = () => {
    setMenuActive(!menuActive);
    // console.log(window.innerWidth)
    if (window.innerWidth < 700 && searchActive) { // if searchbar is open - close searchbar
      setSearchActive(!searchActive)
    }
    if (window.innerWidth > 700) {
      setMenuActive(menuActive);
    }
  };

  const searchStyle = () => {
    setSearchActive(!searchActive);

    if (menuActive) { // if collapsible items is open - close collapse
      setMenuActive(!menuActive)
    }
  };


  useEffect(() => {
    const handleResize = () => {
      setMenuActive(window.innerWidth > 1400);
      setSearchActive(window.innerWidth > 700);
    };

    window.addEventListener('resize', handleResize);
    // return () => {
    //   window.removeEventListener('resize', handleResize);
    // };
  }, []);



const { handleSubmit, handleChange, value, result } = SearchBar();
  return (
    <div id="navigation">
      <a href="/">
        <img id="logo" src="../pics/2e logo kopie.png" />
        <img id="logo2" src="../pics/Logo Icon.png" />
      </a>
      <div className="alignBars">
        <div className="Full_collapsible_content">
          <div id="content">
            <i
              className={`bx ${!menuActive ? 'bx-align-left' : 'bx-align-middle'}`}
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
                    <Link to="News" className="Link_Icon_alignment" onClick={menuStyle}>
                      NEWS <i className='bx bxs-chevron-right'></i>
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
            className={`bx ${!searchActive ? 'bx-search bx-tada' : 'bxs-search'}`}
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
                  className="blink search-field"

                  value={value}
                  onInput={handleChange}
                  required

                />
                <i id="IconNoClick" className="bx bx-search bx-tada" ></i>
              </form>
              <h4>{result}</h4>
            </>
          )}
        </div>
      </div>

    </div>
  );
}

export default Header;
