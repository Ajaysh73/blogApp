import React from 'react';
import styles from './categoryList.module.css';
import Pagination from '../pagination/Pagination';
import Link from 'next/link';
import Image from 'next/image';
import { getApiUrl } from '@/utils/utils';

const getData = async () => {
  const url = getApiUrl('/api/categories');
  console.log(url);
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed');
  }
  return res.json();
};

const CategoryList = async () => {
  const data = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data.map((cat) => (
          <Link
            key={cat._id}
            href='/blog?cat=${cat.slug}'
            className={`${styles.category} ${styles[cat.slug]}`}>
            {cat.img && (
              <Image src={cat.img} alt='' width={32} height={32} className={styles.image} />
            )}
            {cat.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
