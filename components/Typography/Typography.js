import colors from "../../config/colors";

const Typography = ({ type = "t1", bold, color = colors.white, children }) => {

    let textComponent = null;

    switch (type) {
        case "t1":
            textComponent = <h1 style={{ color }} className={`text-5xl ${bold && "font-bold"}`}>{children}</h1>
            break;
    }

    return textComponent;
};

export default Typography;