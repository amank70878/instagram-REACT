import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const addComment = async (id, inputComment, pageLoader, users) => {
  // add comments
  await addDoc(collection(db, `reels/${id}/messages`), {
    comment: inputComment,
    user__name: users.user__name,
    user__profileImg: users.user__profileImg,
    timestamp: serverTimestamp(),
  });

  // fetch all comments
  const q = query(collection(db, `reels/${id}/messages`));
  const docSnapComments = await getDocs(q);
  const totalComments = docSnapComments._snapshot.docs.size;

  // update the comments length in the reels
  const noteDoc = doc(db, "reels", id);
  const newFields = {
    reel__comments: totalComments,
  };
  await updateDoc(noteDoc, newFields);
};
