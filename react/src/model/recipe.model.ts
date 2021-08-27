
export class Recipe {

	public id: number;
	public ownerId: number;
	public description?: string;
	public name: string;
	public serveCount?: number;
	public prepTimeMins?: number;
	public totalTimeMins?: number;
	public ingredients: string[];
	public directions?: string[];

}

export class NewRecipe {

	constructor() {
		this.name = '';
		this.description = '';
		this.serveCount = 4;
		this.prepTimeMins = 20;
		this.totalTimeMins = 60;
		this.ingredients = [];
		this.directions = [];
	}

	public name: string;
	public description: string;
	public serveCount: number;
	public prepTimeMins: number;
	public totalTimeMins: number;
	public ingredients: string[];
	public directions: string[];

}
