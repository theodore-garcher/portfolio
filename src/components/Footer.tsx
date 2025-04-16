import classes from '../assets/css/Footer.module.css';
import Logo from "./Logo.tsx";

export default function Footer() {

    return (
        <div className={classes.footer}>
            <Logo compact={true} />
        </div>
    );
}