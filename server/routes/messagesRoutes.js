
const {addMessages,getAllMessages} =require("../controllers/messagesController")

const router=require("express").Router();
router.post("/addmsg/",addMessages);
router.post("/getmsg/",getAllMessages);

module.exports=router;