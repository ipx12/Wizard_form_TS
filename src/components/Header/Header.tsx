// import { onUserEdit } from "../pages/AddingNewUser/addingNewUserSlice";

import { NavLink } from "react-router-dom";

import addUser from "../../resources/icons/add_users.png";
import usersList from "../../resources/icons/list_users.png";
import logo from "../../resources/icons/Logo.png";

import "./header.scss";

const Header = () => {
	// const dispatch = useDispatch()

	let activeStyle = {
		opacity: 1,
	};

	return (
		<div className="header">
			<div className="container">
				<div className="logo">
					<img src={logo} alt="logo" />
				</div>
				<div className="users">
					<div className="users-add">
						<NavLink
							// onClick={() => dispatch(onUserEdit({}))}
							to="/useradd"
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
						>
							<img src={addUser} alt="addUser" />
							<span>Add new user</span>
						</NavLink>
					</div>
					<div className="users-list">
						<NavLink
							to="/"
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
						>
							<img src={usersList} alt="users" />
							<span>List of users</span>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
