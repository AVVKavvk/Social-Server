const Post = require("../models/Post");
const User = require("../models/User");
const { success, error } = require("../utils/Wrapper");
const alll=async (req,res)=>{
  res.send(success(200,"vipin"));
}
const createPostController = async (req, res) => {
  try {
    const { caption } = req.body;
    const owner = req._id;
    // console.log(owner);
    const user = await User.findById(req._id);
    const post = await Post.create({
      owner,
      caption,
    });
    user.posts.push(post._id);
    await user.save();
    res.send(success(201, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const likeUnlikeController = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Post.findById(postId);
    const currentUser = req._id;
    if (!post) {
      return res.send(error(404, " post not found"));
    }
    if (post.likes.includes(currentUser)) {
      const index = post.likes.indexOf(currentUser);
      post.likes.splice(index, 1);
      await post.save();
      return res.send(success(200, "Unlike successfully"));
    } else {
      post.likes.push(currentUser);
      await post.save();
      return res.send(success(200, "like successful"));
    }
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updatePostController = async (req, res) => {
  try {
    const { postId, caption } = req.body;
    const curUserId = req._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.send(error(404, "post not found"));
    }
    if (post.owner.toString() !== curUserId) {
      return res.send(error(403, "you are not the owner of this post"));
    }
    if (caption) {
      post.caption = caption;
    }
    await post.save();
    return res.send(success(200, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const deletePostController = async (req, res) => {
  try {
    const postId = req.body.postId;
    const curUserId = req._id;
    const curUser = await User.findById(curUserId);
    const post = await Post.findById(postId);
    if (!post) {
      return res.send(error(404, "post not found"));
    }

    if (post.owner.toString() !== curUserId) {
      return res.send(error(403, "you are not the owner of this post"));
    }

    const postIndex = curUser.posts.indexOf(postId);
    curUser.posts.splice(postIndex, 1);
    await curUser.save();
    await post.deleteOne();
    return res.send(success(200, "Post Deleted"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
module.exports = {
  createPostController,
  likeUnlikeController,
  updatePostController,
  deletePostController,
  alll
};
