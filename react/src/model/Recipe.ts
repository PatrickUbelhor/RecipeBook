
export class Recipe {

	public id: number;
	public ownerId: number;
	public description?: string;
	public name: string;
	public serveCount?: number;
	public prepTimeMins?: number;
	public totalTimeMins?: number;
	public ingredients: string[];
	public directions?: string;

}

export class NewRecipe {

	public description: string;
	public name: string;
	public serveCount: number;
	public prepTimeMins: number;
	public totalTimeMins: number;
	public ingredients: string[];
	public directions: string;

}
