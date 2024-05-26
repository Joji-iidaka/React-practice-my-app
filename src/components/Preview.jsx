import React from 'react'
import './Preview.css'
import {previewPosts} from './firestore/previewPosts'
import { useState,useEffect,useRef } from'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Player } from '@lottiefiles/react-lottie-player'
import Animation_like from '../assets/Animation_like.json'
import { upLike } from './firestore/upLike'

const Preview = ({posts,setPosts}) => {
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

    const lottieRef = useRef({});

    const defaultOptions = {
        loop:false,
        autoplay:false,
        aunimationData: Animation_like,
        renderSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

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

      // 改行を <br> タグに変換する関数
    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
        ));
    };

    return (
    <div className='app-preview'>
        <div className="content-panels">
            {posts.map((post) => (
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
                    <div className="post-like">
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
            ))}
        </div>
    </div>
    )
}

export default Preview