import Typography from "../Typography/Typography";
import styles from "./CharCard.module.css";

const CharCard = ({ uri, title }) => {
    return ( 
        <div className={styles.card}>
            <div className={styles.charImg} style={{ backgroundImage:`url(${uri})`}} />
            <Typography type="r1">{title}</Typography>
        </div>
    );
};

export default CharCard;