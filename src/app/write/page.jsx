'use client';
import Image from 'next/image';
import styles from './writePage.module.css';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '@/utils/firebase';
import { getApiUrlClient } from '@/utils/utilsClient';
import dynamic from 'next/dynamic';

const storage = getStorage(app);

const WritePage = () => {
  const { status } = useSession();
  const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState('');
  const [catSlug, setCatSlug] = useState('');

  useEffect(() => {
    const upload = () => {
      const fileName = new Date().getTime + file.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
            console.log('File available at', downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  async function handleSubmit() {
    const url = getApiUrlClient('/api/posts');
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        title,
        desc,
        img: media,
        slug: slugify(title),
        catSlug,
      }),
    });
    const postSlug = await res.json();

    router.push(`/posts/${postSlug.slug}`);
  }

  if (status === 'unauthenticated') {
    router.push('/');
  }
  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <input
        type='text'
        placeholder='Title'
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
        <option value='style'>style</option>
        <option value='fashion'>fashion</option>
        <option value='food'>food</option>
        <option value='culture'>culture</option>
        <option value='travel'>travel</option>
        <option value='coding'>coding</option>
      </select>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src='/plus.png' alt='' width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type='file'
              id='image'
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
            />
            <button className={styles.addButton}>
              <label htmlFor='image'>
                <Image src='/image.png' alt='' width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src='/external.png' alt='' width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src='/video.png' alt='' width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          theme='bubble'
          value={desc}
          onChange={setDesc}
          placeholder='tell your story ...'
          className={styles.textArea}
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
