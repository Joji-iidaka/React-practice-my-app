import React from 'react'
import './Sidebar.css'
import { signInWithPopup } from 'firebase/auth'
import { auth,provider } from '../firebase'
import { useEffect, useState } from'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({user,setUser}) => {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
        console.log(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up subscription when component unmounts
    return () => unsubscribe();
  }, []);

  const login = () => {
      // Googleでログイン
      signInWithPopup(auth,provider).then((result) => {
        setUser(result.user);
      });
  }

  const logout = () => {
    // ログアウト
    auth.signOut();
    setUser(null);
  }

  return (
    <div className='app-sidebar'>
      {user? (
        <>
        <div className="login-info">
          <img className='user-icon' src={user.photoURL} alt="ユーザーアイコン" />
          <p>{user.displayName}</p>
          <button onClick={logout}>ログアウト</button>
        </div>
        </>
      ) : (
        <>
          <div className="logout-info">
            <FontAwesomeIcon className='user-icon' icon={faUser} />
            <p>ログインしていません</p>
            <button onClick={login}>ログイン</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Sidebar