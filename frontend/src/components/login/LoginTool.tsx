import { FunctionComponent, useState } from "react";
import styles from "./LoginTool.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom"; // Assuming you are using React Router
import TRElogoVector from "../../assets/TR_events_logo.svg";
import { useApiReq } from "../../hooks/useApiReq";


const LoginTool: FunctionComponent = () => {
  
   
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  



  const handleSubmit = (event) => {
    event.preventDefault();
    // TO DO: Add authentication logic here
   
    const { responseData : token, loading, error } = useApiReq(
      "/login", // Endpoint to fetch events
      null, // No token required for public events
      "POST",
      {email: email, password: password}
    );

    console.log(token)

  };



  return (
    <div className={styles.loginRender}>
      <div className={styles.detailsLeft}>
        <div className={styles.heading}>
          <div className={styles.accesstype}>Welcome Back!</div>
        </div>
        <div className={styles.description}>
          This is a demo version, and registration is currently unavailable.
          However, we’ve provided test account details below. These accounts
          have both basic user and moderator access, allowing you to join events
          as well as manage them by posting, updating, and deleting events.
        </div>
        <div className={styles.testEmail}>
          <div className={styles.accesstype}>Test Email:</div>
          <div
            className={styles.accesstype}
          >{`burton.mansfield@severance.com `}</div>
        </div>
        <div className={styles.testEmail}>
          <div className={styles.accesstype}>Password:</div>
          <div className={styles.accesstype}>{`Password `}</div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.detailsRight}>
          <div className={styles.emailForm}>
            <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" className={styles.input} placeholder="Email"></input>
          </div>
          <div className={styles.emailForm}>
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password"className={styles.input} placeholder="Password"></input>
          </div>
          <button className={styles.signInBtn}>
            <div className={styles.accesstype}>Sign In</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginTool;
