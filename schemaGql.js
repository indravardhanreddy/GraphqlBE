import { ApolloServer, gql } from "apollo-server";

//Schema - Step 1
const typeDefs = gql`
    type Query {
        users: [User]
        user(_id: ID): User!
        posts: [Post]
        individualPost(userId: ID): [Post]!
        getOptionChain(symbol: String): OptionChain
    }

    type User {
        _id: ID
        email: String!
        lastName: String!
        firstName: String!
        password: String!
        posts: [Post]
    }

    type Post {
        _id: ID
        post: String!
        userId: ID!
        comments: [comment]
    }

    type comment {
        comment: String!
        userId: ID!
    }

    type Token {
        token: String!
        user:  User!
    }

    type OptionChain {
        symbol: String!
    }


    type Mutation {
        signupUser(signup: UserInput!): User
        createPost(postData : PostInput!): String
        createComment(commentData : CommentInput!): comment
        signinUser(signin: UserSigninInput!): Token
    }

    input UserInput {
        email: String!
        lastName: String!
        firstName: String!
        password: String!
    }

    input UserSigninInput {
        email: String!
        password: String!
    }   

    input PostInput {
        post: String!
        userId: ID!
    }

    input CommentInput {
        comment: String!
        userId: ID!
        postId: ID!
    }


`

export default typeDefs;