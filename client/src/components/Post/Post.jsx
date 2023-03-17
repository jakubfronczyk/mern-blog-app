import styles from "./Post.module.scss";
import { format } from "date-fns";

const Post = ({ title, description, content, img, author, createdAt }) => {
    return (
        <div className={styles.post}>
            <div className={styles.post__img}>
                <img
                    src={"http://localhost:4000/" + img}
                    alt=""
                />
            </div>
            <div className={styles.post__content}>
                <h2>{title}</h2>
                <p className={styles.post__content__info}>
                    <a className={styles.post__content__info__author}>
                        {author.username}
                    </a>
                    <time>
                        {format(new Date(createdAt), "MMM d, yyyy HH:mm")}
                    </time>
                </p>
                <p className={styles.post__content__description}>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Post;
