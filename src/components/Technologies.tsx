import { useEffect, useRef } from 'react';
import classes from '../assets/css/Technologies.module.css';
import Matter from 'matter-js';

export default function Technologies() {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const icons = import.meta.glob("../assets/img/technologies/*.png", {
            eager: true,
            import: "default"
        }) as Record<string, string>;

        const {
            Engine,
            Render,
            Runner,
            Bodies,
            Composite,
            Mouse,
            MouseConstraint,
        } = Matter;

        const engine = Engine.create();
        const world = engine.world;
        const width = window.innerWidth-30;
        console.log("width", width);
        const height = 1300;

        const render = Render.create({
            element: sceneRef.current!,
            engine,
            options: {
                width: width,
                height: height,
                pixelRatio: window.devicePixelRatio || 1,
                wireframes: false,
                background: 'transparent',
            },
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        const options = {
            isStatic: true,
            render: {
                visible: false,
            }
        }

        const leftWall = Matter.Bodies.fromVertices(
            (width/2)-250, 500,
            [[
                { x: 0, y: 100 },
                { x: -500, y: -400 },
                { x: 0, y: 0 },
            ]],
            options,
            true
        );

        const rightWall = Matter.Bodies.fromVertices(
            (width/2)+250, 500,
            [[
                { x: 0, y: 100 },
                { x: 0, y: 0 },
                { x: 500, y: -400 },
            ]],
            options,
            true
        );

        const offset = 30;

        const glassLeftWall = Bodies.rectangle(width/2 - 160, height - offset, offset, 600, options);
        const glassRightWall = Bodies.rectangle(width/2 + 160, height - offset, offset, 600, options);

        Composite.add(world, [leftWall, rightWall, glassLeftWall, glassRightWall]);

        const walls = [
            // Bodies.rectangle(width / 2, 0, width, offset, options), // top wall
            Bodies.rectangle(width + offset/2, height / 2, offset, height, options), // right wall
            Bodies.rectangle(-offset/2, height / 2, offset, height, options), // left wall
            Bodies.rectangle(width / 2, height, width, offset, options), // bottom wall
        ];
        Composite.add(world, walls);

        const textures = Object.values(icons);

        textures.forEach((url) => {
            Composite.add(world,
                Bodies.circle(width/2 + Math.random() * 800 - 400, -200-Math.random()*500, 34, {
                    density: 0.0005,
                    frictionAir: 0.001,
                    restitution: 0.4,
                    friction: 0.01,
                    render: {
                        sprite: {
                            texture: url,
                            xScale: 0.5,
                            yScale: 0.5,
                        },
                    },
                })
            );
        });

        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false },
            },
        });
        // @ts-ignore
        mouse.element.removeEventListener('wheel', mouse.mousewheel);
        // @ts-ignore
        mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

        Composite.add(world, mouseConstraint);
        render.mouse = mouse;

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            Composite.clear(world, false);
            Engine.clear(engine);
            render.canvas.remove();
        };
    }, []);

    return (
        <div className={classes.container}>
            <div ref={sceneRef} />
        </div>
    );
}