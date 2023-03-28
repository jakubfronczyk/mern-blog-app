import { useContext } from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { format } from "date-fns";
import styles from "./PostPage.module.scss";

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then((response) => {
            response.json().then((postInfo) => {
                setPostInfo(postInfo);
            });
        });
    }, []);
    if (!postInfo) return "";
    return (
        <section className={styles.post}>
            <h1 className={styles.post__title}>{postInfo.title}</h1>
            <div className={styles.post__info}>
                <div className={styles.post__info__author}>
                    <time>
                        {format(new Date(postInfo.updatedAt), "MMM d, yyyy")}
                    </time>
                    <div>
                        by <span>@{postInfo.author.username}</span>
                    </div>
                </div>
                {userInfo.id === postInfo.author._id && (
                    <div className={styles.post__info__edit}>
                        <Link
                            to={`/edit/${postInfo._id}`}
                            className={styles.post__info__edit__container}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                            Edit
                        </Link>
                    </div>
                )}
            </div>
            <div className={styles.post__img}>
                <img
                    src={postInfo.img}
                    alt=""
                />
            </div>
            {/* to print html from a string, empty div, dangerouslySetInnerHTML to an object {} 
                which includes {__hhtml.string you want to print}
            */}
            <div
                className={styles.post__content}
                dangerouslySetInnerHTML={{ __html: postInfo.content }}
            />
        </section>
    );
};

export default PostPage;
