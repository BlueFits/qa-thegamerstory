import colors from "../../config/colors";

const Typography = ({ type = "t1", bold, color = colors.white, children, style }) => {

    let textComponent = null;

    switch (type) {
        case "s1":
            textComponent = <h1 style={{...style, color }} className={`text-9xl ${bold && "font-bold"}`}>{children}</h1>
            break;
        case "t1":
            textComponent = <h1 style={{...style, color }} className={`text-5xl ${bold && "font-bold"}`}>{children}</h1>
            break;
        case "r1":
            textComponent = <p style={{...style, color }} className={`text-3xl ${bold && "font-bold"}`}>{children}</p>
            break;
        case "r2":
            textComponent = <p style={{...style, color }} className={`text-xl ${bold && "font-bold"}`}>{children}</p>
            break;
    }

    return textComponent;
};

export default Typography;