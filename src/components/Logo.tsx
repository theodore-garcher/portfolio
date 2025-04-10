import classes from '../assets/css/Logo.module.css';

export default function Logo({ compact }: { compact: boolean }) {
    const content = compact ? <span>g</span> : <><span>garcher</span>.dev</>

    return (
        <a href="/" className={classes.logo}>
            [{content}]
        </a>
    );
}