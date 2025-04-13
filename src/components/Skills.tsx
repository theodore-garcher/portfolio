import { Container } from '@mantine/core';
import classes from '../assets/css/Skills.module.css';

export default function Skills() {
    return (
        <div className={classes.wrapper}>
            <Container size={700}>
                <div className={classes.inner}>
                        <h2 className={classes.title}>
                            Some of the <span className={classes.highlight}>technologies & tools</span> I’ve used to make things:
                        </h2>
                </div>
            </Container>
        </div>
    );
}