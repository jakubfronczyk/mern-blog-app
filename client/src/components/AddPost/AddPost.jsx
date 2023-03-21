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

const AddPost = ({
    title,
    description,
    content,
    onSubmit,
    onChangeTitle,
    onChangeDescription,
    onChangeFile,
    onChangeContent,
    buttonName,
}) => {
    return (
        <form
            className={styles.form}
            onSubmit={onSubmit}
        >
            <input
                type="text"
                placeholder={"Title"}
                value={title}
                onChange={onChangeTitle}
                required
            />
            <input
                type="text"
                placeholder={"Description"}
                value={description}
                onChange={onChangeDescription}
                required
            />
            <input
                type="file"
                onChange={onChangeFile}
            />
            <ReactQuill
                value={content}
                onChange={onChangeContent}
                modules={modules}
                formats={formats}
                required
            />
            <button>{buttonName}</button>
        </form>
    );
};

export default AddPost;
