// types/global.d.ts
export {};

declare global {
    interface Project {
        title: string;
        description: string;
        badges: string[];
        image: string;
        link: string;
        githubLink?: string;
    }
}