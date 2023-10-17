import { Link } from "react-router-dom";

const Button = (props) => {
    const classCommom =
        "h-14 w-1/2 rounded-lg text-xl elem-center cursor-pointer ";
    const classButton = "bg-tertiary text-white hover:opacity-90";
    const classButtonOutline = `
        border-[2px] border-secondary border-solid elem-center text-secondary 
        hover:border-none hover:text-primary hover:bg-secondary transition-all
    `;

    const classResult = props.isOutline
        ? classCommom + classButtonOutline
        : classCommom + classButton;

    return props.link ? (
        <Link className={classResult} to={props.link} {...props}>
            {props.children}
        </Link>
    ) : (
        <button className={classResult} send={props.hasSend ? "send" : "no_send"} {...props}>
            {props.children}
        </button>
    );
};

export default Button;
