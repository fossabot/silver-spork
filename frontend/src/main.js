import * as Matter from 'matter-js';

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;

// create engine
var engine = Engine.create({
            enableSleeping: true
        }),
    world = engine.world;

engine.world.gravity.y = 0;


// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        // width: 800,
        // height: 600,
        showAngleIndicator: true
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
// var stack = Composites.stack(20, 20, 20, 5, 0, 0, function(x, y) {
//     return Bodies.circle(x, y, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 });
// });
//
// World.add(world, stack);

// var bodies = [
//     Bodies.rectangle(0, 0, 20, 20, { force: Matter.Vector.create(.04, .05), density: 0.02 }),
//     Bodies.rectangle(800, 600, 20, 20, { force: Matter.Vector.create(-.06, -.06), density: 0.02 }),
//     // Bodies.rectangle(500, 350, 700, 20, { isStatic: true, angle: -Math.PI * 0.06 }),
//     // Bodies.rectangle(340, 580, 700, 20, { isStatic: true, angle: Math.PI * 0.04 })
// ];

var NUMBER_OF_BODIES = 100;

var bodies = Array(NUMBER_OF_BODIES).fill().map(() => {
  var size = Common.random(10, 20);
  return Bodies.rectangle(Common.random(0, 800), Common.random(0, 600), size, size, {
    force: {x: (Math.random() - 0.5) / 500, y: (Math.random() - 0.5) / 500 },
  } );
});

World.add(world, bodies);

// Events.on(bodies[0], "sleepStart", function(event) {
//   var pos = bodies[0].position;
//   Matter.Sleeping.set(bodies[0], false);
//   Body.applyForce( bodies[0], {x: pos.x, y: pos.y}, {x: .1, y: .1} );
// });

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, Composite.allBodies(world));