import { useState } from "react";
import { Navigate } from "react-router-dom";
import AddPost from "../components/AddPost/AddPost";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [redirect, setRedirect] = useState(false);
    // to have access to the file we need to create stata
    const [files, setFiles] = useState("");

    const handleNewPost = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set("title", title);
        data.set("description", description);
        data.set("content", content);
        data.set("img", files[0]);

        const response = await fetch("http://localhost:4000/post", {
            method: "POST",
            //because of file, it easier to send all this information not as json but as formdata
            body: data,
            credentials: "include",
        });
        if (response.ok) {
            setRedirect(true);
        }
    };

    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <>
            <h1>Here you create your new post</h1>
            <AddPost
                title={title}
                description={description}
                content={content}
                onSubmit={handleNewPost}
                onChangeTitle={(e) => setTitle(e.target.value)}
                onChangeDescription={(e) => setDescription(e.target.value)}
                onChangeFile={(e) => setFiles(e.target.files)}
                onChangeContent={(newValue) => setContent(newValue)}
            />
        </>
    );
};

export default CreatePost;
