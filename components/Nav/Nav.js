import Typography from "../Typography/Typography";
import ButtonA from "../ButtonA/ButtonA";
import Link from "next/link";

const Nav = ({ query }) => {
    return (
        <ul style={{ width: "100vw", height: 80 }} className="flex justify-end items-center px-20 fixed">
            <li className="mx-8"><Link href={"/" + query[0]} passHref><a><Typography type="r2">HOME</Typography></a></Link></li>
            <li className="mx-8"><Link href={"/" + query[0] + "/characters"} passHref><a><Typography type="r2">CHARACTERS</Typography></a></Link></li>
            <li className="mx-8"><Link href={"/" + query[0] + "/history"} passHref><a><Typography type="r2">HISTORY</Typography></a></Link></li>
            <li className="mx-8"><Link href="/" passHref><ButtonA><a><Typography type="r2">LOG IN</Typography></a></ButtonA></Link></li>
        </ul>
    );
};

export default Nav;