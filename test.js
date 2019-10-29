"use strict";

const assert = require("node:assert/strict");
const { inspect, descend } = require("./index.js");

const result = inspect();
assert.deepEqual(result.readings, [13, 13]);
assert.equal(result.account.stable, true);
assert.equal(descend(0, result.boundary), 21);

console.log("same as yesterday");
