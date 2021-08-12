import styles from "./LineInput.module.css";

const LineInput = ({ value, onChangeHandler }) => {
    return (
        <input value={value} onChange={onChangeHandler} type="password" className={styles.input}/>
    );
};

export default LineInput;