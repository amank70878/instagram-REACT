import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const deleteChat = async (users, otherUser, chats, setReload) => {
  const _ref = otherUser[0].user__loginId + users.user__loginId;

  chats.map(async (items) => {
    console.log(items.id);
    const userDoc = doc(db, `users/${users.id}/${_ref}/${items.id}`);
    await deleteDoc(userDoc);
  });
  setReload((state) => !state);
};
