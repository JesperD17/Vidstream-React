import './footer.css';

import Link from 'next/link';

function Footer() {
  return (
    <main className="footer">
      <div className="logo_links">

        <div className="footer_links">
          <summary>
            <div className="links">
              <div className="links_title">Navigation</div>
              <Link href="/" className="Link_Icon_alignment">
                HOME
              </Link>
              <Link href="/status" className="Link_Icon_alignment">
                STATUS
              </Link>
              <Link href="/copyright" className="Link_Icon_alignment">
                COPYRIGHT
              </Link>
              <Link href="/sources" className="Link_Icon_alignment">
                SOURCES
              </Link>
            </div>
          </summary>
        </div>
        <Link href="/">
          <img className="footer_Logo" src="../pics/Logo Icon.png"></img>
        </Link>
      </div>

      <div className="WBR_collab_text">
        <i className='bx bxs-copyright'></i>
        <div id="first_part">2024</div>
        <Link href="/" id="second_part">
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
