import {Burger, Container, Drawer, Group} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../assets/css/Header.module.css';
import Logo from "./Logo";
import github from '../assets/img/github.svg';
import linkedin from '../assets/img/linkedin.svg';

export const links = [
    { link: '#', label: 'About' },
    { link: '#', label: 'Projects' },
    { link: 'https://github.com/theodore-garcher', label: 'Github', icon: github },
    { link: 'https://www.linkedin.com/in/theodore-garcher/', label: 'LinkedIn', icon: linkedin }
];

export default function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

    const items = links.map((link) => {
        return (
            <a
                key={link.label}
                href={link.link}
                className={classes.link}
            >
                {
                    link.icon && (
                        <img
                            src={link.icon}
                            alt={`${link.label} link`}
                            className={classes.linkIcon}
                        />
                    )
                }
                    {link.label}
            </a>
        );
    });

    return (
        <>
            <header className={classes.header}>
                <Container size="md">
                    <div className={classes.inner}>
                        <Logo compact={false} />
                        <Group gap={5} visibleFrom="sm">
                            {items}
                        </Group>
                        <Burger opened={drawerOpened} onClick={toggleDrawer} size="sm" hiddenFrom="sm" />
                    </div>
                </Container>
            </header>
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                hiddenFrom="sm"
                zIndex={1000000}
                title={<Logo compact={true} />}
            >
                <div className={classes.drawerContent}>
                    {items}
                </div>
            </Drawer>
        </>
    );
}