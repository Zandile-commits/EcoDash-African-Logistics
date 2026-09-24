export class DeliveryVehicle {

    constructor(canvas) {

        this.canvas = canvas;

        this.width = 42;

        this.height = 62;

        this.reset();

    }


    reset() {

        this.x = this.canvas.width / 2;

        this.y = this.canvas.height * 0.72;

        this.velocityX = 0;

        this.velocityY = 0;

        this.acceleration = 0.32;

        this.maxSpeed = 5.2;

        this.drag = 0.90;

        this.angle = 0;

        this.battery = 100;

        this.distance = 0;

        this.energyUsed = 0;

        this.flashTimer = 0;

    }

    // Calculate the magnitude of the velocity vector.
// Speed = √(Vx² + Vy²)
getSpeed() {

    return Math.sqrt(
        this.velocityX ** 2 +
        this.velocityY ** 2
    );

}


// Calculate the direction of the velocity vector.
// atan2 is used to determine the angle of movement.
getDirection() {

    return Math.atan2(
        this.velocityY,
        this.velocityX
    );

}


    update(keys, weather, terrainModifier = 1) { 

        let inputX = 0;
let inputY = 0;

// Horizontal movement
if (keys.left || keys.a) {
    inputX -= 1;
}

if (keys.right || keys.d) {
    inputX += 1;
}

// Vertical movement
if (keys.up || keys.w) {
    inputY -= 1;
}

if (keys.down || keys.s) {
    inputY += 1;
}

// Normalise diagonal movement so it does not become faster
const inputMagnitude =
    Math.sqrt(
        inputX ** 2 +
        inputY ** 2
    );

if (inputMagnitude > 0) {

    inputX /= inputMagnitude;
    inputY /= inputMagnitude;

}

// Convert the movement direction into acceleration
let accelerationX =
    inputX * this.acceleration;

let accelerationY =
    inputY * this.acceleration;


        /*
            WIND VECTOR

            Wind affects horizontal movement.
        */

        accelerationX += weather.wind.x * 0.008;

        accelerationY += weather.wind.y * 0.008;


        /*
            VELOCITY

            Acceleration changes velocity.
        */

        this.velocityX += accelerationX;

        this.velocityY += accelerationY;


        /*
            DRAG

            Reduces velocity gradually.
        */

        this.velocityX *= this.drag;

        this.velocityY *= this.drag;


        /*
            TERRAIN SPEED LIMIT
        */

        const speedLimit =
    this.maxSpeed * terrainModifier;


let currentSpeed = this.getSpeed();


if (currentSpeed > speedLimit) {

    const scale =
        speedLimit / currentSpeed;

    this.velocityX *= scale;

    this.velocityY *= scale;

}

// Recalculate speed after applying the terrain limit.
currentSpeed = this.getSpeed();

        /*
            POSITION

            Velocity determines movement.
        */

        this.x += this.velocityX;

        this.y += this.velocityY;


        /*
            TRIGONOMETRY

            atan2 calculates the direction
            the vehicle is travelling.
        */

        if (currentSpeed > 0.1) {

    this.angle =
        this.getDirection();

}


        /*
            DISTANCE
        */

        if (currentSpeed > 0.1) {

            this.distance += currentSpeed * 0.0008;

        }


        /*
            BATTERY CONSUMPTION
        */

        const energyConsumption =
            currentSpeed *
            0.006 *
            weather.energyModifier;

        this.battery -= energyConsumption;

        this.energyUsed += energyConsumption;


        this.flashTimer =
            Math.max(
                0,
                this.flashTimer - 1
            );

    }


    keepInside() {

        const margin = 20;


        if (this.x < margin) {

            this.x = margin;

            this.velocityX *= -0.35;

        }


        if (this.x >
            this.canvas.width - margin) {

            this.x =
                this.canvas.width - margin;

            this.velocityX *= -0.35;

        }


        if (this.y < margin) {

            this.y = margin;

            this.velocityY *= -0.35;

        }


        if (this.y >
            this.canvas.height - margin) {

            this.y =
                this.canvas.height - margin;

            this.velocityY *= -0.35;

        }

    }


    draw(context) {
         /*
        COLLISION VISUAL FEEDBACK

        The vehicle flashes and displays
        a white ring when a collision occurs.
    */

    const collisionFlash =
        this.flashTimer > 0;


    context.save();


    context.translate(
        this.x,
        this.y
    );


    context.rotate(
        this.angle + Math.PI / 2
    );


    /*
        VEHICLE FLASH

        The vehicle becomes transparent
        for a short period after a collision.
    */

    if (
        this.flashTimer > 0 &&
        Math.floor(
            this.flashTimer / 5
        ) % 2 === 0
    ) {

        context.globalAlpha = 0.45;

    }


    /*
        VEHICLE SHADOW
    */

    context.fillStyle =
        "rgba(0,0,0,.3)";

    context.beginPath();

    context.ellipse(
        0,
        10,
        25,
        35,
        0,
        0,
        Math.PI * 2
    );

    context.fill();


    /*
        VEHICLE BODY
    */

    context.fillStyle =
        "#17251d";

    context.beginPath();

    context.roundRect(
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height,
        12
    );

    context.fill();


    /*
        GREEN SOLAR ROOF
    */

    context.fillStyle =
        "#b7f34a";

    context.beginPath();

    context.roundRect(
        -15,
        -27,
        30,
        19,
        7
    );

    context.fill();


    /*
        WINDOW
    */

    context.fillStyle =
        "#d9f4df";

    context.beginPath();

    context.roundRect(
        -11,
        -23,
        22,
        10,
        4
    );

    context.fill();


    /*
        LIGHTS
    */

    context.fillStyle =
        "#ff9f1c";

    context.fillRect(
        -13,
        21,
        9,
        4
    );

    context.fillRect(
        4,
        21,
        9,
        4
    );


    /*
        WHEELS
    */

    context.fillStyle =
        "#090f0b";

    context.fillRect(
        -23,
        -17,
        5,
        13
    );

    context.fillRect(
        18,
        -17,
        5,
        13
    );

    context.fillRect(
        -23,
        8,
        5,
        13
    );

    context.fillRect(
        18,
        8,
        5,
        13
    );


    /*
        COLLISION RING

        A visible ring is drawn around
        the vehicle when a collision occurs.
    */

    if (collisionFlash) {

        context.globalAlpha = 1;

        context.strokeStyle =
            "#ffffff";

        context.lineWidth = 4;

        context.beginPath();

        context.arc(
            0,
            0,
            38,
            0,
            Math.PI * 2
        );

        context.stroke();

    }


    context.restore();

}



    getBounds() {

        const collisionFlash =
    this.flashTimer > 0;

        context.save();


        context.translate(
            this.x,
            this.y
        );


        context.rotate(
            this.angle + Math.PI / 2
        );


        if (
            this.flashTimer > 0 &&
            Math.floor(
                this.flashTimer / 5
            ) % 2 === 0
        ) 
        {

            context.globalAlpha = 0.45;

        }


        /*
            VEHICLE SHADOW
        */

        context.fillStyle =
            "rgba(0,0,0,.3)";

        context.beginPath();

        context.ellipse(
            0,
            10,
            25,
            35,
            0,
            0,
            Math.PI * 2
        );

        context.fill();


        /*
            VEHICLE BODY
        */

        context.fillStyle =
            "#17251d";

        context.beginPath();

        context.roundRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height,
            12
        );

        context.fill();


        /*
            GREEN SOLAR ROOF
        */

        context.fillStyle =
            "#b7f34a";

        context.beginPath();

        context.roundRect(
            -15,
            -27,
            30,
            19,
            7
        );

        context.fill();


        /*
            WINDOW
        */

        context.fillStyle =
            "#d9f4df";

        context.beginPath();

        context.roundRect(
            -11,
            -23,
            22,
            10,
            4
        );

        context.fill();


        /*
            LIGHTS
        */

        context.fillStyle =
            "#ff9f1c";

        context.fillRect(
            -13,
            21,
            9,
            4
        );

        context.fillRect(
            4,
            21,
            9,
            4
        );


        /*
            WHEELS
        */

        context.fillStyle =
            "#090f0b";

        context.fillRect(
            -23,
            -17,
            5,
            13
        );

        context.fillRect(
            18,
            -17,
            5,
            13
        );

        context.fillRect(
            -23,
            8,
            5,
            13
        );

        context.fillRect(
            18,
            8,
            5,
            13
        );


        context.restore();

    

        return {

            left:
                this.x -
                this.width / 2,

            right:
                this.x +
                this.width / 2,

            top:
                this.y -
                this.height / 2,

            bottom:
                this.y +
                this.height / 2

        };

    }

}