# rest node https proxy interceptor

This is a plugin for the [cujojs/rest](https://github.com/cujojs/rest) module.
What this plugin does is add support for using an HTTPS proxy.

This plugin **ONLY** works with the node client of `cujojs/rest`.

## Install

```
npm install rest-node-https-proxy-interceptor
```

## Proxy

To use this you need to have a proxy running, for example `squid`.

An online list of free SSL/HTTPS proxies can be found [here](https://www.sslproxies.org/)

Set proxy address into `url`. If `url` is not provided, environment variable `HTTPS_PROXY` is used.

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

Use environment variable `HTTPS_PROXY`:

``` javascript
var client = rest.wrap(restHttpsProxy);
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
