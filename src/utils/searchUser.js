import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";

export const searchUser = async (setAllUser, setLoading, setIsEmpty) => {
  const _localToken = localStorage.getItem("insta-by-aman-id");

  if (_localToken) {
    const q = query(
      collection(db, `users`),
      where("user__loginId", "!=", _localToken)
    );
    const docSnap = await getDocs(q);

    if (docSnap._snapshot.docs.size > 0) {
      await setAllUser(
        docSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(false);
    } else {
      setIsEmpty(true);
      setLoading(false);
    }
  }
};
