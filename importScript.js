require('babel-polyfill');
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
  transport: new Transport('YOUR-GRAPHQL-ENDPOINT')
});

var todos = JSON.parse(fs.readFileSync('./import.json', 'utf8'));

const addQuery = `
  ($name: String) { 
    createTodo(name: $name) { 
      name
    } 
  } 
`;

const deleteQuery = `
  ($id: ID!) { 
    deleteTodo(id: $id) { 
      name
    } 
  } 
`;

const listQuery = `
  {
    allTodoes {
      id
    }
  }
`;
 
async function importTodos() { 
  for (const todo of todos) { 
    const result = await client.mutate(addQuery, { name : todo.name }); 
    if (result.errors) { 
      console.error(result.errors); 
    } else { 
      console.log('Created a todo with name:', result.createTodo.name); 
    } 
  } 
} 
 
async function emptyTodos() {
  const listResult = await client.query(listQuery);
  if (listResult.errors) { 
    console.error(listResult.errors); 
  } else {  
    for (const todo of listResult.allTodoes) {
      const deleteResult = await client.mutate(deleteQuery, { id : todo.id });
      if (deleteResult.errors) { 
        console.error(deleteResult.errors); 
      } else { 
        console.log('Deleted a todo with name:', deleteResult.deleteTodo.name); 
      }
    }
  }
}

if (argv['empty'] === "true") {
  emptyTodos().catch((e) => console.error(e));
} else {
  importTodos().catch((e) => console.error(e));
}