import { configureStore } from "@reduxjs/toolkit";

import users from "../components/Pages/AddingNewUser/addingNewUserSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
	reducer: {
		users,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					"users/getAllUsers/fulfilled",
					"users/getAllForms/fulfilled",
					"users/onUserEdit",
					"users/updateUser",
				],
				ignoredPaths: ["users.entities", "users.editingUser"],
			},
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
