import React from "react";


import styles from "./pages.module.css";

import LoginTool from "../components/login/LoginTool";

const SignIn: React.FC = () => {



    return (
        <div className={styles.body}>
            <LoginTool />
        </div>



    )


}


export default SignIn