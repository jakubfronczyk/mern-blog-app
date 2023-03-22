import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import AddPost from "../components/AddPost/AddPost";

const EditPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch("http://localhost:4000/post/" + id).then((response) => {
            response.json().then((postInfo) => {
                setTitle(postInfo.title);
                setDescription(postInfo.description);
                setContent(postInfo.content);
            });
        });
    }, []);

    const handleUpdatePost = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set("title", title);
        data.set("description", description);
        data.set("content", content);
        data.set("id", id);
        if (files?.[0]) {
            data.set("file", files?.[0]);
        }
        const response = await fetch("http://localhost:4000/post", {
            method: "PUT",
            body: data,
            credentials: "include",
        });
        if (response.ok) {
            setRedirect(true);
        }
    };

    if (redirect) {
        return <Navigate to={"/post/" + id} />;
    }

    return (
        <div>
            EditPage
            <AddPost
                title={title}
                description={description}
                content={content}
                onSubmit={handleUpdatePost}
                onChangeTitle={(e) => setTitle(e.target.value)}
                onChangeDescription={(e) => setDescription(e.target.value)}
                onChangeFile={(e) => setFiles(e.target.files)}
                onChangeContent={setContent}
                buttonName="Update Post"
            />
        </div>
    );
};

export default EditPage;
