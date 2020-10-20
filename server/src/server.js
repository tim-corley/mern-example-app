require("dotenv").config({ path: require("find-config")(".env") });
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/users";
import BugRoute from "./routes/bugs";
// bring in all typeDefs & Resolvers
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index";
import { resolvers } from "./resolvers/index";

const app = express();
const port = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server.applyMiddleware({ app: app });

app.use(cors());
app.use(express.json());

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

// app.use("/bugs", BugRoute);
// app.use("/users", UserRoute);

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
