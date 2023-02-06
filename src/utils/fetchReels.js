import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

export const fetchReels = async (setVideos, setLoadingVideos, setIsEmpty) => {
  const msgDataCollectionRef = collection(db, "reels");

  const q = query(msgDataCollectionRef);
  const result = await getDocs(q);
  if (result._snapshot.docs.size > 0) {
    setVideos(
      result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
    setLoadingVideos(false);
  } else {
    setLoadingVideos(false);
    setIsEmpty(true);
  }
};
