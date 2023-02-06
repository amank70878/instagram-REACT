import { query, collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export const fetchchat = async (
  setChats,
  setChatsLoading,
  setIsEmpty,
  otherUser,
  users,
  scrollTo
) => {
  try {
    const _ref = otherUser[0].user__loginId + users.user__loginId;

    const q = query(
      collection(db, `users/${users.id}/${_ref}`),
      orderBy("timestamp", "asc")
    );
    const docSnap = await getDocs(q);
    if (docSnap._snapshot.docs.size > 0) {
      setChats(
        docSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setChatsLoading(false);
      scrollTo.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    } else {
      setChatsLoading(false);
      setIsEmpty(true);
    }
  } catch (error) {
    // console.warn(error);
  }
};
