import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Form from "../components/Form/Form";
import { UserContext } from "../contexts/UserContext";

const LoginPage = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
            //save cookie inside react app
            credentials: "include",
        });
        if (response.ok) {
            response.json().then((userInfo) => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
        } else {
            alert("Wrong credentials");
        }
    };

    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <Form
            title="Login"
            onSubmit={handleLogin}
            username={username}
            password={password}
            onChangeUsername={(e) => setUserName(e.target.value)}
            onChangePassword={(e) => setPassword(e.target.value)}
        />
    );
};

export default LoginPage;
