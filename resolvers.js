import { users, posts } from "./fakedb.js";
import { randomBytes } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import axios from "axios";
const User = mongoose.model("User");
const Post = mongoose.model("Post");



//Resolvers - Step 2
const resolvers = {
    Query: {
        users: async (_, parent) => {

            let postData = await Post.find({})
            let users = await User.find({})
            console.log(users)

            return await users.map((user) => {
                user.posts = postData.filter((post) => post.userId == user._id)
                return user
            })

        },
        posts: async (_, parent) => {
            return await Post.find({})
        },
        user: async (_, { _id }) => {
            return await User.findOne({ _id })
        },
        individualPost: async (_, { userId }) => {
            console.log(posts)
            return await Post.find({ userId })
            // return posts.filter((post) => post.userId == userId)
        },
        getOptionChain: async (_, { symbol }) => {
            try {
                const response = await axios.get(`https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY`, {
                    headers: {
                        'authority': 'www.nseindia.com',
                        'dnt': '1',
                        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                        'accept-encoding': 'gzip, deflate, br',
                        'accept-language': 'en-IN,en;q=0.9,en-GB;q=0.8,en-US;q=0.7,hi;q=0.6,mr;q=0.5',
                        'cache-control': 'no-cache',
                        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
                        'Cookie': 'AKA_A2=A; ak_bmsc=A3D9396784195EABEF59E18998574E5C~000000000000000000000000000000~YAAQDI0sMUmtLUqKAQAAE4vbTRQ3ASkSDpJzexqIMy/pKJDljUonYRRMiAu8h0JBWZNTh4lOpNa6CEyjd18V2udvYZBUBYotz9Irc95VvL/I6460R5tHWtvjSiTdQatVL0vPclTe6if2wkN1hvQ9ylUgXXVIUYgBq4svPsefOITIc/2kfCUnaiQyH5oLPqWtwenQylsd/kl5uUi7uBrrdMfcEoVp7YnE05brOIOjAUTvDig5yizIDw8EXpvlqNzfSUevmVx1C4dJaP6BRAtkyPlYdI4YvamJWAFju9OWVt0AeIkX6vJEpOJoX00EZpBKwblcNgnsSwG/ZdCBnhazkTPbH5ee9wl1BhaTz5hMPsr4ZOwohuKeBaAGs2VJ4A=='
                    }
                });

                console.log(response)

                // Process the response and return the relevant data
                const optionChainData = response.data; // Adjust this based on the API response structure

                return optionChainData;
            } catch (error) {
                throw new Error('Failed to fetch data from NSE India API');
            }
        },
    },
    User: {
        posts: async (ur) => await Post.find({ userId: ur._id })
        // posts: (ur) => posts.filter((p) => p.userId === ur._id)
    },
    Mutation: {
        signupUser: async (_, { signup }) => {
            console.log({ signup })
            const user = await User.findOne({ email: signup.email })
            if (user) {
                console.log("User already exists")
            }
            const hashedPassword = await bcrypt.hash(signup.password, 10)
            const newUser = new User(
                {
                    ...signup,
                    password: hashedPassword
                }
            )
            return await newUser.save()

        },
        createPost: async (_, { postData }, value) => {
            if (!value.userId) {
                throw new Error("You must be logged in to create a post")
            }
            const newPost = new Post({
                ...postData
            })
            await newPost.save()
            return "Post Saved Successfully"
        },
        createComment: async (_, { commentData }, value) => {
            if (!value.userId) {
                throw new Error("You must be logged in to create a comment")
            }
            const newComment = {
                ...commentData
            }
            const post = await Post.findOne({ _id: commentData.postId })
            console.log(post)
            post.comments.push(newComment)
            await post.save()
            return newComment
        },
        signinUser: async (_, { signin }) => {
            const user = await User.findOne({ email: signin.email })
            if (!user) {
                throw new Error("User does not exist with this email")
            }
            const isPasswordValid = await bcrypt.compare(signin.password, user.password)
            if (!isPasswordValid) {
                throw new Error("Email or password is incorrect")
            }
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" })
            return { token, user }
        }
    },
}


export default resolvers;