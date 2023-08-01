import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { IProfileFormValues } from "../../types/types";

import { formsSet, usersSet } from "../../../store/idbStore";
import { useAppDispatch, useAppSelector } from "../../../store";

import {
	changeActiveForm,
	updateUser,
	onUserEdit,
} from "../../Pages/AddingNewUser/addingNewUserSlice";

import "./profile.scss";

const ageCheck = (age: number) => {
	return 1000 * 60 * 60 * 24 * 365 * age;
};

const age = ageCheck(18);

const schema = yup.object({
	firstName: yup.string().required("First Name is a required field"),
	lastName: yup.string().required("Last Name is a required field"),
	email: yup.string().required("Email is a required field"),
	address: yup.string().required("Adress is a required field"),
	gander: yup.mixed().required("Chose gender"),
	birthDay: yup
		.mixed()
		.required("Birth date is required")
		.test(
			"AGE_VALIDATION",
			"Must be 18+",
			(value: any) => !value || (value && Date.now() - value > age)
		),
});

const ProfileForm = () => {
	const [date, setDate] = useState<Date | null>();
	const { editingUser } = useAppSelector((state) => state.users);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const isUserEdit = "id" in editingUser;
	// check existing  property id in editing user, it shows need create new user or update existing user

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IProfileFormValues>({
		resolver: yupResolver(schema),
	});

	const onSubmit = (formData: IProfileFormValues) => {
		if (isUserEdit) {
			usersSet(editingUser.id, { ...editingUser, ...formData });
			dispatch(updateUser({ ...editingUser, ...formData }));
			dispatch(onUserEdit({}));
			navigate(-1);
		} else {
			formsSet("profile", formData);
			dispatch(changeActiveForm("contacts"));
		}
	};

	return (
		<div className="container">
			<div className="profile">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="column">
						<div className="label">
							<label htmlFor="firstName">First Name</label>
							<span>*</span>
						</div>
						<input
							id="firstName"
							className={errors.firstName ? "red-border" : ""}
							{...register("firstName")}
						/>
						{errors.firstName ? (
							<div className="error">{errors.firstName.message} </div>
						) : null}
						<div className="label">
							<label htmlFor="lastName">Last Name</label>
							<span>*</span>
						</div>
						<input
							id="lastName"
							className={errors.lastName ? "red-border" : ""}
							{...register("lastName")}
						/>
						{errors.lastName ? (
							<div className="error">{errors.lastName.message} </div>
						) : null}
						<div className="datepicker">
							<div className="label">
								<label htmlFor="birthday">Birth date</label>
								<span>*</span>
							</div>
							<DatePicker
								id="birthday"
								{...register("birthDay")}
								selected={date}
								placeholderText="DD/MM/YYY"
								className={errors.birthDay ? "red-border" : ""}
								calendarClassName="absolute"
								onChange={(value: Date | null) => {
									if (value) {
										setValue("birthDay", value.getTime());
										setDate(value);
									}
								}}
							/>
							{errors.birthDay ? (
								<div className="error">{errors.birthDay.message} </div>
							) : null}
						</div>
					</div>
					<div className="column">
						<div className="label">
							<label htmlFor="email">Email</label>
							<span>*</span>
						</div>
						<input
							autoComplete="on"
							id="email"
							className={errors.email ? "red-border" : ""}
							{...register("email")}
						/>
						{errors.email ? (
							<div className="error">{errors.email.message} </div>
						) : null}
						<div className="label">
							<label htmlFor="adress">Adress</label>
							<span>*</span>
						</div>
						<input
							id="adress"
							className={errors.address ? "red-border" : ""}
							{...register("address")}
						/>
						{errors.address ? (
							<div className="error">{errors.address.message} </div>
						) : null}
						<div className="label">Gander</div>
						<div className="radio-group" aria-labelledby="my-radio-group">
							<div className="margin-right">
								<label
									style={errors.gander ? { color: "#EB5757" } : undefined}
									className="label"
								>
									<input
										{...register("gander")}
										className="radio"
										type="radio"
										name="gander"
										value="male"
									/>
									Male
								</label>
							</div>
							<div>
								<label
									style={errors.gander ? { color: "#EB5757" } : undefined}
									className="label"
								>
									<input
										{...register("gander")}
										className="radio"
										name="gander"
										type="radio"
										value="female"
									/>
									Female
								</label>
							</div>
						</div>
						{errors.gander ? (
							<div className="error">{errors.gander.message} </div>
						) : null}
						<button
							hidden={isUserEdit}
							type="button"
							className="btn-back"
							onClick={() => {
								dispatch(changeActiveForm("accaunt"));
							}}
						>
							Back
						</button>
						<button className="btn" type="submit">
							{isUserEdit ? "Save" : "Forward"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfileForm;
