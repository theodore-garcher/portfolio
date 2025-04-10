import '@mantine/core/styles.css';
import './App.css'

import { MantineProvider } from '@mantine/core';
import Hero from "./components/Hero";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Technologies from "./components/Technologies.tsx";

export default function App() {
    return (
        <MantineProvider>
            <Header/>
            <div style={{ position: "relative" }}>
                <Hero />
                <Technologies />
            </div>
            <Hero />
            <Hero />
            <Hero />
            <Footer/>
        </MantineProvider>
    );
}
