import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchReels = async (setVideos, setLoadingVideos) => {
  const result = await getDocs(collection(db, `reels`));
  setVideos(
    result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
  );
  setLoadingVideos(false);
};
