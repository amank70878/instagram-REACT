import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const SearchForAllChatsOfUser = async (
  users,
  setFetchedChats,
  setIsEmpty,
  setChatsLoading
) => {
  try {
    const q = query(collection(db, `users/${users.id}/chats`));
    const docSnap = await getDocs(q);

    if (docSnap._snapshot.docs.size > 0) {
      await setFetchedChats(
        docSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setChatsLoading(false);
    } else {
      setIsEmpty(true);
      setChatsLoading(false);
    }
  } catch (err) {
    console.warn(err);
  }
};
