import styles from "./Post.module.scss";

const Post = () => {
    return (
        <div className={styles.post}>
            <div className={styles.post__img}>
                <img
                    src="https://techcrunch.com/wp-content/uploads/2022/12/lawnmower-Large.jpeg?w=730&crop=1"
                    alt=""
                />
            </div>
            <div className={styles.post__content}>
                <h2>Full-house battery backup coming later this year</h2>
                <p className={styles.post__content__info}>
                    <a className={styles.post__content__info__author}>
                        Jay Fronczesko
                    </a>
                    <time>2023-01-20 16:45</time>
                </p>
                <p className={styles.post__content__description}>
                    Today at its special launch event, home backup power giant
                    EcoFlow launched a flurry of new products, including a
                    “Whole-Home Backup Power Solution.”
                </p>
            </div>
        </div>
    );
};

export default Post;
