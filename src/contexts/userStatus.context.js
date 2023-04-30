import React from "react";

export const UserStatusContext = React.createContext({
	isLoggedIn: false,
	username: "",
	setLoggedInValue: (value, username = "") => {
		this.isLoggedIn = value
		this.username = username
	},
})