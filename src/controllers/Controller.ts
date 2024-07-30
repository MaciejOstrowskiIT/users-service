import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { MongoService } from "../services/MongoService";

export class Controller {
	constructor(private service: MongoService) {}

	private generateAccountNumber(): string {
		const length = 26;
		let result = "";

		for ( let i = 0; i < length; i++ ) {
			result += Math.floor( Math.random() * 10 );
		}
		return result;
	}

	public async getUserId(req: Request, res: Response): Promise<void> {
		const id = new ObjectId( req.params.id );
		try {
			const data = await this.service.getOneById( id );
			res.status( 200 ).send( data );
		} catch ( err ) {
			res.status( 504 ).send( err );
		}
	}


	public async getUserData(req: Request, res: Response): Promise<void> {
		try {
			console.log('getUserData req.params',req.params );
			const id =  req.params.id as unknown as ObjectId;
			const result = await this.service.getOneById(id);
			console.log("result", result)
			res.status( 200 ).json( result );
		} catch ( error ) {
			res.json( { status: "400", message: error } );
		}
	}

}
