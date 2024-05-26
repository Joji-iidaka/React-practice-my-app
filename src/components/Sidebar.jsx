import React from 'react'
import './Sidebar.css'
import { signInWithPopup } from 'firebase/auth'
import { auth,provider } from '../firebase'
import { useEffect, useState } from'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faRightToBracket,faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({user,setUser,showConfirmLogout,setConfirmLogout}) => {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
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
    setConfirmLogout(false);
  }

  const confirmSubmit = () => {
      setConfirmLogout(true);
  };

  const handleConfirm = (confirm) => {
  if(confirm){
      logout();
  }else{
      setConfirmLogout(false);
  }
  }

  return (
    <div className='app-sidebar'>
      <img className='logo' src='/images/React_logo.png' alt='Reactのかわいいロゴ' />
      {user? (
        <>
        <div className="login-info">
          <img className='user-icon' src={user.photoURL} alt="ユーザーアイコン" />
          <p>{user.displayName}</p>
          <FontAwesomeIcon className='logout-button' onClick={confirmSubmit} icon={faRightFromBracket} />
        </div>
        </>
      ) : (
        <>
          <div className="logout-info">
            <FontAwesomeIcon className='user-icon' icon={faUser} />
            <p>unknown</p>
            <FontAwesomeIcon className='login-button' onClick={login} icon={faRightToBracket} />
          </div>
        </>
      )}
      {showConfirmLogout && (
        <div className='confirm-dialog'>
            <p>ログアウトしますか？</p>
            <div className='confirm-dialog-button'>
            <button onClick={() => handleConfirm(true)}>はい</button>
            <button onClick={() => handleConfirm(false)}>いいえ</button>
            </div>
        </div>
        )}
    </div>
  )
}

export default Sidebar