const Wiki = require("./models").Wiki;
const User = require("./models").User;
//const Authorizer = require("../policies/wikis");

module.exports = {

  getAllWikis(callback){
    return Wiki.findAll()
    .then((wikis) => {
      callback(null, wikis);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addWiki(newWiki, callback){
    return Wiki.create(newWiki)
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getWiki(id, callback){
    return Wiki.findByPk(id, {
      include: [{ model: User }]
    })
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updateWiki(req, updatedWiki, callback){
    return Wiki.findByPk(req.params.id)
    .then((wiki) => {
      if(!wiki){
        return callback("Wiki not found");
      }
      const authorized = new Authorizer(req.user, wiki).update();
      if(authorized) { 
        wiki.update(updatedWiki, {
          fields: Object.keys(updatedWiki)
        })
        .then(() => {
          callback(null, wiki);
        })
        .catch((err) => {
          callback(err);
        });
      } else {
      req.flash("notice", "You are not authorized to do that.");
      callback("Forbidden");
     } 
   });
  },
  deleteWiki(req, callback){
    return Wiki.findByPk(req.params.id)
    .then((wiki) => {
      const authorized = new Authorizer(req.user, wiki).destroy();
      if(authorized) { 
        wiki.destroy()
        .then((res) => {
          callback(null, wiki);
        });
        
    } else {
        req.flash("notice", "You are not authorized to do that.")
        callback(401);
      } 
    })
    .catch((err) => {
      callback(err);
    });
  } 
}
