# EcoDash - African Logistics Simulator

## Project Description

EcoDash is a browser-based African logistics simulation developed using HTML5, CSS3 and JavaScript. The simulation represents the challenges involved in transporting essential supplies through difficult African environments.

The player controls a delivery vehicle and must navigate obstacles, manage battery consumption, respond to changing weather conditions and reach delivery points efficiently.

The project uses HTML5 Canvas to create the simulation and JavaScript to implement movement, collision detection, weather effects, scoring and game functionality.

## Project Objectives

The main objectives of EcoDash are to:

* Simulate African logistics and infrastructure challenges.
* Demonstrate movement using vectors and velocity.
* Apply mathematical and physics concepts to a game environment.
* Implement collision detection.
* Simulate environmental conditions such as wind, rain and dust.
* Demonstrate battery consumption during vehicle movement.
* Create an interactive browser-based simulation.

## Technologies Used

* HTML5
* CSS3
* JavaScript ES6 Modules
* HTML5 Canvas
* Git
* GitHub
* LocalStorage

## Installation and Setup

1. Download or clone the repository.
2. Open the project folder in Visual Studio Code.
3. Open the `index.html` file.
4. Run the project using a local development server such as the VS Code Live Server extension.
5. Open the provided local address in a web browser.
6. Click **Start Mission** to begin the EcoDash simulation.

## Project Structure

```text
EcoDash-African-Logistics/
│
├── index.html
├── style.css
├── main.js
├── game.js
├── player.js
├── obstacles.js
├── collision.js
├── weather.js
├── particles.js
├── storage.js
├── README.md
│
└── docs/
    └── african-problem-investigation.md
```

## Main Features

The simulation includes:

* Player-controlled delivery vehicle
* Keyboard movement
* Vehicle acceleration and velocity
* Wind effects
* Terrain speed modifiers
* Battery consumption
* Distance tracking
* Weather changes
* Obstacles
* Collision detection
* Delivery progress
* Score calculation
* High-score storage
* Canvas-based game rendering

## AI Usage Disclosure

| AI Tool | Purpose                  | How It Was Used                                                                                 | Student Contribution                                          |
| ------- | ------------------------ | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| ChatGPT | Development assistance   | Used to explain programming concepts, debug selected code and suggest implementation approaches | The student reviewed, adapted, tested and integrated the code |
| ChatGPT | Documentation assistance | Used to help structure project documentation and explain mathematical concepts                  | The student selected, edited and verified the final content   |

AI-generated suggestions were reviewed and adapted before being included in the final project.

## Development Progress

### Day 1 - Project Setup

The initial EcoDash project structure was organised and added to the GitHub repository. The README was created to document the project purpose, technologies, setup instructions, project modules and AI usage.

### Day 2 - Vehicle Movement and Acceleration

The vehicle movement system was improved to provide consistent movement in different directions. Directional keyboard input is converted into a movement vector and normalised before being converted into acceleration.

This prevents diagonal movement from receiving a larger input magnitude than horizontal or vertical movement.

The vehicle continues to use velocity, acceleration and drag to create smoother movement. Wind effects are also applied to the vehicle's acceleration, allowing environmental conditions to influence the vehicle's movement.

The movement system uses vector mathematics to calculate the magnitude of the input direction.

### Day 3 - Vector Mathematics and Vehicle Physics

The vehicle physics system was improved by adding reusable vector calculations for speed and direction.

The magnitude of the velocity vector is calculated using the formula:

Speed = √(Vx² + Vy²)

where Vx represents horizontal velocity and Vy represents vertical velocity.

The direction of the vehicle is calculated using the JavaScript `Math.atan2()` function. This determines the angle of the velocity vector based on the horizontal and vertical components.

A terrain speed modifier is also applied to limit the vehicle's maximum speed in difficult terrain. The vehicle's speed is recalculated after the terrain limit is applied so that distance travelled and battery consumption use the updated movement speed.

These calculations connect the JavaScript implementation to the mathematical and physics concepts required by the EcoDash simulation.

### Day 4 - Environmental Obstacles and Collision Detection

The environmental obstacle and collision system was improved and documented.

EcoDash uses two collision detection methods. Axis-Aligned Bounding Box (AABB) collision is used for rectangular obstacles such as potholes and construction zones. Circular collision detection is used for environmental objects such as wildlife, trees, rivers and load-shedding zones.

The circular collision calculation uses the distance formula:

d = √((x₂ - x₁)² + (y₂ - y₁)²)

When a collision is detected, the obstacle is marked as hit and the appropriate effect is applied to the vehicle. These effects can include reduced velocity, battery loss or a reduction in score.

Visual collision feedback was also added so that the player receives an immediate indication when the vehicle hits an obstacle.

### Day 5 - Weather and Environmental Effects

The weather system was improved to make environmental conditions more noticeable during gameplay.

Wind is represented as a vector containing horizontal and vertical components. The strength of the wind is calculated using the magnitude of the vector:

Wind Strength = √(Wx² + Wy²)

The weather system can influence the movement of the delivery vehicle by applying wind forces to its acceleration.

A visual wind-strength indicator was also added to help show the effect of environmental conditions during the simulation.

This connects the weather system to the physics concepts used in the EcoDash project and demonstrates how environmental conditions can affect logistics movement.

## Author

STADIO Higher Education Student

## Project Status

The project is being developed progressively using GitHub commits to document the development process.
