import Layout from "../../../components/Layout/Layout";
import CharCard from "../../../components/CharCard/CharCard";

const Index = () => {
    return (
        <Layout>
            <section style={{ minHeight: "100vh", width: "100vw" }} className="bg-black flex justify-center items-center">
                <div className="flex-wrap flex justify-center" style={{ width: 1000 }}>
                    <CharCard 
                        uri={"https://media.discordapp.net/attachments/872578374256717854/873749248842285096/Final_Fantasy_XIV_A_Realm_Reborn_Screenshot_2021.08.07_-_22.06.57.15.png?width=1101&height=461"}
                    />
                </div>
            </section>
        </Layout>
    );
};

export default Index;