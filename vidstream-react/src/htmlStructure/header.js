import '../css/header.css';

function Header() {
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
            <i className='bx bx-align-left'></i>

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
          </div>
        </div>

        {/* Search bar */}
        <div className="full_search_bar">
          <div id="search">
            <input type="text" name="search-field" placeholder="Zoeken..." id="search-field" classNameName="blink search-field"/>
            <i id="searchIcon1" className='bx bx-search bx-tada'></i>
            <i id="IconNoClick" className="bx bx-search bx-tada"></i>
            {/* </input> */}
          </div>
        </div>
        {/* End search bar */}
      </div>
      {/* End link bar */}
    </div>
  );
}

export default Header;