require("dotenv").config({ path: require("find-config")(".env") });
import { ApolloServer } from "apollo-server-express";
import AuthMiddleware from "./middleware/auth";
import { typeDefs } from "./typeDefs/index";
import { resolvers } from "./resolvers/index";
import { models } from "./models/index";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(AuthMiddleware);

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: ({ req }) => {
    let { isAuth, user } = req;
    return {
      isAuth,
      user,
      ...models,
    };
  },
});

server.applyMiddleware({ app });

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log(`\n 🌎 Succesfully connected to MongoDB Atlas`);
});

app.listen(port, (err) => {
  if (err) {
    console.log("❗There was an error trying to start the server.", err);
    return;
  }
  console.log(
    `\n ⚡ Server is up & running on port: ${port}`,
    `\n 🚀 Apollo Playground ready at: http://localhost:${port}${server.graphqlPath} \n`
  );
});
