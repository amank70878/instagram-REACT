import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { addDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const signInFunc = (navigate, dispatch) => {
  signInWithPopup(auth, provider)
    .then(async (data) => {
      dispatch({
        type: "setPageLoader",
        payload: "login",
      });
      const checkUserFunc = async () => {
        const q = query(
          collection(db, `users`),
          where("user__email", "==", `${data.user.email}`)
        );
        const docSnap = await getDocs(q);

        if (docSnap._snapshot.docs.size > 0) {
          localStorage.setItem("insta-by-aman-id", data._tokenResponse.localId);

          dispatch({
            type: "setPageLoader",
            payload: false,
          });
          navigate(`/home/${data._tokenResponse.localId}`);
        } else {
          const messageCollectionRef = collection(db, `users`);
          await addDoc(messageCollectionRef, {
            user__loginId: data._tokenResponse.localId,
            user__name: data.user.displayName,
            user__email: data.user.email,
            user__profileImg: data.user.photoURL,
          });
          localStorage.setItem("insta-by-aman-id", data._tokenResponse.localId);
          dispatch({
            type: "setPageLoader",
            payload: false,
          });
          navigate("/home");
        }
      };
      checkUserFunc();
    })
    .catch((err) => console.warn(err));
};

export default signInFunc;