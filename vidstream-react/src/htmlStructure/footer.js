import '../css/footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="logo_links">
        
        <div className="footer_links">
          <summary2>
            <div className="links">
              <div className="links_title">Navigation</div>
              <a href="http://localhost/Vidstream/Vidstream/Onscreen/html/homepage.php" className="hover">HOME</a>
              <a href="#" className="hover">NEWS</a>
              <a href="#" className="hover">IN THEATERS</a>
              <a href="#" className="hover">COMING SOON</a>
              <a href="#" className="hover">CONTACT</a>
              <a href="#" className="hover">ADVERTISE</a>
            </div>
          </summary2>
        </div>
        <a href="http://localhost/Vidstream/Vidstream/Onscreen/html/homepage.php">
          <img className="footer_Logo" src="../pics/Logo Icon.png"></img>
        </a>
      </div>

      <div className="WBR_collab_text">
        <i className='bx bxs-copyright'></i>
        <div id="first_part">2024</div>
          <a href="http://localhost/Vidstream/Vidstream/Onscreen/html/homepage.php" id="second_part">
            Vidstream.
          </a>
        <div id="third_part">API by</div>
          <a href="https://github.com/WBRK-dev" id="fourth_part">
            WBRK.
          </a>
      </div>

    </div>
  );
}

export default Footer;
