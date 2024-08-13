import { ObjectId } from "mongodb";

export interface UsersType {
	accountId: string,
	accountNumber: string,
	address: {
		street: string,
		city: string,
	},
	status: "ACTIVE" ,
}

export type UsersDb = Omit<UsersType, "id"> & { _id: string }