import './header.css';
import React, { useState, useEffect } from 'react';

function Header() {
  const [menuActive, setMenuActive] = useState(window.innerWidth > 1586);
  const [searchActive, setSearchActive] = useState(window.innerWidth > 700);

  const menuStyle = () => {
    setMenuActive(!menuActive);
  };

  const searchStyle = () => {
    setSearchActive(!searchActive);
  };

  useEffect(() => {
    const handleResize = () => {
      setMenuActive(window.innerWidth > 1586);
      setSearchActive(window.innerWidth > 700);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id="navigation">
      <a href="http://localhost/Vidstream/Vidstream/Onscreen/html/homepage.php">
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
            <div id="search">
              <input
                type="text"
                name="search-field"
                placeholder="Zoeken..."
                id="search-field"
                className="blink search-field"
              />
              <i id="IconNoClick" className="bx bx-search bx-tada"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
