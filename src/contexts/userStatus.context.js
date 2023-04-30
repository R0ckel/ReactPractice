import React from "react";

export const UserStatusContext = React.createContext({
	isLoggedIn: false,
	username: "",
	setLoggedInValue: (value, username = "d") => {
		this.isLoggedIn = value
		this.username = username
	},
})