import { collection, getDoc, getDocs, query, orderBy,doc,deleteDoc,updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const previewPosts = async () => {
    try {
        const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(postsQuery);
        const posts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return posts;
    } catch (error) {
        console.error('Error fetching posts: ', error);
        throw error; // エラーを再スローして呼び出し元でキャッチできるようにする
    }
};

const upLike = async (post) => {

    const posts_doc = doc(db, 'posts',post.id);
    const like_now = await getDoc(posts_doc);
    const updatedLike = like_now.data().like + 1;
    await updateDoc(posts_doc, {
        like: updatedLike,
    });

    const updatePostSnapshot = await getDoc(posts_doc);
    const updatePost = {...updatePostSnapshot.data(), id: updatePostSnapshot.id };

    return updatePost;
}

const deletePost = async (post) => {
    try {
        const postsDoc = doc(db, 'posts', post.id);
        await deleteDoc(postsDoc);
        const updatedPosts = await previewPosts();
        return updatedPosts;
    } catch (error) {
        console.error('Error deleting document: ', error);
        throw error;
    }
};

export {previewPosts,upLike,deletePost};