import 'tailwindcss/tailwind.css';
import Banner from "../../components/Banner/Banner";
import Layout from "../../components/Layout/Layout";
import {useRouter} from "next/router";
import Typography from '../../components/Typography/Typography';
import { serverURL } from "../../config/Server";

export const getServerSideProps = async (context) => {
    try {
        const res = await fetch(serverURL + "/api/blog/get_latest?hub=" + context.query.story);
        let resData = await res.json();
        if (!res.ok) {
            resData = { error: "error" };
        }
        return {
            props: {
                blog: resData,
            },
        };
    } catch(err) {
        if (err) throw err;
    }
};

const Index = ({ blog }) => {
    const router = useRouter();
    if (router.query.story !== "ffxiv") {
        return <Typography color="black">Not Found</Typography>
    }
    return (
        <Layout>
            <Banner
                title={blog.headerTitle}
                text={blog.headerSub}
                uri={blog.thumbnailImage}
            />
        </Layout>
    );
};

export default Index;