import {
  addDoc,
  query,
  getDocs,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const addlike = async (id, users, setReload, fetchAllLikes) => {
  // add likes
  const docSnap = await getDocs(
    query(
      collection(db, `reels/${id}/likes`),
      where("likedBy__email", "==", `${users.user__email}`)
    )
  );
  if (docSnap._snapshot.docs.size > 0) {
    const _id = docSnap.docs[0].id;
    const userDoc = doc(db, `reels/${id}/likes/${_id}`);
    await deleteDoc(userDoc);
  } else {
    await addDoc(collection(db, `reels/${id}/likes`), {
      likedBy__name: users.user__name,
      likedBy__email: users.user__email,
      user__profileImg: users.user__profileImg,
      timestamp: serverTimestamp(),
    });
  }

  // fetch all likes
  const q = query(collection(db, `reels/${id}/likes`));
  const docSnapLikes = await getDocs(q);
  const totalLikes = docSnapLikes._snapshot.docs.size;

  // update the likes length in the reels
  const noteDoc = doc(db, "reels", id);
  const newFields = {
    reel__likes: totalLikes,
  };
  await updateDoc(noteDoc, newFields);
  setReload((state) => !state);
  fetchAllLikes();
};
