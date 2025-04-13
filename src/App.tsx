import '@mantine/core/styles.css';
import './App.css'

import { MantineProvider } from '@mantine/core';
import Hero from "./components/Hero";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Technologies from "./components/Technologies.tsx";
import Skills from "./components/Skills.tsx";
import Projects from "./components/Projects.tsx";

export default function App() {
    return (
        <MantineProvider>
            <Header/>
            <div style={{ position: "relative" }}>
                <Hero />
                <Technologies />
            </div>
            <Skills />
            <Projects />
            <Footer/>
        </MantineProvider>
    );
}
