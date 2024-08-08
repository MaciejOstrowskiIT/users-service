import { Collection, ObjectId, Transaction } from "mongodb";
import { IGetter } from "../interfaces/IGetter";
import { UsersType } from "../models/Users";

export class MongoService
	implements IGetter<UsersType> {
	constructor(private collection: Collection<UsersType>) {}

	async getAll() {
		return await this.collection.find().toArray();
	}

	async getOneById(id: string): Promise<UsersType | null> {
		return await this.collection.findOne( {id} );
	}

	// async createOne(transaction: TransactionType): Promise<TransactionType | null> {
	// 	return await this.collection.insertOne( transaction );
	// }
}