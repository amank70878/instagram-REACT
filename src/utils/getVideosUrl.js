export const getVideosUrl = async (
  ref,
  firebaseStorage,
  getDownloadURL,
  reel,
  uploadBytes,
  uuidv4,
  dispatch
) => {
  dispatch({
    type: "setPageLoader",
    payload: "input",
  });
  const _name = uuidv4;
  const _videoRef = ref(firebaseStorage, `reels/${_name}`);
  await uploadBytes(_videoRef, reel);

  let _URL;
  await getDownloadURL(ref(firebaseStorage, `reels/${_name}`))
    .then((url) => {
      _URL = url;
    })
    .catch((error) => {
      console.warn(error);
    });
  return _URL;
};
