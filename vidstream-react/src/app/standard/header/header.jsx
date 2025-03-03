"use client"
import './header.css';
import React, { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';
import { SearchBar } from './searchBar';
// import Searching from '../Pages/searchPage/Search';

import Link from 'next/link';

function Header() {

  function openSearch() {
    if (menuActive) {
      setMenuActive(!menuActive)
      setSearchActive(!searchActive)
    }
    setSearchActive(!searchActive)
  }

  function openCollapse() {
    if (searchActive && window.innerWidth < 700) {
      setSearchActive(!searchActive)
      setMenuActive(!menuActive)
    }
    setMenuActive(!menuActive)
  }

  function closeCollapse() {
    if (window.innerWidth < 1400) {
      setMenuActive(!menuActive)
    }
  }

  // searchUrl
  const location = useRouter();
  
  const isFirstRender = useRef(true);
  var urlPath = location;

  // window resize collapsible content
  const [menuActive, setMenuActive] = useState(false); // onpage load defines the width
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // collapsible items updated on resize.
      var lastWidth = window.innerWidth;
      if (window.innerWidth === lastWidth && window.innerWidth > 600) {
        setMenuActive(window.innerWidth > 1400);
        setSearchActive(window.innerWidth > 700);
      }
    };
    handleResize();
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
  }, [location]) // if location.search changes ("?q=searched item")

  const { handleSubmit, handleChange } = SearchBar();

  return (
    <div id="navigation">
      <Link href="/">
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
                    <Link href="/" className="Link_Icon_alignment" onClick={closeCollapse}>
                      HOME <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                  <div className="hover">
                    <Link href="/status" className="Link_Icon_alignment" onClick={closeCollapse}>
                      STATUS <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                  <div className="hover">
                    <Link href="/copyright" className="Link_Icon_alignment" onClick={closeCollapse}>
                      COPYRIGHT <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                  {/* <div className="hover">
                    <Link href="/sources" className="Link_Icon_alignment" onClick={closeCollapse}>
                      SOURCES <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div> */}
                  <div className="hover">
                    <Link href="/authentication/login" className="Link_Icon_alignment" onClick={closeCollapse}>
                      LOGIN <i className='bx bxs-chevron-right'></i>
                    </Link>
                  </div>
                  <div className="hover">
                    <Link href="/authentication/register" className="Link_Icon_alignment" onClick={closeCollapse}>
                      REGISTER <i className='bx bxs-chevron-right'></i>
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
