import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./AddPost.module.scss";

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
    ],
};
const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
];

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    // to have access to the file we need to create stata
    const [files, setFiles] = useState("");

    const handleNewPost = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set("title", title);
        data.set("description", description);
        data.set("content", content);
        data.set("avatar", files[0]);

        const response = await fetch("http://localhost:4000/post", {
            method: "POST",
            //because of file, it easier to send all this information not as json but as formdata
            body: data,
        });
        console.log(await response.json());
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleNewPost}
        >
            <input
                type="text"
                placeholder={"Title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder={"Description"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="file"
                onChange={(e) => setFiles(e.target.files)}
                required
            />
            <ReactQuill
                value={content}
                onChange={(newValue) => setContent(newValue)}
                modules={modules}
                formats={formats}
                required
            />
            <button>Add post</button>
        </form>
    );
};

export default AddPost;
