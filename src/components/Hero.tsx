import { Container, Text } from '@mantine/core';
import classes from '../assets/css/Hero.module.css';

export default function Hero() {
    return (
        <div className={classes.wrapper}>
            <Container size={700} className={classes.inner}>
                <h1 className={classes.title}>
                    Hey 👋 I'm{' '}
                    <Text component="span" variant="gradient" gradient={{ from: 'yellow', to: 'yellow' }} inherit>
                        Theodore
                    </Text>
                    {','} <br/>
                    I solve problems with code.
                </h1>

                <Text className={classes.description} color="dimmed">
                    Any kind of problem really — backend, frontend, networking, infrastructures, automation. I just like to build and tinker.
                </Text>
            </Container>
        </div>
    );
}