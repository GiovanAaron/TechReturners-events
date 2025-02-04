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
        <img src={TRElogoVector} alt="Tech Returners" style={{ marginLeft: '6em', transform: 'scale(0.7)' }} />
        
        <h4>Exhibitors</h4>
        <h4>Partners</h4>
        <h4>Events</h4>
        <h4>Blog</h4>
        <h4>Contact Us</h4>
        <button style={{marginRight: '6em'}} >Sign In/Register</button>
      </div>
    </header>
  );
};

export default HeaderNavBar;
