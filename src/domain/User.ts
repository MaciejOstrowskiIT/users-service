import { UsersType } from "../models/Users";
import { IDomain } from './IDomain';

type UserKeys = keyof UsersType

export class User implements IDomain<UsersType>{
	constructor(
		private accountId: string,
		private accountNumber: string,
		private address: {
			street: string
			city: string
		},
		private status: "ACTIVE",
	){}

	getId(): string{
		return this.accountId
	}

	mapToJson(): UsersType{
		return {
			accountId: this.accountId,
			accountNumber: this.accountNumber,
			address: {
				street: this.address.street,
				city: this.address.city,
			},
			status: this.status,
		}
	}


	getUserData(){
		return {
			accountId: this.accountId,
			accountNumber: this.accountNumber,
			address: {
				street: this.address.street,
				city: this.address.city,
			},
			status: this.status,
		}
	}


}