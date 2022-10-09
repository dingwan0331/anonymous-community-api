import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = await mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(uri, mongooseOpts);
};

const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

const drop = async () => {
  await mongoose.connection.dropDatabase();
};

export { connect, disconnect, drop };
