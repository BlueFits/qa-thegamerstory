import colors from "../../config/colors";
import { Button } from "@material-ui/core";

const styles={
    button: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        padding: "12px 30px",
    },
};

const ButtonA = ({ clickHandler, children }) => {
    return (
        <Button onClick={clickHandler} variant="contained" color="primary" size="large" style={styles.button}>
            {children}
        </Button>        
    );
};

export default ButtonA;