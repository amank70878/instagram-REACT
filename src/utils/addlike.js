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
    console.log(docSnap._snapshot.docs.size);
    const _id = docSnap.docs[0].id;

    console.log(_id);
    console.log("user exists, deleting");
    const userDoc = doc(db, `reels/${id}/likes/${_id}`);
    await deleteDoc(userDoc);
  } else {
    console.log("user not exists, adding");
    await addDoc(collection(db, `reels/${id}/likes`), {
      likedBy__name: users.user__name,
      likedBy__email: users.user__email,
      user__profileImg: users.user__profileImg,
      timestamp: serverTimestamp(),
    });
  }

  // fetching all likes
  const q = query(collection(db, `reels/${id}/likes`));
  const docSnap1 = await getDocs(q);
  console.log(docSnap1._snapshot.docs.size);

  // update the likes length in the reels
  const noteDoc = doc(db, "reels", id);
  const newFields = {
    reel__likes: docSnap._snapshot.docs.size,
  };
  await updateDoc(noteDoc, newFields);
  setReload((state) => !state);
  fetchAllLikes();
};
