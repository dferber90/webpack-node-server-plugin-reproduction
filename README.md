# `webpack-node-server-plugin` Reproduction

First, run `yarn` to install all dependencies.

Then run `yarn start` to start a webpack build in watch-mode which runs the server (`src/index.js`) after compliation.

Now visit `http://localhost:3000` to see that the server starts successfully.

Then make a file-change to `src/index.js`.

**Expectation** The node-server restarts.

**Observed behaviour** The updated server can not start as the old server is still blocking the port (the old server never quits).

## Error log

```
$ node -v
v10.1.0
$ yarn -v
1.12.1
$ yarn start
yarn run v1.12.1
(node:75383) ExperimentalWarning: The fs.promises API is experimental
$ webpack --watch

webpack is watching the files…

   3 modules
server is listening on 3000
   3 modules
events.js:167
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE :::3000
    at Server.setupListenHandle [as _listen2] (net.js:1330:14)
    at listenInCluster (net.js:1378:12)
    at Server.listen (net.js:1466:7)
    at eval (webpack:///./src/index.js?:12:8)
    at Object../src/index.js (/Users/nick/Sites/webpack-node-server-plugin-reproduction/dist/server.js:96:1)
    at __webpack_require__ (/Users/nick/Sites/webpack-node-server-plugin-reproduction/dist/server.js:20:30)
    at eval (webpack:///multi_./src/index.js?:1:18)
    at Object.0 (/Users/nick/Sites/webpack-node-server-plugin-reproduction/dist/server.js:107:1)
    at __webpack_require__ (/Users/nick/Sites/webpack-node-server-plugin-reproduction/dist/server.js:20:30)
    at /Users/nick/Sites/webpack-node-server-plugin-reproduction/dist/server.js:84:18
Emitted 'error' event at:
    at emitErrorNT (net.js:1357:8)
    at process._tickCallback (internal/process/next_tick.js:63:19)
    at Function.Module.runMain (internal/modules/cjs/loader.js:721:11)
    at startup (internal/bootstrap/node.js:228:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:576:3)
events.js:167
      throw er; // Unhandled 'error' event
      ^
```

Then the `Error: listen EADDRINUSE :::3000` repeates 3 times because the `retries` option of `webpack-node-server-plugin` defaults to 3.
