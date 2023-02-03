import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchCommentsOfReel = async (
  id,
  setFetchedComments,
  setIsEmpty,
  setLoading
) => {
  const q = query(collection(db, `reels/${id}/messages`));
  const docSnap = await getDocs(q);
  if (docSnap._snapshot.docs.size > 0) {
    setFetchedComments(
      docSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
    setLoading(false);
  } else {
    setLoading(false);
    setIsEmpty(true);
  }
};
