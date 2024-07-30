import express from "express";
import cors from "cors";
import { logger } from "./utils/logs";
import { MongoClient } from "mongodb";
import { Controller } from "./controllers/Controller";
import { MongoService } from "./services/MongoService";
import { UsersType } from "./models/Users";

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
		const service = new MongoService( collection );
		const usersController = new Controller( service );

		app.get( "/get-user-id/:userID", async (req, res) =>
			await usersController.getUserId( req, res ) );
		app.get( "/get-user-data/:userID", async (req, res) =>
			await usersController.getUserData( req, res ) );
		app.get( "/api/get-users", (req, res) => {
			res.send( "To jest testowy endpoint GET! Permissions" );
		} );


	} catch ( err ) {
		console.log( "App crashed due to an error: " + err );
	}
};

start();
