// SoftBodyDemo.tsx
import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function SoftBodyDemo() {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const {
            Engine,
            Render,
            Runner,
            Composites,
            MouseConstraint,
            Mouse,
            Composite,
            Bodies,
        } = Matter;

        const engine = Engine.create();
        const world = engine.world;

        const render = Render.create({
            element: sceneRef.current!,
            engine: engine,
            options: {
                width: 800,
                height: 600,
                pixelRatio: window.devicePixelRatio || 1,
                showAngleIndicator: false,
                wireframes: false,
                background: "#f8f9fa",
            },
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Soft body helper function
        const createSoftBody = (
            xx: number,
            yy: number,
            columns: number,
            rows: number,
            columnGap: number,
            rowGap: number,
            crossBrace: boolean,
            particleSize: number,
            particleOptions: Matter.IBodyDefinition,
            constraintOptions?: Matter.IConstraintDefinition
        ) => {
            const particles = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, (x: number, y: number) =>
                Bodies.rectangle(x, y, particleSize*2, particleSize*2, particleOptions)
            );

            Composites.mesh(particles, columns, rows, crossBrace, {
                stiffness: 0.2,
                render: { visible: false },
                ...constraintOptions,
            });

            particles.label = "Soft Body";
            return particles;
        };

        const particleOptions = {
            friction: 0.05,
            frictionStatic: 0.1,
            render: {
                visible: true,
                fillStyle: "#5567dd",
                strokeStyle: "#5567dd",
                lineWidth: 0,
            },
        };

        Composite.add(world, [
            createSoftBody(250, 100, 5, 5, 0, 0, true, 48, particleOptions),
            // createSoftBody(400, 300, 8, 3, 0, 0, true, 32, particleOptions),
            // createSoftBody(250, 400, 4, 4, 0, 0, true, 32, particleOptions),

            // walls
            Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
            Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
            Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
            Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
        ]);

        // Mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.9,
                render: { visible: false },
            },
        });

        Composite.add(world, mouseConstraint);
        render.mouse = mouse;

        // Cleanup on unmount
        return () => {
            Render.stop(render);
            Runner.stop(runner);
            Composite.clear(world, false);
            Engine.clear(engine);
            if (render.canvas) {
                render.canvas.remove();
            }
        };
    }, []);

    return (
        <div className="soft-body-wrapper" style={{ position: "relative" }}>
            {/* SVG filter definition */}
            <svg width="0" height="0">
                <filter id="fancy-goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 19 -9"
                        result="goo"
                    />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
            </svg>

            {/* Matter.js canvas target */}
            <div ref={sceneRef} style={{ filter: "url(#fancy-goo)" }} />
        </div>
    );
}