import './footer.css';

import { Link } from 'react-router-dom';

function Footer() {
  return (
    <main className="footer">
      <div className="logo_links">

        <div className="footer_links">
          <summary>
            <div className="links">
              <div className="links_title">Navigation</div>
              <Link to="/" className="Link_Icon_alignment">
                HOME
              </Link>
              <Link to="/Status" className="Link_Icon_alignment">
                STATUS
              </Link>
              <Link to="/Info" className="Link_Icon_alignment">
                INFO
              </Link>
              <Link to="/Sources" className="Link_Icon_alignment">
                SOURCES
              </Link>
            </div>
          </summary>
        </div>
        <Link to="/">
          <img className="footer_Logo" src="../pics/Logo Icon.png"></img>
        </Link>
      </div>

      <div className="WBR_collab_text">
        <i className='bx bxs-copyright'></i>
        <div id="first_part">2024</div>
        <Link to="/" id="second_part">
          Vidstream.
        </Link>
        <div id="third_part">API by</div>
        <a href="https://github.com/WBRK-dev" id="fourth_part">
          WBRK.
        </a>
      </div>

    </main>
  );
}

export default Footer;
