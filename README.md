# zeit-routes

Zeit application bootstrap with url based route handlers.

The routes can support different paths, but ideally each Micro app would only support different methods and paths within a single micro service.

# Goals

Not be too fancy, support what is needed to create a simple decently featured micro service application that can be wrapped easily in Docker.

# Requirements

Requires:

- Node 7+

# Config

The routes are configured using a YML file in the root of the bootstrap `config.yml` which has the structure:

```
functions:
  foo:
    path: foo
    handlers:
      get:
        function: functions/foo

  bar:
    path: bar/:id(\d+)
    handlers:
      get:
        function: functions/bar/get
      post:
        function: functions/bar/post
```

Where the examples show two routes, `/foo` with only one `GET` handler function, and a `bar` route which requires the `id` query param in all cases and supports `GET` and `POST`.

The handler functions are stored in a folder `functions` (which can be named anything based on the YML config for function paths) and contains single files for each function handler.

# TODO:

Remaining tasks:

- add body parser for POST body
- add plugins for things like HTTP cache headers, cors or bake them in
- add tests
- ensure the handlers in `functions` support async
- possibly extract to a NPM package so one can require this code but still provide `functions` and `config.yml` files in their own projects
- add dockerfile to build a container to wrap the Micro service