import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const searchUser = async (setAllUser) => {
  const _localToken = localStorage.getItem("insta-by-aman-id");

  if (_localToken) {
    const q = query(collection(db, `users`));
    const docSnap = await getDocs(q);

    if (docSnap._snapshot.docs.size > 0) {
      await setAllUser(
        docSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    } else {
    }
  } else {
  }
};
