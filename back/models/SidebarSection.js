const db = require('../config/db');

module.exports = class Sidebar {
  constructor(sidebar_id, label, editable, sidebar_sections_order) {
    this.sidebar_id = sidebar_id;
    this.label = label;
    this.editable = editable;
    this.sidebar_sections_order = sidebar_sections_order;
  }
}