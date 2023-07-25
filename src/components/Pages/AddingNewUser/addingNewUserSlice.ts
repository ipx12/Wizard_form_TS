import { IUser, FormsType, AllFormsType } from "../../types/types";

import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import {
	formsValues,
	usersDel,
	usersSet,
	usersValues,
} from "../../../store/idbStore";

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

export const getAllUsers = createAsyncThunk("users/getAllUsers", () => {
	return usersValues();
});

const addingNewUserSlice = createSlice({
	name: "users",
	initialState: initialState,
	reducers: {
		changeActiveForm: (state, action: PayloadAction<FormsType>) => {
			state.activeForm = action.payload;
		},
		onDeleteUser: (state, action) => {
			userAdapter.removeOne(state, action.payload);
			usersDel(action.payload);
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getAllFormsValues.pending, (state) => {
				state.formLoadingStatus = "loading";
			})
			.addCase(getAllFormsValues.fulfilled, (state, action) => {
				state.formLoadingStatus = "idle";
				userAdapter.setOne(state, createUser(action.payload));
				usersSet(action.payload[0].id, createUser(action.payload));
			})
			.addCase(getAllFormsValues.rejected, (state) => {
				state.formLoadingStatus = "error";
			})
			.addCase(getAllUsers.pending, (state) => {
				state.usersLoadingStatus = "loading";
			})
			.addCase(getAllUsers.fulfilled, (state, action) => {
				state.usersLoadingStatus = "idle";
				userAdapter.addMany(state, action.payload);
			})
			.addCase(getAllUsers.rejected, (state) => {
				state.usersLoadingStatus = "error";
			})
			.addDefaultCase(() => {});
	},
});

const createUser = (formsData: IUser[]): IUser => {
	let user = {};
	formsData.forEach((form: AllFormsType) => (user = { ...user, ...form }));
	return user as IUser;
};

const { actions } = addingNewUserSlice;

export const { selectAll } = userAdapter.getSelectors<RootState>(
	(state) => state.users
);

export const { changeActiveForm, onDeleteUser } = actions;

export default addingNewUserSlice.reducer;
