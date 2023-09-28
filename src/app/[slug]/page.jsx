import Menu from '@/components/menu/Menu';
import styles from './singlePage.module.css';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';

const SinglePage = () => {
  return (
    <div className='container'>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, doloribus.
          </h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image src='/p1.jpeg' alt='' fill className={styles.avatar} />
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>11.10.2023</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src='/p1.jpeg' alt='' fill className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum assumenda, omnis odit,
              aspernatur quis non officia mollitia consectetur similique harum accusamus quidem
              molestias, expedita provident.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis nemo, magnam
              accusantium quod aperiam provident voluptatibus possimus sit. Quo, animi? Fuga dolores
              consequuntur quia, quasi, ex corporis eligendi voluptatem, itaque magnam doloremque
              totam eos sequi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam incidunt nesciunt neque
              laborum accusamus mollitia perferendis placeat atque amet dignissimos?
            </p>
          </div>
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
