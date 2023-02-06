// import { orderBy } from "firebase/firestore";

export const FetchReelsOfUser = async (
  query,
  collection,
  where,
  getDocs,
  db,
  setFetchedReels,
  setEmptyArticles,
  profileid,
  setLoading
) => {
  const msgDataCollectionRef = collection(db, "reels");

  const q = query(
    msgDataCollectionRef,
    where("reel__userLoginId", "==", `${profileid}`)
    // orderBy("timestamp", "desc")
  );
  const docSnap = await getDocs(q);
  if (docSnap._snapshot.docs.size > 0) {
    setFetchedReels(
      docSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
    setLoading(false);
  } else {
    setLoading(false);
    setEmptyArticles(true);
  }
};
