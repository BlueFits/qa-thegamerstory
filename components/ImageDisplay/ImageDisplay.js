import styles from "./ImageDisplay.module.css";
import { Close } from "@material-ui/icons";

const ImageDisplay = ({ content, onClose }) => {
    return (                                    
        <div style={{ height: 450, margin: "100px 0" }} className="w-full">
            {onClose &&
                <div className="flex justify-end mb-2">
                    <Close onClick={onClose} className="cursor-pointer" />
                </div>
            }
            <div className={styles.blogImage} style={{ backgroundImage: `url(${content})`}} />
        </div>
    );
};

export default ImageDisplay;