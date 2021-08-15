import Nav from "../Nav/Nav";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
    const router = useRouter();
    const { story } = router.query;

    return (
        <div>
            <Nav query={[story]}/>
            {children}
        </div>
    );
};

export default Layout;