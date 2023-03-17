import { useState } from "react";
import Form from "../components/Form/Form";

const RegisterPage = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
            alert("registration succesful");
        } else {
            alert("registration failed");
        }
    };

    return (
        <Form
            title="Register"
            onSubmit={handleRegister}
            username={username}
            password={password}
            onChangeUsername={(e) => setUserName(e.target.value)}
            onChangePassword={(e) => setPassword(e.target.value)}
        />
    );
};

export default RegisterPage;
