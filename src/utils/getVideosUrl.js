export const getVideosUrl = async (
  ref,
  firebaseStorage,
  getDownloadURL,
  videoSrc,
  uploadBytes,
  uuidv4,
  dispatch
) => {
  dispatch({
    type: "setPageLoader",
    payload: "input",
  });
  const _name = uuidv4;
  const _videoRef = ref(firebaseStorage, `videos/${_name}`);
  await uploadBytes(_videoRef, videoSrc);

  let _URL;
  await getDownloadURL(ref(firebaseStorage, `videos/${_name}`))
    .then((url) => {
      _URL = url;
    })
    .catch((error) => {
      console.warn(error);
    });
  return _URL;
};
