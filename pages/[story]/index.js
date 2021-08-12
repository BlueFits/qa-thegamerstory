import 'tailwindcss/tailwind.css';
import Banner from "../../components/Banner/Banner";
import Layout from "../../components/Layout/Layout";

const index = () => {
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

export default index;