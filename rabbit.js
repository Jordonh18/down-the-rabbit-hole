"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vault = require("./vault.js");

const statePath = path.join(process.cwd(), ".rabbit-state");
const normalise = value => String(value).normalize("NFKD").replace(/\p{M}/gu, "").trim().toLowerCase().replace(/\s+/g, "");
const keyFor = (carry, answer) => crypto.createHash("sha256").update(carry).update("\0").update(normalise(answer)).digest();

function openBox(box, carry, answer) {
  try {
    const packed = Buffer.from(box, "base64url");
    const decipher = crypto.createDecipheriv("aes-256-gcm", keyFor(carry, answer), packed.subarray(0, 12));
    decipher.setAuthTag(packed.subarray(12, 28));
    return JSON.parse(Buffer.concat([decipher.update(packed.subarray(28)), decipher.final()]).toString("utf8"));
  } catch {
    return null;
  }
}

function readState() {
  if (!fs.existsSync(statePath)) return { at: 0, carry: vault.start };
  return JSON.parse(fs.readFileSync(statePath, "utf8"));
}

function run(args = process.argv.slice(2)) {
  if (args[0] === "--reset") {
    fs.rmSync(statePath, { force: true });
    console.log("It forgot everything.");
    return;
  }

  const state = readState();
  if (state.done) {
    console.log("It is already open.");
    return;
  }
  if (args.length === 0) {
    console.log("It is waiting. Give it what you found.");
    return;
  }

  const opened = openBox(vault.boxes[state.at], state.carry, args.join(" "));
  if (!opened) {
    process.exitCode = 1;
    console.log("Nothing moved.");
    return;
  }

  fs.writeFileSync(statePath, JSON.stringify(opened.done ? { done: true } : { at: state.at + 1, carry: opened.carry }));
  console.log(opened.text);
}

if (require.main === module) run();

module.exports = { normalise, openBox, run };
