"use strict";

const observed = Object.freeze([13, 13]);
const limit = 21;

function measure(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError("reading must be finite");
  return Math.trunc(number);
}

module.exports = { observed, limit, measure };
