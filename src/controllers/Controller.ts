import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { MongoService } from "../services/MongoService";
import { ResponseHandler } from "../utils/ResponseHandler";

export class Controller extends ResponseHandler{
	constructor(private service: MongoService) {
		super()
	}

	public async getUserId(req: Request, res: Response): Promise<void> {
		const id = req.params.id
		if(!id) {
			throw new Error('no id provided')
		}
		try {
			const data = await this.service.getOneById(id);
			res.status(200).send(data);
		} catch (err) {
			res.status(504).send(err);
		}
	}

	public async getUserData(req: Request, res: Response): Promise<void> {
		try {
			// console.log('getUserData service req.params',req.params );
			// console.log('in getUserData')
			const id = req.params.userID
			if(!id) {
				throw new Error('No id provided')
			}

			const result = await this.service.getOneById(id);
			res.status(200).json(result);
			console.log("result", result);

		} catch (error) {
			
			res.json(this.handleError((error as Error).message, 400, 'getUserData'))
		}
	}

	private generateAccountNumber(): string {
		const length = 26;
		let result = "";

		for (let i = 0; i < length; i++) {
			result += Math.floor(Math.random() * 10);
		}
		return result;
	}

}
