"use strict";

function record(values) {
  if (!Array.isArray(values) || values.length === 0) throw new TypeError("readings are required");

  const changes = values.slice(1).filter((value, index) => value !== values[index]).length;
  return {
    count: values.length,
    first: values[0],
    last: values.at(-1),
    changes,
    stable: changes === 0
  };
}

module.exports = { record };
