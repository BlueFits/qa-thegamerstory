import Banner from "../../../components/Banner/Banner";
import Layout from "../../../components/Layout/Layout";
import Typography from "../../../components/Typography/Typography";
import Image from "next/image";
import styles from "./blogID.module.css";

const Index = () => {
    return (
        <Layout>
            <Banner
                title={<span>Astra <br/> Valants</span>}
                text="Something ehre"
                uri="https://media.discordapp.net/attachments/872578374256717854/873749248842285096/Final_Fantasy_XIV_A_Realm_Reborn_Screenshot_2021.08.07_-_22.06.57.15.png?width=1101&height=461"
            />
            <section style={{ width: "100%", overflowX: "hidden" }} className={"bg-black flex justify-center p-36"}>
                <div style={{ width: 1000 }}>
                    <div style={{ marginBottom: 15 }}>
                        <Typography type="r1">LOREM IPSUM</Typography>
                    </div>
                    <Typography type="r2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. It was popularised in the 1960s with the release of 
                        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
                        software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>
                    
                    <div className={styles.blogImage} style={{ backgroundImage: `url(https://media.discordapp.net/attachments/872578374256717854/873749248842285096/Final_Fantasy_XIV_A_Realm_Reborn_Screenshot_2021.08.07_-_22.06.57.15.png?width=1101&height=461)`}} />

                    <Typography type="r2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. It was popularised in the 1960s with the release of 
                        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
                        software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>
                </div>
            </section>
        </Layout>
    );
};

export default Index;