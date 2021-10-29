const db = require('../config/db');

module.exports = class Posts {
  constructor(post_id,	fandom_id,	type,	name,	thumbnail,	description,	created,	updated,	likes,	views,	active) {
    this.post_id	= post_id;
    this.fandom_id	= fandom_id;	
    this.type = type;
    this.name = name;
    this.thumbnail	= thumbnail;
    this.description = description;
    this.created	= created;
    this.updated = updated;
    this.likes = likes;
    this.views = views;
    this.active = active;
  }

  static fetch(post_id) {
    return db.execute(
      'SELECT * FROM posts WHERE post_id=?', [post_id]
    );
  }
  
  static insert(post_id, fandom_id, type, name, thumbnail, description) {
    return db.execute(
      'INSERT INTO posts (post_id, fandom_id, type, name, thumbnail, description) VALUES (?, ?, ?, ?, ?, ?)',
      [post_id, fandom_id, type, name, thumbnail, description]
    );
  }

  static update(post_id, name, thumbnail, description) {
    return db.execute(
      'UPDATE posts SET name=? thumbnail=? description=? updated=NOW() WHERE post_id=?',
      [name, thumbnail, description, post_id]
    );
  }

  static like(post_id) {
    return db.execute(
      'UPDATE posts SET likes=likes+1 WHERE post_id=?', [post_id]
    );
  }

  static unlike(post_id) {
    return db.execute(
      'UPDATE posts SET likes=likes-1 WHERE post_id=?', [post_id]
    );
  }

  static view(post_id) {
    return db.execute(
      'UPDATE posts SET views=views+1 WHERE post_id=?', [post_id]
    );
  }

  static delete(post_id) {
    return db.execute(
      'DELETE FROM posts WHERE post_id=?', [post_id]
    );
  }
}