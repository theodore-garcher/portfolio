import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function TetrisSoftBody() {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const {
            Engine,
            Render,
            Runner,
            World,
            Bodies,
            Constraint,
            Mouse,
            MouseConstraint,
        } = Matter;

        const engine = Engine.create();
        const world = engine.world;

        const render = Render.create({
            element: sceneRef.current!,
            engine,
            options: {
                width: 800,
                height: 600,
                wireframes: false,
                background: "#f0f0f0",
            },
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        const unit = 20; // square size
        const blockSize = 2; // 2x2 mini-squares per Tetris block
        const gap = 0;

        const constraintParams = {
            stiffness: 0.2,
            damping: 0.05,
            render: { visible: false },
        };

        const create2x2Block = (x: number, y: number): Matter.Body[] => {
            const bodies: Matter.Body[] = [];

            for (let row = 0; row < blockSize; row++) {
                for (let col = 0; col < blockSize; col++) {
                    const square = Bodies.rectangle(
                        x + col * (unit + gap),
                        y + row * (unit + gap),
                        unit,
                        unit,
                        {
                            restitution: 0.6,
                            friction: 0.1,
                            frictionAir: 0.01,
                            render: { fillStyle: "#5567dd" },
                        }
                    );
                    bodies.push(square);
                }
            }

            const constraints: Matter.Constraint[] = [];

            // connect horizontally and vertically adjacent squares
            for (let i = 0; i < bodies.length; i++) {
                for (let j = i + 1; j < bodies.length; j++) {
                    const dx = Math.abs(bodies[i].position.x - bodies[j].position.x);
                    const dy = Math.abs(bodies[i].position.y - bodies[j].position.y);

                    const closeX = dx <= unit + gap;
                    const closeY = dy <= unit + gap;

                    if ((closeX && dy === 0) || (closeY && dx === 0)) {
                        constraints.push(
                            Constraint.create({
                                bodyA: bodies[i],
                                bodyB: bodies[j],
                                ...constraintParams,
                            })
                        );
                    }
                }
            }

            World.add(world, [...bodies, ...constraints]);
            return bodies;
        };

        // --- Build Tetris T shape using 2x2 blocks ---
        const centerX = 400;
        const centerY = 200;

        const topLeft = create2x2Block(centerX - unit * 2, centerY);
        const topMid = create2x2Block(centerX, centerY);
        const topRight = create2x2Block(centerX + unit * 2, centerY);
        const bottomMid = create2x2Block(centerX, centerY + unit * 2);

        const crossConstraints = [
            Constraint.create({
                bodyA: topLeft[1],
                bodyB: topMid[0],
                ...constraintParams,
            }),
            Constraint.create({
                bodyA: topMid[1],
                bodyB: topRight[0],
                ...constraintParams,
            }),
            Constraint.create({
                bodyA: topMid[2],
                bodyB: bottomMid[0],
                ...constraintParams,
            }),
            Constraint.create({
                bodyA: topMid[3],
                bodyB: bottomMid[1],
                ...constraintParams,
            }),
        ];

        World.add(world, crossConstraints);

        // Static walls
        World.add(world, [
            Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
            Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
            Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
            Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        ]);

        // Mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.9,
                render: { visible: false },
            },
        });
        World.add(world, mouseConstraint);
        render.mouse = mouse;

        // Clean up on unmount
        return () => {
            Render.stop(render);
            Runner.stop(runner);
            World.clear(world, false);
            Engine.clear(engine);
            render.canvas.remove();
        };
    }, []);

    return <div ref={sceneRef} />;
}