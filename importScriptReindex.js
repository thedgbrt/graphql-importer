require('babel-polyfill');
const Reindex = require('reindex-js');
const fs = require('fs');

const reindex = new Reindex("<YOUR-REINDEX-ENDPOINT>");
reindex.setToken("<YOUR-REINDEX-TOKEN>")

const addQuery = `
  mutation ImportItem($text: String!) {
    createItem(input: { text: $text }) {
      changedItem {
        text
      }
    }
  }
`;

const items = JSON.parse(fs.readFileSync('./import.json', 'utf8'));

async function importItems() { 
  for (const item of items) { 
    const result = await reindex.query(addQuery, { text : item.text }); 
    if (result.errors) { 
      console.error(result.errors); 
    } else { 
      console.log('Created an item:', result.data.createItem.changedItem); 
    } 
  } 
} 
 
importItems().catch((e) => console.error(e));