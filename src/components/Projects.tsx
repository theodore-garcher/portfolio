import { Container, Text } from '@mantine/core';
import classes from '../assets/css/Projects.module.css';

export default function Projects() {
    return (
        <div className={classes.wrapper}>
            <Container size={700} className={classes.inner}>
                <h1 className={classes.title}>
                    Hey 👋 I'm{' '}
                    <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
                        Theodore
                    </Text>
                    {','} <br/>
                    I solve problems with code.
                </h1>

                <Text className={classes.description} color="dimmed">
                    Any kind of problem really — backend, frontend, infrastructures, networking, security, automation. I just like to build and tinker.
                </Text>
            </Container>
        </div>
    );
}