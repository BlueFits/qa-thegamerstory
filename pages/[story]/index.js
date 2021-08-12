import 'tailwindcss/tailwind.css';
import Banner from "../../components/Banner/Banner";
import Layout from "../../components/Layout/Layout";
import {useRouter} from "next/router";
import Typography from '../../components/Typography/Typography';

const Index = () => {

    const router = useRouter();

    if (router.query.story !== "ffxiv") {
        return <Typography color="black">Not Found</Typography>
    }

    return (
        <Layout>
            <Banner
                title={<span>Astra <br/> Valants</span>}
                text="The history of valants"
                uri="https://media.discordapp.net/attachments/872578374256717854/873749248842285096/Final_Fantasy_XIV_A_Realm_Reborn_Screenshot_2021.08.07_-_22.06.57.15.png?width=1101&height=461"
            />
        </Layout>
    );
};

export default Index;