import { Avatar } from "@material-ui/core";
import Typography from "../Typography/Typography";

const TimeLineBlock = ({ src, title }) => {
    return (
        <div className="flex flex-col justify-center items-center mx-8">
            <Avatar alt="story1" style={{ height: 80, width: 80, marginBottom: 10 }} src={src}/>
            <Typography type="r2">{title}</Typography>
        </div>
    );
};

export default TimeLineBlock;