import { IUser } from "../../types/types";
import { FormsType } from "../../types/types";

import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../../store";

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

const addingNewUserSlice = createSlice({
	name: "users",
	initialState: initialState,
	reducers: {
		changeActiveForm: (state, action: PayloadAction<FormsType>) => {
			state.activeForm = action.payload;
		},
	},
});

const { actions } = addingNewUserSlice;

export const { selectAll } = userAdapter.getSelectors<RootState>(
	(state) => state.users
);

export const { changeActiveForm } = actions;

export default addingNewUserSlice.reducer;
