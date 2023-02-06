import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchUserById = async (setHomeUser, profileid) => {
  const q = query(
    collection(db, `users`),
    where("user__loginId", "==", `${profileid}`)
  );
  const docSnap = await getDocs(q);

  if (docSnap._snapshot.docs.size > 0) {
    await setHomeUser(
      docSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  }
};
