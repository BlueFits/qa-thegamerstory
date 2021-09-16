import 'tailwindcss/tailwind.css';
import Banner from "../../components/Banner/Banner";
import Layout from "../../components/Layout/Layout";
import {useRouter} from "next/router";
import Typography from '../../components/Typography/Typography';
import { serverURL } from "../../config/Server";

export const getServerSideProps = async (context) => {
    try {
        const res = await fetch(serverURL + "/api/blog/get_latest?hub=" + context.query.story);
        if (!res.ok) {
            const errData = await res.json();
            return {
                props: {
                    err: errData.error,
                },
            };
        } else {
            const resData = await res.json();
            return {
                props: {
                    blog: resData,
                },
            };
        }
    } catch(err) {
        if (err) throw err;
    }
};

const Index = ({ err, blog }) => {
    const router = useRouter();

    if (err) {
        router.push(`/${router.query.story}/myblogs`);
        return <div><h1>No blogs yet</h1></div>;
    } else if (router.query.story !== "ffxiv") {
        return <Typography color="black">Not Found</Typography>;
    } 

    return (
        <Layout>
            <Banner
                title={blog.headerTitle}
                text={blog.headerSub}
                uri={blog.headerImage}
            />
        </Layout>
    );
};

export default Index;