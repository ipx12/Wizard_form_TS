import { useState, FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { onDeleteUser } from "../Pages/AddingNewUser/addingNewUserSlice";

import photo from "../../resources/img/Ellipse.png";
import edit from "../../resources/icons/userList/Edit.png";
import close from "../../resources/icons/userList/Close.png";
import closeRed from "../../resources/icons/userList/close_red.png";

import { IUser } from "../types/types";

interface IUserItemProps {
	user: IUser;
}

const UserItem = ({ user }: IUserItemProps) => {
	const [deleteConfirm, setDeleteConfirm] = useState(false);

	const dispatch = useDispatch();

	console.log("userItem render");

	const userClass = deleteConfirm ? "table__list left" : "table__list";

	const lastUpdateTime = (date: string) => {
		const spendTime = Date.now() - Date.parse(date);

		switch (true) {
			case spendTime < 60000:
				return "just now";
			case spendTime < 60000 * 5:
				return "few minutes ago";
			case spendTime < 60000 * 60 * 60 * 24:
				return "more then 5 min";
			default:
				return Math.floor(spendTime / 1000 / 60);
		}
	};

	return (
		<div className={userClass}>
			<div className="wrap">
				<div className="table-photo">
					<img
						src={user.photo && user.photo.length ? user.photo : photo}
						alt="Avatar"
					/>
				</div>
				<div className="table__user">
					<div className="table__user-name">
						{user.firstName} {user.lastName}
					</div>
					<div className="table__user-title">{user.userName}</div>
				</div>
			</div>
			<div className="wrap">{user.company}</div>
			<div className="wrap">{user.email}</div>
			<div className="wrap upd">
				<div>
					{
						// lastUpdateTime(new Date().getTime().toString())
						"123"
					}
				</div>
				<div className={deleteConfirm ? "btns display-none" : "btns"}>
					<div className="btns-edit">
						<Link to={`/info/${user.id}`}>
							<img src={edit} alt="edit" />
						</Link>
					</div>
					<div
						className="btns-delete"
						onClick={() => setDeleteConfirm(!deleteConfirm)}
					>
						<img src={close} alt="close" />
					</div>
				</div>
			</div>
			<div
				className={deleteConfirm ? "confirmed" : "confirmed display-none"}
				onClick={() => setDeleteConfirm(!deleteConfirm)}
			>
				<div className="confirmed-close">
					<img src={closeRed} alt="close" />
				</div>
				<CSSTransition
					in={deleteConfirm}
					timeout={300}
					classNames="confirm-node"
				>
					<div
						className="confirmed-delete"
						onClick={() => dispatch(onDeleteUser(user.id))}
					>
						delete
					</div>
				</CSSTransition>
			</div>
		</div>
	);
};

export default UserItem;
