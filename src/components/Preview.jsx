import React from 'react'
import './Preview.css'
import {previewPosts} from './firestore/previewPosts'
import { useState,useEffect } from'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

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

    useEffect(() => {
    }, [posts]);

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
                    <div className="post-text">{post.text}</div>
                    <div className="post-like">{post.like}</div>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Preview