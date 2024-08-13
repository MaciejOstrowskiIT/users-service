import express from "express";
import cors from "cors";
import { logger } from "./utils/logs";
import { MongoClient } from "mongodb";
import { Controller } from "./controllers/Controller";
import { UserService } from "./services/MongoService";
import { UsersType } from "./models/Users";
import { MongoMapper } from "./mappers/MongoMapper";
import { MongoUserSerializer } from "./mappers/MongoUserSerializer";

const app = express();
app.use( express.json() );
app.use( cors( { origin: "*" } ) );

const start = async () => {

	try {
		const mongoClient = await new MongoClient( process.env.MONGO_URL! ).connect();
		const database = mongoClient.db( "bankTS" );
		app.listen( process.env.PORT );
		logger( "info", "Microservice is working fine at port " + process.env.PORT );
		logger( "info", "[Users] Connected" );

		const collection = database.collection<UsersType>( process.env.COLLECTION_NAME! );
		const service = new UserService( new MongoMapper(database.collection(process.env.COLLECTION_NAME!), new MongoUserSerializer()) );
		const usersController = new Controller( service );

		app.get( "/get-user-id/:userID", async (req, res) =>
			await usersController.getUserId( req, res ) );
		app.get( "/get-user-data/:userID", async (req, res) =>
			await usersController.getUserData( req, res ) );


	} catch ( err ) {
		console.log( "App crashed due to an error: " + err );
	}
};

start();
