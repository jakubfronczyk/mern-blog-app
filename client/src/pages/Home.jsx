import { useEffect, useState } from "react";
import Post from "../components/Post/Post";

const Homepage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/post`).then((response) => {
            response.json().then((posts) => {
                setPosts(posts);
            });
        });
    }, []);

    return (
        <>
            {posts.length > 0 &&
                posts.map((post, idx) => (
                    <Post
                        key={idx}
                        {...post}
                    />
                ))}
        </>
    );
};

export default Homepage;
