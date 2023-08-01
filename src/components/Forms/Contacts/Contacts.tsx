import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store";
import {
	changeActiveForm,
	onUserEdit,
	updateUser,
} from "../../Pages/AddingNewUser/addingNewUserSlice";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import InputMask from "react-input-mask";

import { formsSet, usersSet } from "../../../store/idbStore";

import { IContactsFormValue } from "../../types/types";

import "./contacts.scss";

const options = {
	en: "English",
	fr: "French",
	es: "Spanish",
	ar: "Arabic",
	cmn: "Mandarin",
	ru: "Russian",
	pt: "Portuguese",
	de: "German",
	ja: "Japanese",
	hi: "Hindi",
	ms: "Malay",
	fa: "Persian",
	sw: "Swahili",
	ta: "Tamil",
	it: "Italian",
	nl: "Dutch",
	bn: "Bengali",
	tr: "Turkish",
	vi: "Vietnamese",
	pl: "Polish",
	jv: "Javanese",
	pa: "Punjabi",
	th: "Thai",
	ko: "Korean",
};

type OptionsType = {
	value: string;
	label: string;
};

const languges = Object.entries(options).map(([value, label]) => ({
	value,
	label,
}));

const schema = yup.object({
	company: yup.string().required("Company is a required field"),
	github: yup.string(),
	facebook: yup.string(),
	phone: yup.string(),
});

const TelephoneInputMask = "+38 (099) 999-99-99";

const ContactsFrom = () => {
	const [phoneAmount, setPhoneAmout] = useState(1);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { editingUser } = useAppSelector((state) => state.users);

	const {
		control,
		handleSubmit,
		setValue,
		register,
		formState: { errors },
	} = useForm<IContactsFormValue>({
		resolver: yupResolver(schema),
	});

	const isUserEdit = "id" in editingUser;
	// check existing  property id in editing user, it shows need create new user or update existing user

	const onSubmit = (formData: IContactsFormValue) => {
		if (isUserEdit) {
			usersSet(editingUser.id, { ...editingUser, ...formData });
			dispatch(updateUser({ ...editingUser, ...formData }));
			dispatch(onUserEdit({}));
			navigate(-1);
		} else {
			formsSet("contacts", formData);
			dispatch(changeActiveForm("capabilities"));
		}
	};

	const createPhoneNumber = (times: number) => {
		const arr = [];

		for (let i = 0; i < times; i++) {
			arr.push("stucture");
		}

		const phone = arr.map((i, index) => {
			let phoneName: "phone1" | "phone2" | "phone3" = "phone1";

			switch (index) {
				case 0:
					break;
				case 1:
					phoneName = "phone2";
					break;
				case 2:
					phoneName = "phone3";
					break;
				default:
					console.log("amount Error");
			}

			return (
				<div key={index} className="phone__block">
					<div className="label">
						<label htmlFor={`phone ${index}`}>{`Phone #` + (index + 1)}</label>
					</div>
					<InputMask
						id={`phone ${index}`}
						placeholder={"+38 (066) 888 88 88"}
						mask={TelephoneInputMask}
						maskChar="X"
						{...register(phoneName)}
						type="phone"
					/>
					<div
						style={phoneAmount > 1 ? { display: "block" } : { display: "none" }}
						className="phone__block-delete"
						onClick={() => {
							setPhoneAmout(phoneAmount - 1);
							setValue(phoneName, "");
						}}
					>
						<div></div>
					</div>
				</div>
			);
		});

		return phone;
	};

	const phones = createPhoneNumber(phoneAmount);

	return (
		<div className="container">
			<div className="contacts">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="wrapper">
						<div className="column">
							<div className="label">
								<label htmlFor="company">Company</label>
								<span>*</span>
							</div>
							<input
								autoComplete="off"
								id="company"
								className={errors.company ? "red-border" : ""}
								{...register("company")}
								type="text"
							/>
							{errors.company ? (
								<div className="error">{errors.company.message} </div>
							) : null}
							<div className="label">
								<label htmlFor="github">Github link</label>
								<span>*</span>
							</div>
							<input
								id="github"
								className={errors.github ? "red-border" : ""}
								{...register("github")}
								type="text"
							/>
							{errors.github ? (
								<div className="error">{errors.github.message} </div>
							) : null}
							<div className="label">
								<label htmlFor="facebook">Facebook link</label>
								<span>*</span>
							</div>
							<input id="facebook" {...register("facebook")} type="text" />
							<div className="label">
								<label>Main language</label>
								<span>*</span>
							</div>
							<Controller
								name="language"
								control={control}
								defaultValue={{ value: "en", label: "English" }}
								render={({ field: { onChange, value } }) => (
									<Select
										className="basic-select"
										classNamePrefix="select"
										options={languges}
										value={value}
										onChange={(option: OptionsType | null) => {
											console.log(option);
											onChange(option);
										}}
									/>
								)}
							/>
						</div>
						<div className="column right">
							<div className="label">
								<label htmlFor="fax">Fax</label>
							</div>
							<input id="fax" {...register("fax")} type="text" />
							{phones}
							<div
								className="add"
								onClick={() => {
									if (phoneAmount < 3) {
										setPhoneAmout(() => phoneAmount + 1);
									}
								}}
							>
								+ add phone number
							</div>
							<button
								hidden={isUserEdit}
								type="button"
								className="btn-back"
								onClick={() => {
									dispatch(changeActiveForm("profile"));
								}}
							>
								Back
							</button>
							<button className="btn" type="submit">
								{isUserEdit ? "Save" : "Forward"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ContactsFrom;
