import { Routes, Route } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route
                    path="/"
                    element={<Layout />}
                >
                    <Route
                        index
                        element={<Home />}
                    />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/register"
                        element={<Register />}
                    />
                    <Route
                        path="/create"
                        element={<CreatePost />}
                    />
                    <Route
                        path="/post/:id"
                        element={<PostPage />}
                    />
                    <Route
                        path="/edit/:id"
                        element={<EditPost />}
                    />
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;
