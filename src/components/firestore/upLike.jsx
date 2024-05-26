import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const upLike = async (post) => {

    const posts_doc = doc(db, 'posts',post.id);
    await updateDoc(posts_doc, {
        like: post.like + 1,
    });

    const updatePostSnapshot = await getDoc(posts_doc);
    const updatePost = {...updatePostSnapshot.data(), id: updatePostSnapshot.id };

    return updatePost;
}