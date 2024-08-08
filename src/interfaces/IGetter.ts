import { ObjectId } from "mongodb";

export interface IGetter<T> {
	getAll(): Promise<T[]>;

	getOneById(id: string): Promise<T | null>;
}