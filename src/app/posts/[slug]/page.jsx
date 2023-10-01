import Menu from '@/components/menu/Menu';
import styles from './singlePage.module.css';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';
import { getApiUrl } from '@/utils/utils';

const getData = async (slug) => {
  const url = getApiUrl(`/api/posts/${slug}`);
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed');
  }
  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const post = await getData(slug);
  return (
    <div className='container'>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{post.title.substring(0, 30)}</h1>
          <div className={styles.user}>
            {post?.img && (
              <div className={styles.userImageContainer}>
                <Image src={post.user.image} alt='' fill className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{post.user.name}</span>
              <span className={styles.date}>{post.createdAt.substring(0, 10)}</span>
            </div>
          </div>
        </div>
        {post?.img && (
          <div className={styles.imageContainer}>
            <Image src={post.img} alt='' fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: post?.desc }}></div>
          <div className={styles.comment}>
            <Comments />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
