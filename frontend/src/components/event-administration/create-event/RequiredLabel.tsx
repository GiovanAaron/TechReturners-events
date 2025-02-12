import React from "react";
import { FunctionComponent, useState, useEffect } from "react";
import styles from "./CreateEventTool.module.css";



export const RequiredLabel: FunctionComponent = () => {
    return (
        <label className={styles.label} htmlFor="Title" >
            (Required)
          </label>
    )
}

export const RequiredLabelActivated: FunctionComponent = () => {
    return (
        <label className={styles.label} htmlFor="Title" style={{color:"red"}}>
            (Required)
          </label>
    )
}