import React from "react";
import FormStage from "../../FormStage/FormStage";
import Header from "../../Header/Header";
import UserInfo from "../../UserInfo/UserInfo";

const UserProfile = () => {
	return (
		<>
			<Header />
			<h2 className="pageName">User Name</h2>
			<UserInfo />
		</>
	);
};

export default UserProfile;
