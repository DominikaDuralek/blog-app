import Logo from "../img/logo.png"

function Footer() {
    return (
      <footer>
        <img src={Logo} alt="logo" />
        <span>Made with ♥ and <b>React.js</b></span>
      </footer>
    );
  }
  
  export default Footer;