"use strict";

function descend(mark = 0, boundary = 64) {
  if (mark >= boundary) return mark;
  return descend(mark + 1, boundary);
}

module.exports = { descend };
