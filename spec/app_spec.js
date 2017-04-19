var request = require("request");
var base_url = "http://localhost:3008"

describe("Teste de comunicação com a api-compromissos", function(){

  describe("GET /", function() {
    
    it("returns status code 200", function() {

        request.get(base_url + "/api/login", function(error, response, body) {
            expect(response.statusCode)
			.toBe(200);
            
			done();
        });

    });

  });

});