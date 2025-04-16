import { Container } from '@mantine/core';
import classes from '../assets/css/Projects.module.css';
import ProjectCard from "./ProjectCard.tsx";
import {logoparser} from "../assets/projects/logoparser.tsx";

export default function Projects() {
    return (
        <div className={classes.wrapper}>
            <Container size={800}>
                <div className={classes.inner}>
                    <h2 className={classes.title}>
                        A few <span className={classes.highlight}>projects</span> I’ve worked on
                    </h2>
                </div>
                <div className={classes.projects}>
                    <ProjectCard project={logoparser}/>
                    <ProjectCard project={logoparser}/>
                    <ProjectCard project={logoparser}/>
                </div>
            </Container>
        </div>
    );
}