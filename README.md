# rest node https proxy interceptor

this is a plugin for the [cujojs/rest](https://github.com/cujojs/rest) module.
what this plugin does is add support for using an HTTPS proxy.

this plugin **ONLY** works with the node client of `cujojs/rest`.

## Install

```
npm install rest-node-https-proxy-interceptor
```

## Proxy

to use this you need to have a proxy running, for example `squid`. Change the `url` accordingly!

An online list of free SSL/HTTPS proxies can be found [here](https://www.sslproxies.org/)

## Usage

```javascript
var rest = require("rest/client/node")
var restHttpsProxy = require("rest-node-https-proxy-interceptor")

var client = rest.wrap(restHttpsProxy, {
    url: "http://127.0.0.1:3128" // you can also use tcp://127.0.0.1:3128
})

client('https://nodejs.org/en/').then(function(response) {
    // response will contain the html of https://nodejs.org/en/
    // and the HTTPS request/response will be proxied through http://127.0.0.1:3128
});
```

## How is it possible to proxy HTTPS?

You can proxy HTTPS requests through a proxy by using a so called `HTTP CONNECT Tunnel`. You can read more about it here:
- [Wikipedia HTTP Tunnel](https://en.wikipedia.org/wiki/HTTP_tunnel)
- [SQUID docs](http://wiki.squid-cache.org/Features/HTTPS)

## Test

```
npm test
```

## License

MIT
