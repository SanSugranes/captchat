            ///Source to blur canvas: https://konvajs.org/docs/filters/Blur.html

            ///Constants for the random number generator
            const MIN = 6;
            const MAX = 9;

            ///Random int (int the range of MIN - MAX)  
            var rdm = Math.floor(Math.random() * (MAX - MIN + 1) + MIN),
                rdmYPosition = Math.floor(Math.random() * (5 - 0 + 1) + 0),
                yPositions = ['alphabetic', 'top', 'hanging', 'middle', 'ideographic', 'bottom'];


            ///Generates random string with letters and numbers
            function makeid(lenght) {
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;

                for (var i = 0; i < lenght; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }

                return result;
            }

            ///Random color generator (RGBA)
            ///Source: https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
            function random_rgba() {
                var o = Math.round,
                    r = Math.random,
                    s = 255,
                    red = o(r() * s),
                    blue = o(r() * s),
                    green = o(r() * s);



                if ((red + blue + green) / 3 > 95) {
                    return ['rgba(' + red + ',' + blue + ',' + green + ',' + r().toFixed(1) + ')', true, (red + blue + green) / 3];
                } else {
                    return ['rgba(' + red + ',' + blue + ',' + green + ',' + r().toFixed(1) + ')', false, (red + blue + green) / 3];
                }
            }

            var color = random_rgba();

            ///Canva manipulation
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");

            c.style.backgroundColor = color[0];


            ctx.textBaseline = yPositions[rdmYPosition];
            console.log(ctx.textAlign)
            if (color[1]) {
                ctx.font = "30px Comic Sans MS";
                ctx.fillText(makeid(rdm), 10, 50);
                c.style.border = "2px solid black";
            } else {
                ctx.font = "30px Comic Sans MS";
                c.style.border = "2px solid grey";
                ctx.fillStyle = "#ffffff";
                ctx.fillText(makeid(rdm), 10, 50);
            }
            ctx.stroke();
            ctx.f