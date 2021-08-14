const express = require('express');
const cors = require('cors');
const mockRecipes = require('./mock-records.json');
const mockUsers = require('./mock-users.json');
const app = express();
const PORT_NUM = 8080;

let recipes;
let users;

const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/login', (request, response) => {
	console.log('Received login request');

	const email = request.header('email');
	const password = request.header('password');
	const user = users.find((user) => user.email === email && user.password === password);

	const returnedUser = {...user};
	delete returnedUser.password;

	response.append('token', `token${user.id}`);
	response.json(returnedUser);
});

app.get('/logout', (request, response) => {
	console.log('Received logout request');
	response.send();
})

app.post('/user', (request, response) => {
	console.log('Received createUser request');
	console.log(request.body);

	const id = users.length;
	const newUser = request.body;
	newUser.id = id;
	users.push(newUser);

	const returnedUser = {...newUser}
	delete returnedUser.password;

	response.append('token', `token${returnedUser.id}`);
	response.json(returnedUser);
});

app.get('/recipe', (request, response) => {
	console.log('Received getAllRecipes request');
	response.json(recipes);
});

app.post('/recipe', (request, response) => {
	console.log('Received createRecipe request');
	const id = Math.floor(Math.random() * 1000000000);
	console.log(request.body);
	const recipe = request.body;
	recipe.id = id;
	recipes.push(recipe);
	response.json(recipe);
});

app.delete('/recipe/:recipeId', (request, response) => {
	console.log('Received deleteRecipe request', request.params);
	recipes = recipes.filter(recipe => recipe.id !== parseInt(request.params['recipeId']));
	response.send();
});

app.listen(PORT_NUM, () => {
	console.log(`Server running on port ${PORT_NUM}`);
	recipes = JSON.parse(JSON.stringify(mockRecipes));
	users = JSON.parse(JSON.stringify(mockUsers));
});
