const { it, describe } = require("mocha");
const { assert } = require("chai");

const { getAllUsers } = require("../src/users/users.controllers");

describe("Test de controladores de usuario", () => {
  it("Deberia retornar todos los usuarios", (done) => {
    getAllUsers().then((data) => {
      assert.typeOf(data, "array");
      done();
    });
  });
});
