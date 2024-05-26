import React, { useState } from 'react';
import './Editorbar.css';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { previewPosts } from './firestore/previewPosts';

const Editorbar = ({ user, setPosts }) => {
  const [text, setText] = useState('');

  const submitButton = async () => {
    if (text.trim() !== '') {
      try {
        let username = "unknown";
        let usericon = "unknown";

        if(user !== null){
          usericon = user.photoURL;
          username = user.displayName;
        }
        await addDoc(collection(db, 'posts'), {
          text: text,
          uid: new Date().toISOString(), // Firebaseのタイムスタンプ形式に変更
          usericon: usericon,
          userName: username,
          like: 0,
          createdAt: new Date(),
        });
        setText('');
        alert('投稿が完了しました。');
        // 投稿を追加した後に最新の投稿を取得してセットする
        const posts = await previewPosts();
        setPosts(posts);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      alert('テキストを入力してください。');
    }
  };

  return (
    <div className='app-editorbar'>
      <div className="edit-text">
        <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
      </div>
      <div className="edit-submit">
        <button onClick={submitButton}>投稿する</button>
      </div>
    </div>
  );
};

export default Editorbar;
