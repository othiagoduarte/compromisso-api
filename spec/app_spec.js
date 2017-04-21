var request = require("request");
var base_url = "http://localhost:3008"

describe("Quando houver uma requisição na api compromisso", function(){

  describe("Para a rota default", function() {
    
    it("Deve retornar statusCode 200", function() {

        request.get(base_url + "/", function(error, response, body) {
            expect(response.statusCode)
			      .toBe(200);
            done();
        });

    });

  });

  describe("Para uma rota desconhecida", function() {
    
    it("Deve retornar statusCode 404", function() {

        request.get(base_url + "/base_urlsdasda/", function(error, response, body) {
            expect(response.statusCode)
			      .toBe(404);
            done();
        });

    });

  });

});