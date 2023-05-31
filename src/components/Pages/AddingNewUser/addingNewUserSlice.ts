import { IUser, FormsType, AllFormsType } from "../../types/types";

import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { formsValues } from "../../../store/idbStore";

interface addingNewUserState {}

interface IInitialState {
	activeForm: FormsType;
	formLoadingStatus: string;
	usersLoadingStatus: string;
	editingUser: {};
}

const userAdapter = createEntityAdapter<IUser>();

const initialState = userAdapter.getInitialState<IInitialState>({
	activeForm: "accaunt",
	formLoadingStatus: "idle",
	usersLoadingStatus: "idle",
	editingUser: {},
});

export const getAllFormsValues = createAsyncThunk("users/getAllForms", () => {
	return formsValues();
});

const addingNewUserSlice = createSlice({
	name: "users",
	initialState: initialState,
	reducers: {
		changeActiveForm: (state, action: PayloadAction<FormsType>) => {
			state.activeForm = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getAllFormsValues.pending, (state) => {
				state.formLoadingStatus = "loading";
			})
			.addCase(getAllFormsValues.fulfilled, (state, action) => {
				state.formLoadingStatus = "idle";
				// userAdapter.setOne(state, createUser(action.payload));
				// usersSet
			})
			.addCase(getAllFormsValues.rejected, (state) => {
				state.formLoadingStatus = "error";
			});
	},
});

const createUser = (formsData: any): IUser => {
	let user = {};
	formsData.forEach((form: AllFormsType) => (user = { ...user, ...form }));
	return user as IUser;
};

const { actions } = addingNewUserSlice;

export const { selectAll } = userAdapter.getSelectors<RootState>(
	(state) => state.users
);

export const { changeActiveForm } = actions;

export default addingNewUserSlice.reducer;
