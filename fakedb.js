export const users = [
    {
        _id: 1,
        email: "john@gmail.com",
        lastName: "Doe",
        firstName: "John",
        password: "123456",
    },
    {
        _id: 2,
        email: "sai@gmail.com",
        lastName: "sai",
        firstName: "nikhil",
        password: "123456",
    },
    {
        _id: 3,
        email: "sample@gmail.com",
        lastName: "sample",
        firstName: "test",
        password: "123456",
    },
]

export const posts = [
    {
        post: "This is my first post",
        userId: 1,
        comments: [
            {
                comment: "This is my first comment",
                userId: 2,
            },
            {
                comment: "This is my second comment",
                userId: 2,
            }],
    },
    {
        post: "This is my second post",
        userId: 2,
        comments: [
            {
                comment: "This is my first comment",
                userId: 1,
            },
            {
                comment: "This is my second comment",
                userId: 1,
            }],
    },
    {
        post: "This is my third post",
        userId: 1,
        comments: [
            {
                comment: "This is my first comment",
                userId: 3,
            },
            {
                comment: "This is my second comment",
                userId: 3,
            }],
    },
    {
        post: "This is my fourth post",
        userId: 2,
        comments: [
            {
                comment: "This is my first comment",
                userId: 1,
            },
            {
                comment: "This is my second comment",
                userId: 1,
            }],
    },
    {
        post: "This is my fifth post",
        userId: 1,
        comments: [
            {
                comment: "This is my first comment",
                userId: 2,
            },
            {
                comment: "This is my second comment",
                userId: 3,
            }],
    },
]