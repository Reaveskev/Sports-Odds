import styles from "@/styles/NBA.module.css";

function NewsCard({ news }) {
  return (
    <div className={styles.newInfo}>
      <a href={news.links} className={styles.new_a}>
        <img
          className={styles.Pic}
          height={325}
          alt={news.headline}
          src={news.image}
        />
      </a>
      <header className={styles.newsTitle}>{news.headline}</header>
      <p className={styles.newsDescription}>{news.description}</p>
    </div>
  );
}

export default NewsCard;
