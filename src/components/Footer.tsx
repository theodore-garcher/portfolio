import { Anchor, Container, Group } from '@mantine/core';
import classes from '../assets/css/Footer.module.css';
import Logo from "./Logo.tsx";
import {links} from "./Header.tsx";

export default function Footer() {
    const items = links.map((link) => (
        <Anchor<'a'>
            c="dimmed"
            key={link.label}
            href={link.link}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Logo compact={true} />
                <Group className={classes.links}>
                    {items}
                </Group>
            </Container>
        </div>
    );
}