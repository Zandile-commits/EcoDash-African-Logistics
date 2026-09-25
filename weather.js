export class WeatherSystem {

    constructor() {

        this.state = "CLEAR";

        this.wind = {
            x: 0,
            y: 0
        };

        this.energyModifier = 1;

        this.timer = 0;

        this.particles = [];

    }


    update() {

        this.timer++;


        /*
            Change weather periodically.
        */

        if (
            this.timer % 900 === 0
        ) {

            this.changeWeather();

        }


        /*
            RAIN PARTICLES
        */

        if (
            this.state === "RAIN"
        ) {

            for (
                let i = 0;
                i < 4;
                i++
            ) {

                this.particles.push({

                    x:
                        Math.random() * 1200,

                    y:
                        -10,

                    vx:
                        this.wind.x,

                    vy:
                        8 +
                        Math.random() * 5,

                    life: 80

                });

            }

        }


        /*
            DUST PARTICLES
        */

        if (
            this.state === "DUST"
        ) {

            for (
                let i = 0;
                i < 2;
                i++
            ) {

                this.particles.push({

                    x:
                        Math.random() * 1200,

                    y:
                        Math.random() * 700,

                    vx:
                        1 +
                        Math.random(),

                    vy:
                        Math.random(),

                    life: 100

                });

            }

        }


        this.particles.forEach(
            particle => {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;

                particle.life--;

            }
        );


        this.particles =
            this.particles.filter(
                particle =>
                    particle.life > 0
            );

    }


    changeWeather() {

        const weatherOptions = [

            "CLEAR",
            "RAIN",
            "WIND",
            "DUST"

        ];


        this.state =
            weatherOptions[
                Math.floor(
                    Math.random() *
                    weatherOptions.length
                )
            ];


        if (
            this.state ===
            "CLEAR"
        ) {

            this.wind = {
                x: 0,
                y: 0
            };

            this.energyModifier = 1;

        }


        if (
            this.state ===
            "RAIN"
        ) {

            this.wind = {
                x: -0.6,
                y: 0
            };

            this.energyModifier =
                1.15;

        }


        if (
            this.state ===
            "WIND"
        ) {

            this.wind = {
                x: 1.7,
                y: 0
            };

            this.energyModifier =
                1.2;

        }


        if (
            this.state ===
            "DUST"
        ) {

            this.wind = {
                x: 1.1,
                y: 0
            };

            this.energyModifier =
                1.35;

        }

    }


    /*
        Calculate the strength of the
        current wind vector.

        Wind Strength = √(Wx² + Wy²)
    */

    getWindStrength() {

        return Math.sqrt(

            this.wind.x ** 2 +
            this.wind.y ** 2

        );

    }


    draw(
        context,
        width,
        height
    ) {

        if (
            this.state ===
            "RAIN"
        ) {

            context.strokeStyle =
                "rgba(190,220,255,.5)";

            context.lineWidth = 1.5;


            this.particles.forEach(
                particle => {

                    context.beginPath();

                    context.moveTo(
                        particle.x,
                        particle.y
                    );

                    context.lineTo(
                        particle.x - 4,
                        particle.y + 13
                    );

                    context.stroke();

                }
            );

        }


        if (
            this.state ===
            "DUST"
        ) {

            context.fillStyle =
                "rgba(197,156,86,.16)";

            context.fillRect(
                0,
                0,
                width,
                height
            );

        }


        if (
            this.state ===
            "WIND"
        ) {

            context.strokeStyle =
                "rgba(255,255,255,.25)";

            for (
                let y = 60;
                y < height;
                y += 70
            ) {

                context.beginPath();

                context.moveTo(
                    30,
                    y
                );

                context.lineTo(
                    120,
                    y
                );

                context.stroke();

            }

            const windStrength =
    this.getWindStrength();

context.fillStyle =
    "#5a4632";

context.font =
    "16px Arial";

context.fillText(
    `Wind: ${windStrength.toFixed(1)}`,
    20,
    30
);

        }


        /*
            Display the current wind strength.
        */

            // Calculate the strength of the current wind.
        getWindStrength() ;

    return Math.sqrt(
        this.wind.x ** 2 +
        this.wind.y ** 2
    );



        const windStrength =
            this.getWindStrength();

        context.fillStyle =
            "#5a4632";

        context.font =
            "16px Arial";

        context.fillText(
            `Wind: ${windStrength.toFixed(1)}`,
            20,
            30
        );
    }

    }


