
import { Link } from "react-router-dom"; // Assuming you are using React Router
import { FunctionComponent } from "react";
import styles from "./HeaderNavBar.module.css";
import TRElogoVector from "../../assets/TR_events_logo.svg"
import { endSession } from "../../utils/tokenHandlers";



const HeaderNavBar: FunctionComponent = () => {
 
 

  const token = localStorage.getItem("authToken");
  // const access_type = localStorage.getItem("accessType");
  console.log("token from head nav bar", token)

  const handleLogout = () => {
    endSession()
    window.location.href = "/";
  };

    const handleLogin = () => {
    window.location.href = "/signin";
  };

   // Get authentication status & logout function
  
  if (!token) {
    
    return (
      <header >
        <div className={styles.headerNavBar}>
          <Link to="/"><img src={TRElogoVector} alt="Tech Returners" style={{ marginLeft: '6em', transform: 'scale(0.7)' }} /></Link>
          
          <Link to="/"><h4>Exhibitors</h4></Link>
          <Link to="/"><h4>Partners</h4></Link>
          <Link to="/"><h4>Events</h4></Link>
          <Link to="/"><h4>Blog</h4></Link>
          <Link to="/"><h4>Contact Us</h4></Link>
          <button onClick={handleLogin}className={styles.signedOut} style={{marginRight: '6em'}} ><Link to="/signin">Sign In/Register</Link></button>
        </div>
      </header>
    );
  } else {
    return (
      <header >
        <div className={styles.headerNavBar}>
          <Link to="/"><img src={TRElogoVector} alt="Tech Returners" style={{ marginLeft: '6em', transform: 'scale(0.7)' }} /></Link>
          <Link to="/"><h4>Exhibitors</h4></Link>
          <Link to="/"><h4>Partners</h4></Link>
          <Link to="/"><h4>Events</h4></Link>
          <Link to="/"><h4>Blog</h4></Link>          
          <Link to="/"><h4>My Profile</h4></Link>
          <button className={styles.signedIn} onClick={handleLogout} style={{marginRight: '6em'}} ><Link to="/signin" >Sign Out</Link></button>
        </div>
      </header>
    );

  }

};

export default HeaderNavBar;
