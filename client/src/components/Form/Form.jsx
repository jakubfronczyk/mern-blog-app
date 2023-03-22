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
            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                value={username}
                onChange={onChangeUsername}
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={onChangePassword}
            />
            <button>{title}</button>
        </form>
    );
};

export default Form;
