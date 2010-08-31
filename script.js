//Class for passing colors around, with helpful methods for colors
function Color(r, g, b, a)
{
	var color = {
		r : r,
		g : g,
		b : b,
		a : a
	};

	//Get an RGB string
	color.toString = function() {
		var color_string = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
		return color_string;
	};

	//Get a lighter/darker version of the color by a percentage
	color.getShade = function(percent) {
		var ratio = (100 + percent)/100;

		var r = Math.round(this.r * ratio);
		if (r > 255) {
			r = 255;
		}

		var g = Math.round(this.g * ratio);
		if (g > 255) {
			g = 255;
		}

		var b = Math.round(this.b * ratio);
		if (b > 255) {
			b = 255;
		}


		var lighter = new Color(r, g, b, this.a);

		return lighter;
	}
	
	color.getLighter = function(percent) {
		return this.getShade(percent);
	};

	color.getDarker = function(percent) {
		return this.getShade(-percent);
	};

	return color;
}

//Constructor function for Cube objects
function Cube(options)
{
	var cube = {};

	var settings = jQuery.extend({
		start_x :1,
		start_y : 1,
		size : 30,
		fill_color: new Color(0, 0, 255, 1)
	},
	options);

	//Get the coordinates of the vertices in the cube
	cube.getCoords = function()
	{
		var coords = [];

		//Find the vertical distance from the top left corner to the first point
		//using pythagoras theorem. The top left side is the hypotenuse.
		//All the ather vertices are calculated from this point.
		var vert = Math.sqrt(Math.pow(settings.size, 2) / 5);
		var hor = vert * 2;

		coords[0]   = {
			x : settings.start_x,
			y : settings.start_y + vert
		};

		coords[1] = {
			x : settings.start_x + hor,
			y : settings.start_y
		};

		coords[2] = {
			x : settings.start_x + hor * 2,
			y : settings.start_y + vert
		};

		coords[3] = {
			x : settings.start_x + hor,
			y : settings.start_y + vert * 2
		};

		coords[4] = {
			x : settings.start_x,
			y : settings.start_y + vert + settings.size
		};

		coords[5] = {
			x : settings.start_x + hor,
			y : settings.start_y + vert * 2 + settings.size
		};

		coords[6] = {
			x : settings.start_x + hor * 2,
			y : settings.start_y + vert + settings.size
		};

		coords[7] = {
			x : settings.start_x + hor,
			y : settings.start_y + settings.size
		};


		return coords;
	};

	//Draw the cube on the canvas passed in.
	//Draws and fills each side separately
	cube.draw = function(context) {
		var coords = this.getCoords();

//		//Bottom side, Should be hidden
//		context.beginPath();
//		context.moveTo(coords[4].x, coords[4].y);
//		context.lineTo(coords[7].x, coords[7].y);
//		context.lineTo(coords[6].x, coords[6].y);
//		context.lineTo(coords[5].x, coords[5].y);
//		context.lineTo(coords[4].x, coords[4].y);
//		context.stroke();
//		context.closePath();
//
//		//back left, Should be hidden
//		context.beginPath();
//		context.moveTo(coords[0].x, coords[0].y);
//		context.lineTo(coords[1].x, coords[1].y);
//		context.lineTo(coords[7].x, coords[7].y);
//		context.lineTo(coords[4].x, coords[4].y);
//		context.lineTo(coords[0].x, coords[0].y);
//		context.stroke();
//		context.closePath();
//
//		//back right, Should be hidden
//		context.beginPath();
//		context.moveTo(coords[1].x, coords[1].y);
//		context.lineTo(coords[2].x, coords[2].y);
//		context.lineTo(coords[6].x, coords[6].y);
//		context.lineTo(coords[7].x, coords[7].y);
//		context.lineTo(coords[1].x, coords[1].y);
//		context.stroke();
//		context.closePath();

		//Top side
		context.fillStyle = settings.fill_color.getLighter(20).toString();
		context.beginPath();
		context.moveTo(coords[0].x, coords[0].y);
		context.lineTo(coords[1].x, coords[1].y);
		context.lineTo(coords[2].x, coords[2].y);
		context.lineTo(coords[3].x, coords[3].y);
		context.lineTo(coords[0].x, coords[0].y);		
		//context.stroke();
		context.closePath();
		context.fill();

		//Front Left side
		context.fillStyle = settings.fill_color.toString();
		context.beginPath();
		context.moveTo(coords[0].x, coords[0].y);
		context.lineTo(coords[4].x, coords[4].y);
		context.lineTo(coords[5].x, coords[5].y);
		context.lineTo(coords[3].x, coords[3].y);
		context.lineTo(coords[0].x, coords[0].y);
		//context.stroke();
		context.closePath();
		context.fill();

		//Front Right
		context.fillStyle = settings.fill_color.getDarker(20).toString();
		context.beginPath();
		context.moveTo(coords[3].x, coords[3].y);
		context.lineTo(coords[2].x, coords[2].y);
		context.lineTo(coords[6].x, coords[6].y);
		context.lineTo(coords[5].x, coords[5].y);
		context.lineTo(coords[3].x, coords[3].y);
		//context.stroke();
		context.closePath();
		context.fill();


		
		
	};

	return cube;
}

