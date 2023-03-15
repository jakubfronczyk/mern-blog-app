import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Layout />}
            >
                <Route
                    index
                    element={<Homepage />}
                />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;
