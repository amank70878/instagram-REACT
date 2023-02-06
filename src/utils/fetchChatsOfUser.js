import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchChatsOfUser = async (setSearchedUser, navigate, dispatch) => {
  const _localToken = localStorage.getItem("insta-by-aman-id");

  if (_localToken) {
    const q = query(
      collection(db, `chats`),
      where("user__loginId", "==", `${_localToken}`)
    );
    const docSnap = await getDocs(q);

    if (docSnap._snapshot.docs.size > 0) {
      await setSearchedUser(
        docSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );

      dispatch({
        type: "setPageLoader",
        payload: false,
      });
    } else {
      dispatch({
        type: "setPageLoader",
        payload: false,
      });
      navigate("/login");
    }
  } else {
    dispatch({
      type: "setPageLoader",
      payload: false,
    });
    navigate("/login");
  }
};
