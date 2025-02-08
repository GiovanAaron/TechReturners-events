import React, { FunctionComponent, useState } from "react";
import styles from "./LoginTool.module.css";

import { useApiReq } from "../../hooks/useApiReq";
import { storeSession } from "../../utils/tokenHandlers";


// interface UserState {
//   isAuthenticated: boolean;
//   access_type: string;
// }

const LoginTool: FunctionComponent = () => {


  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState<string | null>(null);

  // Use the useApiReq hook with autoReq: false
  const { makeRequest } = useApiReq();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Manually trigger the POST request using makeRequest
      const res = await makeRequest(
        "/users/login", // Use the default endpoint
        "POST", // Use the default method
        { email: email, password : password} // Data to send
      )
     
      storeSession(res.token, res.access_type, 15)
     
    } catch (err) {
      console.error("Login failed:", err);
      // setError(apiError || "Something went wrong. Please try again.");
    } finally {
      window.location.href = "/";
    }
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
          <div className={styles.accesstype}>{`password `}</div>
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
