const db = require('../config/db');

module.exports = class Event {
  constructor(post_id, event_type, display_start, year_start, month_start, day_start, display_end, year_end, month_end, day_end) {
    this.post_id = post_id;	
    this.event_type = event_type;
    this.display_start = display_start;
    this.year_start = year_start;
    this.month_start = month_start;
    this.day_start = day_start;
    this.display_end = display_end;
    this.year_end = year_end;
    this.month_end = month_end;
    this.day_end = day_end
  }
}