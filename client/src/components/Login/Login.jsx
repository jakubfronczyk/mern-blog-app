import styles from "./Login.module.scss";

const Login = () => {
    return (
        <form action="">
            <input
                type="text"
                placeholder="username"
            />
            <input
                type="password"
                placeholder="password"
            />
            <button>Login</button>
        </form>
    );
};

export default Login;
