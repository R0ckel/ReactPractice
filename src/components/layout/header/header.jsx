import React from 'react';
import LoginButton from "./loginButton";
import Image from "../../helpers/image";
import logo from "../../../image/logo192.png";
import styles from "../../../css/app.module.css";

class Header extends React.Component{
  render(){
    return (
      <header>
        <Image className={styles.headerLogo} src={logo}/>
        <h2>MyReactApp</h2>
        <div className={`${styles.headerButton} ${styles.aright}`}>
          <LoginButton/>
        </div>
      </header>
    );
  }
}

export default Header