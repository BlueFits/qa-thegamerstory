import Typography from "../Typography/Typography";

const Banner = ({ uri, title, text }) => {
    return (
        <section style={{ width:"100vw", height: "100vh", backgroundImage: `url(${uri})`}} className={`bg-black flex justify-center items-center bg-no-repeat bg-cover bg-center`}>
            <div style={{ width: "70%" }}>
                <Typography style={{ marginBottom: 70 }} type="s1" bold>{title}</Typography>
                <Typography type="r1">{text}</Typography>
            </div>
        </section>
    );
};

export default Banner;