import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { formsSet, usersSet } from "../../../store/idbStore";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
	changeActiveForm,
	getAllFormsValues,
	onUserEdit,
	updateUser,
} from "../../Pages/AddingNewUser/addingNewUserSlice";

import { ICapabilitiesFromValue } from "../../types/types";
import { StandartObjectOptions } from "../../types/types";

import "./capabilities.scss";

const languageOptions: StandartObjectOptions[] = [
	{ value: "HTML", label: "HTML" },
	{ value: "CSS", label: "CSS" },
	{ value: "Javascript", label: "Javascript" },
	{ value: "React", label: "React" },
	{ value: "Angular", label: "Angular" },
	{ value: "jQuery", label: "jQuery" },
	{ value: "NodeJS", label: "NodeJS" },
	{ value: "Python", label: "Python" },
	{ value: "PHP", label: "PHP" },
	{ value: "Ruby On Rails", label: "Ruby On Rails" },
	{ value: "SQL", label: "SQL" },
	{ value: "BackboneJS", label: "BackboneJS" },
	{ value: "Web Design", label: "Web Design" },
	{ value: "Project management", label: "Project management" },
	{ value: "Git", label: "Git" },
	{ value: "Docker", label: "Docker" },
	{ value: "AWS Lambda", label: "AWS Lambda" },
	{ value: "Firebase", label: "Firebase" },
];

const hobbiesOptions: StandartObjectOptions[] = [
	{ value: "Art", label: "Art" },
	{
		value: "Sport, fitness, aerobica and staff like that",
		label: "Sport, fitness, aerobica and staff like that",
	},
	{
		value: "I just want to play games, I’m not living in this life",
		label: "I just want to play games, I’m not living in this life",
	},
	{
		value: "I’m a female... I’m doing nothing. Every day.",
		label: "I’m a female... I’m doing nothing. Every day.",
	},
	{
		value: "Guitar, guitar and guitar again. I’m fall in love with it.",
		label: "Guitar, guitar and guitar again. I’m fall in love with it.",
	},
	{ value: "WTF is “hobbies”???", label: "WTF is “hobbies”???" },
];

const animatedComponents = makeAnimated();

const schema = yup.object({
	skills: yup.array().min(3, "Minimum 3 skills"),
	aditional: yup.string().max(300, "Max 300 simbols"),
});

const CapabilitiesFrom = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { editingUser } = useAppSelector((state) => state.users);

	const {
		control,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ICapabilitiesFromValue>({
		resolver: yupResolver(schema),
	});

	const isUserEdit = "id" in editingUser;
	// check existing  property id in editing user, it shows need create new user or update existing user

	const onSubmit = (formData: ICapabilitiesFromValue) => {
		if ("id" in editingUser) {
			usersSet(editingUser.id, { ...editingUser, ...formData });
			dispatch(updateUser({ ...editingUser, ...formData }));
			dispatch(onUserEdit({}));
			navigate(-1);
		} else {
			dispatch(getAllFormsValues());
			formsSet("capabilities", formData);
			dispatch(changeActiveForm("accaunt"));
			control._reset();
			navigate("/");
		}
	};

	return (
		<div className="container">
			<div className="capabilities">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="column">
						<div className="label">
							<label>Skills</label>
						</div>
						<Controller
							name="skills"
							control={control}
							defaultValue={[]}
							render={({ field: { onChange, value } }) => (
								<Select
									components={animatedComponents}
									className={"basic-multi-select"}
									classNamePrefix={"select"}
									options={languageOptions}
									value={value}
									isMulti
									onChange={(selectedOptions) => onChange(selectedOptions)}
								/>
							)}
						/>
						{errors.skills ? (
							<div className="error">{errors.skills.message} </div>
						) : null}
						<div className="label label-mt">
							<label htmlFor="area">Additional information</label>
						</div>
						<textarea
							id="area"
							{...register("aditional")}
							placeholder="Guitar, guitar and guitar again. I’m fall in love with it."
						></textarea>
						{errors.aditional ? (
							<div className="error">{errors.aditional.message} </div>
						) : null}
					</div>
					<div className="column">
						<div className="label">My hobbies</div>
						<div role="group" aria-labelledby="checkbox-group">
							{hobbiesOptions.map((option) => (
								<div className="checkbox" key={option.value}>
									<input
										type="checkbox"
										value={option.value}
										id={option.value}
										{...control.register("hobbies")}
									/>
									<label className="label" htmlFor={option.value}>
										{option.value}
									</label>
								</div>
							))}
						</div>
						<button
							hidden={isUserEdit}
							type="button"
							className="btn-back"
							onClick={() => {
								dispatch(changeActiveForm("contacts"));
							}}
						>
							Back
						</button>
						<button
							className="btn btn-finish"
							type="submit"
							style={{ background: "#5E97F3" }}
						>
							{isUserEdit ? "Save" : "Forward"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CapabilitiesFrom;
