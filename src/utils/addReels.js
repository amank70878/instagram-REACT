export const addReels = async (
  user,
  addDoc,
  collection,
  serverTimestamp,
  db,
  _videoUrl,
  title,
  location,
  dispatch,
  reloadRedux
) => {
  const messageCollectionRef = collection(db, `reels`);
  console.log(reloadRedux);
  await addDoc(messageCollectionRef, {
    reel__userLoginId: user.user__loginId,
    user__name: user.user__name,
    user__email: user.user__email,
    user__profileImg: user.user__profileImg,
    reel__title: title,
    reel__src: _videoUrl,
    reel__location: location,
    reel__likes: 0,
    reel__comments: 0,
    time: serverTimestamp(),
  });
  dispatch({
    type: "setPageLoader",
    payload: false,
  });
  dispatch({
    type: "setReloadRedux",
    payload: !reloadRedux,
  });
};
