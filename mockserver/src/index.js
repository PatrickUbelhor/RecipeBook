const express = require('express');
const cors = require('cors');
const mockRecipes = require('./mock-records.json');
const app = express();
const PORT_NUM = 8080;

let data;

const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/recipe', (request, response) => {
	console.log('Received getAllRecipes request');
	response.json(data);
});

app.post('/recipe', (request, response) => {
	console.log('Received createRecipe request');
	const id = Math.floor(Math.random() * 1000000000);
	console.log(request.body);
	const recipe = request.body;
	recipe.id = id;
	data.push(recipe);
	response.json(recipe);
});

app.delete('/recipe/:recipeId', (request, response) => {
	console.log('Received deleteRecipe request', request.params);
	data = data.filter(recipe => recipe.id !== parseInt(request.params['recipeId']));
	response.send();
});

app.listen(PORT_NUM, () => {
	console.log(`Server running on port ${PORT_NUM}`);
	data = JSON.parse(JSON.stringify(mockRecipes));
	console.log('mock data:');
	console.log(data);
});
