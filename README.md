# GraphQL Importer
Import JSON data via a GraphQL endpoint.
[Read the tutorial](https://masterreactnative.com/importing-data-via-a-graphql-endpoint-6b9f2feccc2c).

## Setup
```
$ git clone https://github.com/thedgbrt/graphql-importer.git
$ cd graphql-importer
$ npm install
```

## Usage
- add desired data in import.json
- define your GraphQL mutations in importScript.js
- replace `<YOUR-GRAPHQL-ENDPOINT>` in importScript.js
- run `npm run import`.

## Usage with Reindex
Change mutations in importScriptReindex.js, run with `npm run import-reindex`. 
