'use client';
import React, { useState } from 'react';
import styles from './comments.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { getApiUrlClient } from '@/utils/utilsClient';

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};
const Comments = ({ postSlug }) => {
  const { status } = useSession();
  const [desc, setDesc] = useState('');
  const url = getApiUrlClient(`/api/comments?postSlug=${postSlug}`);

  const { data, mutate, isLoading } = useSWR(url, fetcher);
  console.log(data);
  const handleSubmit = async () => {
    await fetch(getApiUrlClient(`/api/comments`), {
      method: 'POST',
      body: JSON.stringify({ desc, postSlug }),
    });
    mutate();
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Comments</h1>
      {status === 'authenticated' ? (
        <div className={styles.write}>
          <textarea
            placeholder='write a comment'
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href='/login'>Login to write a comment </Link>
      )}
      <div className={styles.comments}>
        {isLoading
          ? 'loading'
          : data.map((item) => (
              <div className={styles.comment} key={item._id}>
                <div className={styles.user}>
                  <Image
                    src={item.user?.image}
                    alt=''
                    height={50}
                    width={50}
                    className={styles.image}
                  />
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.user?.name}</span>
                    <span className={styles.date}>{item.createdAt.substring(0, 10)}</span>
                  </div>
                </div>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;
