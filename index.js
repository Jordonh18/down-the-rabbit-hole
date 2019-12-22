"use strict";

const { observed, limit, measure } = require("./measure.js");
const { record } = require("./record.js");
const { descend } = require("./walk.js");

function inspect(values = observed) {
  const readings = values.map(measure);
  const account = record(readings);

  return {
    readings,
    account,
    boundary: 64,
    reached: descend(0, 64),
    limit
  };
}

if (require.main === module) console.log(JSON.stringify(inspect(), null, 2));

module.exports = { inspect, descend };
