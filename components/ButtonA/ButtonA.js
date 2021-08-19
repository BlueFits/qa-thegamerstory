import colors from "../../config/colors";
import { Button } from "@material-ui/core";

const styles={
    button: {
        borderRadius: 50,
        // padding: "10px 30px",
    },
};

const ButtonA = ({ clickHandler, children, disableElevation = false, backgroundColor = colors.primary }) => {
    return (
        <Button 
            disableElevation={disableElevation} 
            onClick={clickHandler} 
            variant="contained" 
            color="primary" 
            size="large" 
            style={{...styles.button, backgroundColor}}>
            {children}
        </Button>        
    );
};

export default ButtonA;