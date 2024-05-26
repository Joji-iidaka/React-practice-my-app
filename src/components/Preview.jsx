import React from 'react'
import './Preview.css'
import { useState,useEffect,useRef } from'react'

// FontAwesomeのアイコンをインポート
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

// lottiefilesのアニメーションをインポート
import { Player } from '@lottiefiles/react-lottie-player'
// ダウンロードしたアニメーション(json)をインポート
import Animation_like from '../assets/Animation_like.json'

// firestoreにいいねを増やす処理をコンポーネントから取得
import { previewPosts,upLike,deletePost } from './firestore/firestoreAccess'

const Preview = ({posts,setPosts,user,showConfirmDelete,setConfirmDelete}) => {
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const getPosts = async () => {
        try {
            const posts = await previewPosts();
            setPosts(posts);
        } catch (error) {
            console.error('Error fetching posts: ', error);
        }
        };
            getPosts();
        }, []);

    // lottieアニメーション用
    const lottieRef = useRef({});
    const defaultOptions = {
        loop:false,
        autoplay:false,
        aunimationData: Animation_like,
        renderSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    // いいねボタンアニメーション&いいね増加処理
    const onLike = async(post) => {
        if(lottieRef.current[post.id]){
            lottieRef.current[post.id].play();
            upLike(post);
            const updatedPost = await upLike(post);
            // 投稿を更新
            const updatedPosts = posts.map(p => (p.id === updatedPost.id ? updatedPost : p));
            setPosts(updatedPosts);
        }
    }

    const onDelete = async(post) => {
        const updatePosts = await deletePost(post);
        setPosts(updatePosts);
        setConfirmDelete(false);
    }

    const confirmSubmit = (post) => {
        setConfirmDelete(true);
        setSelectedPost(post)
    };

    const handleConfirm = async (confirm,post) => {
    if(confirm){
        await onDelete(post);
    }else{
        setConfirmDelete(false);
    }
    }

      // 改行を <br> タグに変換する関数
    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
        ));
    };

    // Firebaseのタイムスタンプを日付と時刻にフォーマットする関数
    const formatDateTime = (timestamp) => {
        const date = timestamp.toDate();
        return `${date.toLocaleDateString()}　${date.toLocaleTimeString()}`;
    };

    return (
    <div className='app-preview'>
        <div className="content-panels">
            {posts.map((post) => (
                <>
                <div key={post.id} className='content-panel'>
                    <div className="post-user">
                        {post.usericon == "unknown" ? (
                            <FontAwesomeIcon className='user-icon' icon={faUser} />
                        ) : (
                            <img className='user-icon' src={post.usericon}/>
                        )}
                        <p>{post.userName}</p>
                    </div>
                    <div className="post-text">
                        <p>{formatText(post.text)}</p>
                    </div>
                    <div className='post-footer'>
                        <div className="post-date">
                            <p>{formatDateTime(post.createdAt)}</p>
                        </div>
                        <div className="post-option">
                            {user && user.uid === post.userid && (
                                <div className='delete-button' onClick={() => confirmSubmit(post)}>
                                    <FontAwesomeIcon icon={faDeleteLeft} />
                                </div>
                            )}
                            <p>{post.like}</p>
                            <div className='like-button' onClick={() => onLike(post)}>
                                <Player
                                    option={defaultOptions}
                                    src={Animation_like}
                                    ref={el => lottieRef.current[post.id] = el}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {showConfirmDelete && selectedPost.id == post.id &&(
                    <div className='confirm-dialog'>
                        <p>この投稿を削除しますか？</p>
                        <div className='confirm-dialog-button'>
                        <button onClick={() => handleConfirm(true,post)}>はい</button>
                        <button onClick={() => handleConfirm(false,null)}>いいえ</button>
                    </div>
                </div>
                )}
                </>
            ))}
        </div>
    </div>
    )
}

export default Preview