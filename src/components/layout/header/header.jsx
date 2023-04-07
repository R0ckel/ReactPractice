import React from 'react';
import LoginButton from "./loginButton";
import LogoutButton from "./logoutButton";
import Image from "../../helpers/image";
import logo from "../../../image/logo192.png";
import {UserStatusContext} from "../../../contexts/userStatus.context";

class Header extends React.Component{
  render(){
    return (
      <header>
        <Image className="headerLogo" src={logo} />
        <h2>MyReactApp</h2>
        <UserStatusContext.Consumer>
          {({ isLoggedIn, setLoggedInValue }) => {
            let btn;
            if (isLoggedIn) {
              btn = (
                <LogoutButton
                  setLoginStatus={setLoggedInValue}
                />
              );
            } else {
              btn = (
                <LoginButton
                  setLoginStatus={setLoggedInValue}
                />
              );
            }
            return <div className="headerButton aright">{btn}</div>;
          }}
        </UserStatusContext.Consumer>
      </header>
    );
  }
}

export default Header