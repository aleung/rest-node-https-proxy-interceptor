 /**
  * @author      Sander Remie (rmi7) <user@rmi7.me>
  * @desc        HTTPS proxy for cujojs/rest module
  */

'use strict'

var interceptor = require('rest/interceptor')
var nodeClient = require('rest/client/node')
var HttpsProxyAgent = require('https-proxy-agent')

/**
 * Add support for using an HTTPS proxy in node
 *
 * The rest/client/node client is used by default instead of the
 * common default client for the platform. This is because the module
 * that is used for proxying is a node js module, so this will only work
 * in node
 *
 * @param {Client} [client=rest/client/node] custom client to wrap
 * @param {string} [config.url] the url of the proxy, e.g. http://127.0.0.1:3128
 *
 * @returns {Client}
 */
module.exports = interceptor({
	client: nodeClient,
	init: function (config) {
		if (typeof config.url !== "undefined" && typeof config.url !== "string") {
			throw new Error("url should be a String")
		}
		return config
	},
	request: function (request, config) {
		if (config.url) {
			if (typeof request.mixin === "undefined") {
				request.mixin = {}
			}
			request.mixin.agent = new HttpsProxyAgent(config.url)
		}
		return request
	}
})
