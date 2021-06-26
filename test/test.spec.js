const assert = require("assert");
const { testFunc } = require("../src/testExample");

describe("testFunc", () => {
  it("should pass this test on GitHub actions", () => {
    const result = testFunc(2, 2);
    assert.equal(4, result);
  });

  it("should pass this test on GitHub actions", () => {
    const result = testFunc(2, 2);
    assert.notEqual(5, result);
  });
});
