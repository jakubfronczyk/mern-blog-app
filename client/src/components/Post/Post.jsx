import styles from "./Post.module.scss";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({
    _id,
    title,
    description,
    content,
    img,
    author,
    createdAt,
    updatedAt,
}) => {
    return (
        <div className={styles.post}>
            <div className={styles.post__img}>
                <Link to={`/post/${_id}`}>
                    <img
                        src={"http://localhost:4000/" + img}
                        alt=""
                    />
                </Link>
            </div>
            <div className={styles.post__content}>
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className={styles.post__content__info}>
                    <time>
                        {format(
                            new Date(updatedAt ? updatedAt : createdAt),
                            "MMM d, yyyy"
                        )}
                    </time>
                    <a className={styles.post__content__info__author}>
                        by @{author.username}
                    </a>
                </p>
                <p className={styles.post__content__description}>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Post;
