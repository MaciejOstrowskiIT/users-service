import { User } from '../domain/User';
import { UsersDb } from '../models/Users';
import { Serializer } from './Serializer';

//TransactionDb powinno nazywac sie TransactionDbSchema
export class MongoUserSerializer implements Serializer<UsersDb, User> {

  mapToEntity(document: UsersDb): User {
    return new User(
        document.accountId,
        document.accountNumber,
        document.address,
        document.status,
    );
  }

  mapToDb(entity: User): UsersDb {
    return { _id: entity.getId(), ...entity.mapToJson() }; //tutaj krzyczy bo w metodie mapToJson nie zwracamy wszystkiego
  }

}
