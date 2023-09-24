import React from 'react';
import styles from './featured.module.css';
import Image from 'next/image';
const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {' '}
        <b>Hey, AJ here! </b> Discover the world of tech and creative ideas.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src='/p1.jpeg' alt='' fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ex, odio iusto quo
            quos eum maxime sint autem vero accusantium?
          </h1>
          <p className={styles.postDesc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptatum quidem
            assumenda dolore quaerat autem exercitationem odit accusamus, maiores distinctio, maxime
            dolor nihil minus error. Pariatur doloribus iste mollitia, sequi tempora temporibus
            quod. Quia, nesciunt.
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
