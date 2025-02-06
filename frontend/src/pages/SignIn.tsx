import React from "react";

import SmallEvent from "../components/event-views/small-event/SmallEvent";
import  useApiReq  from "../hooks/useApiReq";  // Import the API hook
import styles from "./pages.module.css";
import formatDateWithSuffix from "../utils/formatdatesuffix";
import LoginTool from "../components/login/loginTool";

const SignIn: React.FC = () => {



    return (
        <div className={styles.body}>
            <LoginTool />
        </div>



    )


}


export default SignIn