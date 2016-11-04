require('babel-polyfill');
const fs = require('fs');
const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('<YOUR-GRAPHQL-ENDPOINT>')
});

const addQuery = `
  ($text: String!) { 
    createItem(text: $text) { 
      text
    } 
  } 
`;

const items = JSON.parse(fs.readFileSync('./import.json', 'utf8'));

async function importItems() { 
  for (const item of items) { 
    const result = await client.mutate(addQuery, { text : item.text }); 
    if (result.errors) { 
      console.error(result.errors); 
    } else { 
      console.log('Created an item:', result.createItem); 
    } 
  } 
} 
 
importItems().catch((e) => console.error(e));