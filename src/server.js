import app from "./app.js";
import { SERVER_PORT } from "./config/index.js";
import { mongoose } from "./models/index.js";
import { MONGO_URL } from "./config/index.js";

const serverStart = async (app) => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connect");

    app.listen(SERVER_PORT);

    console.log(`listening on ${SERVER_PORT}!`);
  } catch (err) {
    console.error(err);
  }
};

serverStart(app);
