import { Request, Response } from "express";
import { UserService } from "../services/MongoService";
import { ResponseHandler } from "../utils/ResponseHandler";

export class Controller extends ResponseHandler{
	constructor(private service: UserService) {
		super()
	}

	public async getUserId(req: Request, res: Response): Promise<void> {
		const id = req.params.id
		if(!id) {
			throw new Error('no id provided')
		}
		try {
			const data = await this.service.getUserId(id);
			res.status(200).send(data);
		} catch (err) {
			res.status(504).send(err);
		}
	}

	public async getUserData(req: Request, res: Response): Promise<void> {
		try {
			const id = req.params.userID
			if(!id) {
				throw new Error('No id provided')
			}

			const result = await this.service.getUserData(id);
			res.status(200).json(result);

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
