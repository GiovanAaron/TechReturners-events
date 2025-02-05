import { FunctionComponent } from "react";
import styles from "./HeaderNavBar.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom"; // Assuming you are using React Router
import TRElogo from "../../assets/TR_events_logo.png"
import TRElogoVector from "../../assets/TR_events_logo.svg"

const HeaderNavBar: FunctionComponent = () => {
  const { isAuthenticated, logout } = useAuth(); // Get authentication status & logout function

  return (
    <header >
      <div className={styles.headerNavBar}>
        <Link to="/"><img src={TRElogoVector} alt="Tech Returners" style={{ marginLeft: '6em', transform: 'scale(0.7)' }} /></Link>
        
        <Link to="/exhibitors"><h4>Exhibitors</h4></Link>
        <Link to="/partners"><h4>Partners</h4></Link>
        <Link to="/events"><h4>Events</h4></Link>
        <Link to="/blog"><h4>Blog</h4></Link>
        <Link to="/contact-us"><h4>Contact Us</h4></Link>
        <button style={{marginRight: '6em'}} >Sign In/Register</button>
      </div>
    </header>
  );
};

export default HeaderNavBar;
