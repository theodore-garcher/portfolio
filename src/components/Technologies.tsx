import { useEffect, useRef } from 'react';
import classes from '../assets/css/Technologies.module.css';
import Matter from 'matter-js';
import ballImg from '../assets/img/python.png';

export default function Technologies() {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const {
            Engine,
            Render,
            Runner,
            Bodies,
            Composite,
            Mouse,
            MouseConstraint,
            Composites,
        } = Matter;

        const engine = Engine.create();
        const world = engine.world;
        const width = window.innerWidth;
        const height = window.innerHeight*2;

        const render = Render.create({
            element: sceneRef.current!,
            engine,
            options: {
                width: width-30,
                height: height-60,
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

        const offset = 50;
        const walls = [
            Bodies.rectangle(width / 2, 0, width, offset, options), // top wall
            Bodies.rectangle(width / 2, (height - offset)/2, width, 50, options), // mid wall
            Bodies.rectangle(width - offset/2, height / 2, 50, height, options), // right wall
            Bodies.rectangle(0, height / 2, 50, height, options), // left wall
            Bodies.rectangle(width / 2, height - offset, width, 50, options), // bottom wall
            Bodies.rectangle(width / 2, height - offset/2, width, 50, options), // glass left wall
            Bodies.rectangle(width / 2, height - offset, width, 50, options), // glass right wall
        ];
        Composite.add(world, walls);

        const stack = Composites.stack(20, 20, 10, 4, 0, 0, (x: number, y: number) => {
            return Bodies.circle(x, y, 32, {
                density: 0.0005,
                frictionAir: 0.001,
                restitution: 0.8,
                friction: 0.01,
                render: {
                    sprite: {
                        texture: ballImg,
                        xScale: 0.5,
                        yScale: 0.5,
                    },
                },
            });
        });

        Composite.add(world, stack);

        // Add mouse control
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