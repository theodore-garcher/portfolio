import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

export default function TetrisMetaBlob() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const [bodies, setBodies] = useState<Matter.Body[]>([]);

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
                background: "#ffffff",
            },
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        const unit = 20;
        const constraintParams = {
            stiffness: 0.4,
            damping: 0.05,
            render: { visible: false },
        };

        const create2x2Block = (x: number, y: number): Matter.Body[] => {
            const group: Matter.Body[] = [];
            for (let row = 0; row < 2; row++) {
                for (let col = 0; col < 2; col++) {
                    const square = Bodies.rectangle(
                        x + col * unit,
                        y + row * unit,
                        unit,
                        unit,
                        {
                            render: { visible: false }, // hide physics body
                        }
                    );
                    group.push(square);
                }
            }

            // connect them
            const constraints: Matter.Constraint[] = [];
            for (let i = 0; i < group.length; i++) {
                for (let j = i + 1; j < group.length; j++) {
                    const dx = Math.abs(group[i].position.x - group[j].position.x);
                    const dy = Math.abs(group[i].position.y - group[j].position.y);
                    if ((dx <= unit && dy === 0) || (dy <= unit && dx === 0)) {
                        constraints.push(
                            Constraint.create({
                                bodyA: group[i],
                                bodyB: group[j],
                                ...constraintParams,
                            })
                        );
                    }
                }
            }

            World.add(world, [...group, ...constraints]);
            return group;
        };

        const centerX = 400;
        const centerY = 200;
        const topLeft = create2x2Block(centerX - unit * 2, centerY);
        const topMid = create2x2Block(centerX, centerY);
        const topRight = create2x2Block(centerX + unit * 2, centerY);
        const bottomMid = create2x2Block(centerX, centerY + unit * 2);

        const all = [...topLeft, ...topMid, ...topRight, ...bottomMid];
        setBodies(all);

        const crossLinks = [
            [topLeft[1], topMid[0]],
            [topMid[1], topRight[0]],
            [topMid[2], bottomMid[0]],
            [topMid[3], bottomMid[1]],
        ].map(([a, b]) =>
            Constraint.create({
                bodyA: a,
                bodyB: b,
                ...constraintParams,
            })
        );

        World.add(world, crossLinks);

        World.add(world, [
            Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
            Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
            Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
            Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        ]);

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

        const updateOverlay = () => {
            if (!overlayRef.current || !bodies.length) return;

            const bounds = bodies.reduce(
                (acc, b) => Matter.Bounds.create([acc, b.bounds]),
                bodies[0].bounds
            );

            overlayRef.current.style.left = `${bounds.min.x}px`;
            overlayRef.current.style.top = `${bounds.min.y}px`;
            overlayRef.current.style.width = `${bounds.max.x - bounds.min.x}px`;
            overlayRef.current.style.height = `${bounds.max.y - bounds.min.y}px`;

            requestAnimationFrame(updateOverlay);
        };

        updateOverlay();

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            World.clear(world, false);
            Engine.clear(engine);
            render.canvas.remove();
        };
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <div ref={sceneRef} />
            <div
                ref={overlayRef}
                style={{
                    position: "absolute",
                    backgroundColor: "#5567dd",
                    borderRadius: "20px",
                    opacity: 0.9,
                    zIndex: 2,
                    pointerEvents: "none",
                    transition: "all 0.1s ease",
                }}
            />
        </div>
    );
}