import Link from "next/link";
import Layout from "../../../components/Layout/Layout";
import Typography from "../../../components/Typography/Typography";
import TimeLineBlock from "../../../components/TimeLineBlock/TimeLineBlock";
import RoadMap from "../../../assets/svg/RoadMap.svg"
import Image from "next/image";
import { useRouter } from "next/router"

const history = () => {

    const router = useRouter();

    const { story } = router.query;

    return (
        <Layout>
            <section style={{ minHeight: "100vh", width: "100vw" }} className="bg-black flex flex-col items-center">
                <div className="mt-80">
                    <Typography type="s2" bold>TIMELINE</Typography>
                </div>
                <div className="flex justify-center flex-col" style={{ width: 1000, padding: "40px 20px"}}>
                    <Link href={`/${story}/blogID`}><a>
                        <div className="flex flex-col justify-center items-center">
                            <Typography style={{ marginBottom: 25 }} type="r1">PROLOGUE</Typography>
                            <div className="flex">
                                <TimeLineBlock
                                    title="Some Title"
                                    src="https://image.shutterstock.com/image-photo/abstraction-futuristic-city-concrete-neon-260nw-1536232397.jpgs"
                                />
                            </div>
                        </div>
                    </a></Link>
                    {/* <div className="flex justify-center my-4">
                        <Image src={RoadMap}/>
                    </div> */}
                </div>
            </section>
        </Layout>
    );
};

export default history;