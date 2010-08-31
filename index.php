<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>pxCube</title>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
        <script src="script.js"></script>
        <script>

			var context;
			
			$(document).ready(function() {

				context = document.getElementById('field').getContext("2d");

				function random_cube()
				{
					var width = Math.round(Math.random() * 80 + 1);
					var start_x = Math.round(Math.random() * 800 + 1);
					var start_y = Math.round(Math.random() * 800 + 1);

					var r = Math.round(Math.random() * 255);
					var g = Math.round(Math.random() * 255);
					var b = Math.round(Math.random() * 255);
					var a = Math.round(Math.random()* 100) / 100;

					cube = new Cube({
						start_x : start_x,
						start_y : start_y,
						size : width,
						fill_color : new Color(r, g, b, a)
					});

					cube.draw(context);
				}
				
				interval = setInterval(random_cube, 10);


				

			});

		</script>
    </head>
    <body>
        <canvas id="field" width="800px" height="800px"></canvas>

    </body>
</html>