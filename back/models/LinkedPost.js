const db = require('../config/db');

module.exports = class LinkedPost {
  constructor(linked_post_id, sidebar_section_id, name, post_id) {
    this.linked_post_id = linked_post_id;
    this.sidebar_section_id = sidebar_section_id;
    this.name = name;
    this.post_id = post_id;
  }
}