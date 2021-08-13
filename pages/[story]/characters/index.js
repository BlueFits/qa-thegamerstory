import Layout from "../../../components/Layout/Layout";
import CharCard from "../../../components/CharCard/CharCard";
import { serverURL } from "../../../config/Server";
import Link from "next/link";
import { useRouter } from "next/router";

export const getServerSideProps = async (context) => {
    try {
        const res = await fetch(serverURL + "/api/blog/get_chars?hub=" + context.query.story);
        if (!res.ok) {
            const errData = res.json();
            return {
                props: {
                    error: errData.error
                },
            };
        } else {
            const resData = await res.json();
            return {
                props: {
                    chars: resData,
                },
            }
        };
        
    } catch(err) {
        if (err) throw err;
    }
};

const Index = ({ chars }) => {

    const router = useRouter();

    const { story } = router.query;

    return (
        <Layout>
            <section style={{ minHeight: "100vh", width: "100vw" }} className="bg-black flex justify-center items-center">
                <div className="flex-wrap flex justify-center" style={{ width: 1000 }}>
                    {chars.map((char, index) => {
                        return (
                            <Link key={"key:" + index} href={`/${story}/${char._id}`}>
                                <a>
                                    <CharCard 
                                        title={char.blogTitle}
                                        uri={char.thumbnailImage}
                                    />
                                </a>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </Layout>
    );
};

export default Index;