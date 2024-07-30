import { ObjectId } from "mongodb";

export interface UsersType {
	username: string,
	password: string,
	email: string,
	accountId: null | ObjectId,
	status: "ACTIVE" | "PENDING",
}

export interface LoginUser {
	email: string,
	password: string
}