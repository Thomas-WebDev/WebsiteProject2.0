const { validationResult } = require('express-validator');
const fs = require('fs');

const Post = require('../models/Post');
const PostBody = require('../models/PostBody');
const Event = require('../models/Event');
const Sidebar = require('../models/Sidebar');
const SidebarSection = require('../models/SidebarSection');
const LinkedPost = require('../models/LinkedPost');
const Image = require('../models/Image');

exports.fetchAll = async (req, res, next) => {
  try {
    const [Posts] = await Post.fetchAll();
    res.status(200).json(Posts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetch = async (req, res, next) => {
  try {
    const Posts = await Post.fetch(req.params.id);
    res.status(200).json(Posts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postPost = async (req, res, next) => {
  var post_id;
  var fandom_id = req.body.fandom_id;	
  var type = req.body.type;
  var name = req.body.name.trim();
  var thumbnail	= req.body.thumbnail;
  var description = req.body.description;
  if (fandom_id != NULL) {
    post_id = fandom_id.replace(/\s/g, '_').toLowerCase() + '-' + name.replace(/\s/g, '_').toLowerCase();
  } else {
    post_id = name.replace(/\s/g, '_').toLowerCase()
  }
  try {
    post = await Post.findOne(post_id);
    if (post[0].length!=0) {
      return res.status(201).json({ success: false, post_id: post_id });
    } else {
      Post.post(post_id, fandom_id, type, name, thumbnail, description);
      var filepath = "../public/uploads/posts/" + post_id + ".html";
      fs.closeSync(fs.openSync(filepath, 'w'));  
      if (type == "Character" || type == "Event" || type == "Group") {
        const event_type = req.body.event_type;
        const display_start = req.body.display_start;
        const year_start = req.body.year_start;
        const month_start = req.body.month_start;
        const day_start = req.body.day_start;
        const display_end = req.body.display_end;
        const year_end = req.body.year_end;
        const month_end = req.body.month_end;
        const day_end = req.body.day_end
        Event.post(post_id, event_type, display_start, year_start, month_start, day_start, display_end, year_end, month_end, day_end);
      } 
      if (!(type == "Article" || type == "Blog" || type == "Fandom")) {
        Sidebar.post(post_id);
        const characterArr = ["Alternate names/Aliases", "Gender", "Race/Species", "Birth Location", "Birth", "Death", "Affiliations"];
        const eventArr = ["Alternate names", "Groups and People Involved"];
        const groupsArr = ["Alternate names", "Governance/Structure/Organization Type", "Leader", "Region", "Affiliations"];
        const locationArr = ["Alternate names", "Location Type", "Region", "Affiliations"];
        const speciesArr = ["Alternate names", "Home/Orgin", "Affiliations"];
        if(type == "Character") {
          for (i = 0; i < characterArr.length(); i++) {
            await SidebarSection.post(post_id, characterArr[i]);
          }
        }
        if(type == "Event") {
          for (i = 0; i < eventArr.length(); i++) {
            await SidebarSection.post(post_id, eventArr[i]);
          }
        } 
        if(type == "Group") {
          for (i = 0; i < groupsArr.length(); i++) {
            await SidebarSection.post(post_id, groupsArr[i]);
          }
        } 
        if(type == "Location") {
          for (i = 0; i < locationArr.length(); i++) {
            await SidebarSection.post(post_id, locationArr[i]);
          }
        } 
        if(type == "Species/Race") {
          for (i = 0; i < characterArr.length(); i++) {
            await SidebarSection.post(post_id, speciesArr[i]);
          }
        }
      } 
      return res.status(201).json({ success: true, post_id: post_id });
    }    
  } catch (err) {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    console.log("ERROR:" + err);
    next(err);
  }
};

exports.postEdit = async (req, res, next) => {
  var post_id = req.body.post_id;
  var name = req.body.name.trim();
  var thumbnail	= req.body.thumbnail;
  var description = req.body.description;
  try {
    //UPDATE OVERVIEW
    const Posts = await Post.update(post_id, name, thumbnail, description);
    //UPDATE CONTENT
    var filepath = "../public/uploads/posts/" + post_id + ".html";
    fs.writeFile(filepath, req.body.data, err => {
      if (err) {
        console.error(err)
        return
      }
    })

    //UPDATE EVENT
    if (type == "Character" || type == "Event" || type == "Group") {
    
    }

    //UPDATE SIDEBAR
    if (!(type == "Article" || type == "Blog" || type == "Fandom")) {
    
    }

    res.status(200).json({ success: true, post_id: post_id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postLike = async (req, res, next) => {
  try {
    const Posts = await Post.like(req.params.id);
    res.status(200).json(Posts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postView = async (req, res, next) => {
  try {
    const Posts = await Post.view(req.params.id);
    res.status(200).json(Posts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const post_id = req.params.post_id;
  try {
    const deleteResponse = await Post.delete(req.params.post_id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};