import React, { useState } from 'react';
import './Editorbar.css';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { previewPosts } from './firestore/previewPosts';

const Editorbar = ({ user, setPosts }) => {
  const [text, setText] = useState('');

  // 折り返し地点で改行を挿入する関数
  const insertLineBreaks = (text, lineLength) => {
    const lines = [];
    let position = 0;
    while (position < text.length) {
      let line = text.slice(position, position + lineLength);
      lines.push(line);
      position += lineLength;
    }
    return lines.join('\n');
  };


  const submitButton = async () => {
    if (text.trim() !== '') {
      try {
        let username = "unknown";
        let usericon = "unknown";

        if(user !== null){
          usericon = user.photoURL;
          username = user.displayName;
        }

        // テキストに折り返し地点で改行を挿入
        const formattedText = insertLineBreaks(text, 35);

        await addDoc(collection(db, 'posts'), {
          text: formattedText,
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
