import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const previewPosts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
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
