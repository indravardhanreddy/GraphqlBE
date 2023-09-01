import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schemaGql.js";
import mongoose from "mongoose";
import { MONGO_URI , JWT_SECRET} from "./config.js";
import jwt from "jsonwebtoken";

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on("Connected to MongoDB", () => {
    console.log("Connected to MongoDB")
})

// import models here
import "./models/User.js";
import "./models/Posts.js";
import resolvers from "./resolvers.js";

const context = ({ req }) => {
    const { authorization } = req.headers;
    console.log(authorization)
    if (authorization) {
        const { userId } = jwt.verify(authorization, JWT_SECRET);
        const value = { userId };
        return value;
    }
}

//Apollo Server - Step 3
// mongodb+srv://ivr:Always6819@cluster0.lxyxtiw.mongodb.net/graphqlsample?retryWrites=true&w=majority
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: context,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})

//Server - Step 4
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})
