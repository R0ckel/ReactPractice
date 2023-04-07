import React from "react";

export const UserStatusContext = React.createContext({
	isLoggedIn: false,
	setLoggedInValue: (value) => {}
})