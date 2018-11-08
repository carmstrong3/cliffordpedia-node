const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

// Set title for first describe block
  describe("GET /", () => {

// Return code 200
    it("should return status code 200", (done) => {

// Get base url and second argument catches response properties
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);

// Call done to let jasmine know test is over
        done();
      });
    });

  });
});
