"use strict";

const assert = require("node:assert/strict");
const { inspect, descend } = require("./index.js");
const vault = require("./vault.js");
const { normalise, openBox } = require("./rabbit.js");

const result = inspect();
assert.deepEqual(result.readings, [13, 13, 14]);
assert.equal(result.account.stable, false);
assert.equal(descend(0, result.boundary), 64);
assert.equal(descend(-1, result.boundary), 64);
assert.equal(normalise(" Before Main "), "beforemain");
assert.equal(normalise("Suzanne Sz\u00e1sz"), "suzanneszasz");
assert.ok(vault.boxes.length > 0);
assert.equal(openBox(vault.boxes[0], vault.start, "wrong"), null);

console.log("same as yesterday");
