const { responseJson } = require("../../config/response");

const Post = require('../models/post.model')
const Account = require('../models/account.model')

class PostController {
    async getByAccountId(req, res, next) {
        try {
            const posts = await Post.find({ account: req.params.accountId })
                .populate({ path: 'account', select: 'avatar fullname' })

            return res.json(responseJson(true, posts))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async create(req, res, next) {
        try {
            req.body.account = res.data.account._id
            const newPost = new Post(req.body)

            await newPost.save()

            return res.json(responseJson(true, newPost))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.body._id) {
                const err = { id: { message: 'PostId does not exist!' } }
                return res.json(responseJson(false, err))
            }

            const post = await Post.findOneAndDelete({ _id: req.body._id })
            if (!post) {
                const err = { post: { message: 'Post does not exist!' } }
                return res.json(responseJson(false, err))
            }

            return res.json(responseJson(true, post))
        }
        catch (err) {
            return res.json(responseJson(false, err.errors))
        }
    }
}

module.exports = new PostController