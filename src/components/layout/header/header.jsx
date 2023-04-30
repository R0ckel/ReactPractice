import React from 'react';
import LoginButton from "./loginButton";
import Image from "../../helpers/image";
import logo from "../../../image/logo192.png";
import styles from "../../../css/app.module.css";
import {Link} from "react-router-dom";

class Header extends React.Component{
  render(){
    return (
      <header>
        <Image className={styles.headerLogo} src={logo}/>
        <Link to={`/categories`} className={`${styles.noLink}`}>
          <h2 className={`${styles.app}`}> MyReactApp </h2>
        </Link>

        <Link to={`/admin/products`} className={`${styles.noLink} ${styles.headerButton} ${styles.aleft}`}>
          <span className={`${styles.app}`}> Admin Panel </span>
        </Link>

        <div className={`${styles.headerButton} ${styles.aright}`}>
          <LoginButton/>
        </div>
      </header>
    );
  }
}

export default Header