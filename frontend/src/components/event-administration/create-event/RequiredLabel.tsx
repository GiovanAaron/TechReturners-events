import React from "react";
import styles from "./CreateEventTool.module.css";



export const RequiredLabel: React.FC = () => {
    return (
        <label className={styles.label} htmlFor="Title" >
            (Required)
          </label>
    )
}

export const RequiredLabelActivated: React.FC = () => {
    return (
        <label className={styles.label} htmlFor="Title" style={{color:"red"}}>
            (Required)
          </label>
    )
}