const {
  followUnfollowController,
  getAllPostOfMyFollowingsController,
  geMyPostController,
  getAllPostOfUser,
  deleteMyProflie,
  getMyInfoController,
  updateMyProfileContoller,
} = require("../controllers/userController");
const logger = require("../middlewares/logger");

const route = require("express").Router();

route.post("/follow", logger, followUnfollowController);
route.get("/getallpost", logger, getAllPostOfMyFollowingsController);
route.get("/myallpost", logger, geMyPostController);
route.get("/userpost", logger, getAllPostOfUser);
route.get("/getMyInfo", logger, getMyInfoController);
route.delete("/", logger, deleteMyProflie);
route.put("/", logger, updateMyProfileContoller);

module.exports = route;
