export const getImagesUrl = async (
  ref,
  firebaseStorage,
  getDownloadURL,
  imageUpload,
  uploadBytes,
  uuidv4,
  dispatch
) => {
  dispatch({
    type: "setPageLoader",
    payload: "input",
  });
  const _name = uuidv4;
  const _imageRef = ref(firebaseStorage, `images/${_name}`);
  await uploadBytes(_imageRef, imageUpload);
  // .then((snapshot) => {
  //   getDownloadURL(snapshot.ref).then((url) => {
  //     setFetchedImageUrls((prev) => [...prev, url]);
  //   });
  // });

  let _URL;
  await getDownloadURL(ref(firebaseStorage, `images/${_name}`))
    .then((url) => {
      _URL = url;
    })
    .catch((error) => {
      console.warn(error);
    });
  return _URL;
};
