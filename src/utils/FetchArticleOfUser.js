export const fetchArticleOfUser = async (
  query,
  collection,
  where,
  getDocs,
  db,
  setFetchedArticles,
  setLoading,
  articleType,
  setEmptyArticles,
  profileid
) => {
  const _type = articleType === "image" ? "image_Posts" : "video_Posts";

  const msgDataCollectionRef = collection(db, _type);

  const q = query(
    msgDataCollectionRef,
    where("post__userLoginId", "==", `${profileid}`)
  );
  const docSnap = await getDocs(q);
  if (docSnap._snapshot.docs.size > 0) {
    setFetchedArticles(
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
