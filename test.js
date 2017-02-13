var expect = require("chai").expect
var proxy = require('./')
var HttpsProxyAgent = require("https-proxy-agent")

describe("rest node https proxy interceptor", function() {

    it("should add agent to request.mixin if proxy url provided", function() {
        var proxy_url = "http://127.0.0.1:3128/"

        var client = proxy(
            function (request) { return { request: request } },
            { url: proxy_url }
        )

        return client({})
            .then(function (response) {
                expect(response).to.be.an("object")
                expect(response).to.have.property("request").to.be.an("object")
                expect(response.request).to.have.property("mixin").to.be.an("object")
                expect(response.request.mixin).to.have.property("agent").to.be.an("object")
                expect(response.request.mixin.agent).to.be.an.instanceof(HttpsProxyAgent)
                expect(response.request.mixin.agent).to.have.property("proxy").to.be.an("object")
                expect(response.request.mixin.agent.proxy).to.have.property("href").to.be.a("string")
                expect(response.request.mixin.agent.proxy.href).to.equal(proxy_url)
            })
    })

    it("should not add agent to request.mixin if no proxy url provided", function() {
        var client = proxy(
            function (request) { return { request: request } }
        )

        return client({})
            .then(function (response) {
                expect(response).to.be.an("object")
                expect(response).to.have.property("request").to.be.an("object")
                expect(response.request).to.not.have.property("mixin")
            })
    })

    it("should not add agent to request.mixin if proxy url explicitly set to undefined", function() {
        var client = proxy(
            function (request) { return { request: request } },
            { url: undefined }
        )

        return client({})
            .then(function (response) {
                expect(response).to.be.an("object")
                expect(response).to.have.property("request").to.be.an("object")
                expect(response.request).to.not.have.property("mixin")
            })
    })

    it("should throw if proxy url is not a String", function() {
        [7, 0, [], {}, Infinity, null, false, true, NaN, function(){}]
            .forEach(function(candidate_url) {
                expect(proxy.bind(proxy,
                    function (request) { return { request: request } },
                    { url: candidate_url }
                )).to.throw('url should be a String')
            })
    })

    it("should throw if second param is not an object", function() {
        [7, [], Infinity, "a string", function(){}]
            .forEach(function(candidate_config) {
                expect(proxy.bind(proxy,
                    function (request) { return { request: request } },
                    candidate_config
                )).to.throw('second param should be an object')
            })
    })

    it("should support interceptor wrapping", function(done) {
        expect(typeof proxy().wrap).to.equal("function")
        done()
    })
})
