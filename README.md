# GraphQL Importer
Quickly import / delete json data via a GraphQL endpoint. Useful when playing with queries.

# Setup
- Run `npm install`
- Define your GraphQL mutations in importScript.js
- Replace `YOUR-GRAPHQL-ENDPOINT` in importScript.js
- add desired data in import.json

Then run `npm run import`.

To empty all imports (and all other entries matched by the mutation), run `npm run import -- --empty=true`.