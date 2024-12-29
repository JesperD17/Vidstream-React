import './header.css';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

import Searching from '../Pages/searchPage/Search';

import { Outlet, Link } from "react-router-dom";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Header() {
  const [menuActive, setMenuActive] = useState(window.innerWidth > 1586);
  const [searchActive, setSearchActive] = useState(window.innerWidth > 700);

  const [searchInput, setSearchInput] = useState("");

  const menuStyle = () => {
    setMenuActive(!menuActive);
    console.log(window.innerWidth)
    if (window.innerWidth < 700 && searchActive) { // if searchbar is open - close searchbar
      setSearchActive(!searchActive)
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
      // setMenuActive(window.innerWidth > 1400);
      // setSearchActive(window.innerWidth > 700);
    };

    window.addEventListener('resize', handleResize);
    // return () => {
    //   window.removeEventListener('resize', handleResize);
    // };
  }, []);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const {
    data: allMovies,
    error,
    isValidating,
  } = useSWR('https://vidstream-api.vercel.app/home', fetcher, { // settings to stop swr from reloading.
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  function handleSubmit(e) {
    e.preventDefault()
    console.log(searchInput)

    if (searchInput) {
      console.log(allMovies)
      return <Searching />
    }
  }

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
                  <a href="/"
                    className="hover">
                    <div className="Link_Icon_alignment">
                      HOME <i className='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                  <a href="/News"
                    className="hover">
                    <div className="Link_Icon_alignment">
                      NEWS <i className='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                  <a href="Movies"
                    className="hover">
                    <div className="Link_Icon_alignment">
                      ALL MOVIES <i className='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                  <a href="Series"
                    className="hover">
                    <div className="Link_Icon_alignment">
                      ALL SERIES <i className='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                  <a href="Info"
                    className="hover">
                    <div className="Link_Icon_alignment">
                      INFO <i className='bx bxs-chevron-right'></i>
                    </div>
                  </a>
                  <a href="Sources"
                    className="hover">
                    <div className="Link_Icon_alignment">
                      SOURCES <i className='bx bxs-chevron-right'></i>
                    </div>
                  </a>
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
            <form id="search"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Search..."
                id="search-field"
                className="blink search-field"
                // onChange={(e) => setSearchQuery(e.allMovies.value)}
                // onChange={handleChange}
                value={searchInput}
                name="searchInput"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <i id="IconNoClick" className="bx bx-search bx-tada"></i>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
