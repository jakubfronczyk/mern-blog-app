import styles from "./Form.module.scss";

const Form = ({
    title,
    onSubmit,
    username,
    password,
    onChangeUsername,
    onChangePassword,
}) => {
    return (
        <form
            onSubmit={onSubmit}
            className={styles.form}
        >
            <h1>{title}</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={onChangeUsername}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={onChangePassword}
            />
            <button>{title}</button>
        </form>
    );
};

export default Form;
