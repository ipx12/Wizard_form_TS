import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import AccauntForm from "../Forms/Accaunt/Accaunt";
import FormStage from "../FormStage/FormStage";
import Profile from "../Forms/Profile/Profile";
import Contacts from "../Forms/Contacts/Contacts";
import Capabilities from "../Forms/Capabilities/Capabilities";
import CapabilitiesFrom from "../Forms/Capabilities/Capabilities";
import ListOfUsers from "../Pages/ListOfUsers/ListOfUsers";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { IUser } from "../types/types";

import AddingNewUser from "../Pages/AddingNewUser/AddingNewUser";
import List from "../List/UsersList";
import UserItem from "../UserItem/UserItem";
import UserEdit from "../Pages/UserProfile/UserProfile";
import UserInfo from "../UserInfo/UserInfo";
import UserProfile from "../Pages/UserProfile/UserProfile";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="" element={<ListOfUsers />} />
					<Route path="/useradd" element={<AddingNewUser />} />
					<Route path="/info/:userId" element={<UserProfile />} />
					{/* <Route path='/useradd' element={<UserEdit/>}/> */}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
