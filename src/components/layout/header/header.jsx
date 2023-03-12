import React from 'react';
import LoginButton from "./loginButton";
import LogoutButton from "./logoutButton";
import Image from "../../helpers/image";
import logo from "../../../image/logo192.png";

class Header extends React.Component{
  constructor(props){
    super(props);
    
    this.changeIsLoggedIn = props.changeIsLoggedIn;
    this.isLoggedIn = props.isLoggedIn;  
    
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  setLoggedIn(value){
    this.changeIsLoggedIn(value);
  }

  login(){
    this.setLoggedIn(true)
  }

  logout(){
    this.setLoggedIn(false)
  }

  render(){

    var btn;
    if (this.isLoggedIn){
      btn = <LogoutButton logout={this.logout}/>
    } else {
      btn = <LoginButton login={this.login}/>
    }
    return (
      <header>
        <Image className="headerLogo" src={logo}/>
        <h2>MyReactApp</h2>
        {btn}
        
      </header>
    );
  }
}

export default Header