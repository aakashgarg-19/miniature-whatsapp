const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const {message, from, to} = req.body;
        const data = await messageModel.create({
            message: {text: message},
            users: [from, to],
            sender: from,
        });
        if(data) return res.json({msg:"Message added seccessfully"});
        return res.json({msg:"Failed to add message"});
    }catch(ex){
        next(ex);
    }
};

module.exports.getMessages = async (req, res, next) => {
  try {
      const {from, to} = req.body;
      const messages = await messageModel.find({
          users: {$all: [from, to]},
      }).sort({updatedAt: 1})
      const projectedMessages = messages.map((msg)=>{
          return {
              fromSelf: msg.sender.toString() === from,
              message: msg.message.text,
          }
      });
      return res.json(projectedMessages);
  }catch(ex){
      next(ex);
  }
};