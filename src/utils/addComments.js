import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const addComment = async (id, inputComment, pageLoader, users) => {
  await addDoc(collection(db, `reels/${id}/messages`), {
    comment: inputComment,
    user__name: users.user__name,
    user__profileImg: users.user__profileImg,
    timestamp: serverTimestamp(),
  });
};
