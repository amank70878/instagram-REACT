import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export const addChat = async (input, users, otherUser, setReload, scrollTo) => {
  const _ref1 = users.user__loginId + otherUser[0].user__loginId;
  const _ref2 = otherUser[0].user__loginId + users.user__loginId;

  // me
  await addDoc(collection(db, `users/${users.id}/${_ref2}`), {
    comment: input,
    user__name: users.user__name,
    user__profileImg: users.user__profileImg,
    user__email: users.user__email,
    timestamp: serverTimestamp(),
  });
  const msgDataCollectionRef = collection(db, `users/${users.id}/chats`);
  const q = query(
    msgDataCollectionRef,
    where("user__ref", "==", `${otherUser[0].user__loginId}`)
  );
  const docSnap = await getDocs(q);
  if (docSnap._snapshot.docs.size > 0) {
    const _id = docSnap.docs[0].id;

    const noteDoc = doc(db, `users/${users.id}/chats`, _id);
    const newFields = {
      comment: input,
      user__ref: otherUser[0].user__loginId,
      user__name: otherUser[0].user__name,
      user__profileImg: otherUser[0].user__profileImg,
      timestamp: serverTimestamp(),
    };
    await updateDoc(noteDoc, newFields);
  } else {
    const _ref = collection(db, `users/${users.id}/chats`);
    await addDoc(_ref, {
      comment: input,
      user__ref: otherUser[0].user__loginId,
      user__name: otherUser[0].user__name,
      user__profileImg: otherUser[0].user__profileImg,
      timestamp: serverTimestamp(),
    });
  }

  // other
  await addDoc(collection(db, `users/${otherUser[0].id}/${_ref1}`), {
    comment: input,
    user__name: users.user__name,
    user__profileImg: users.user__profileImg,
    user__email: users.user__email,
    timestamp: serverTimestamp(),
  });
  const msgDataCollectionRef2 = collection(
    db,
    `users/${otherUser[0].id}/chats`
  );
  const q2 = query(
    msgDataCollectionRef2,
    where("user__ref", "==", `${users.user__loginId}`)
  );
  const docSnap2 = await getDocs(q2);
  if (docSnap2._snapshot.docs.size > 0) {
    const _id1 = docSnap2.docs[0].id;

    const noteDoc2 = doc(db, `users/${otherUser[0].id}/chats`, _id1);
    const newFields2 = {
      comment: input,
      user__ref: users.user__loginId,
      user__name: users.user__name,
      user__profileImg: users.user__profileImg,
      timestamp: serverTimestamp(),
    };
    await updateDoc(noteDoc2, newFields2);
  } else {
    const _ref2 = collection(db, `users/${otherUser[0].id}/chats`);
    await addDoc(_ref2, {
      comment: input,
      user__ref: users.user__loginId,
      user__name: users.user__name,
      user__profileImg: users.user__profileImg,
      timestamp: serverTimestamp(),
    });
  }

  setReload((prev) => !prev);
  scrollTo.current.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "start",
  });
};
