// MatterDemo.tsx
import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function MatterDemo() {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const Engine = Matter.Engine;
        const Render = Matter.Render;
        const Runner = Matter.Runner;
        const Bodies = Matter.Bodies;
        const Composite = Matter.Composite;

        const engine = Engine.create();

        const render = Render.create({
            element: sceneRef.current!,
            engine: engine,
            options: {
                width: 800,
                height: 600,
                wireframes: false,
                background: "#f0f0f0",
            },
        });

        const boxA = Bodies.rectangle(400, 200, 80, 80);
        const boxB = Bodies.rectangle(450, 50, 80, 80);
        const ground = Bodies.rectangle(400, 580, 810, 60, { isStatic: true });

        Composite.add(engine.world, [boxA, boxB, ground]);

        Render.run(render);

        const runner = Runner.create();
        Runner.run(runner, engine);

        // Cleanup on unmount
        return () => {
            Render.stop(render);
            Runner.stop(runner);
            Matter.World.clear(engine.world, false);
            Matter.Engine.clear(engine);
            if (render.canvas) {
                render.canvas.remove();
            }
        };
    }, []);

    return <div ref={sceneRef} />;
}