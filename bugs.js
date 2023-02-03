// on profile page, login is showing while fetching user  👍
// make profile page  👍
// make the input to add posts  👍
// make the posts components  👍
// make the db for posts  👍
// adding posts to db  👍
// fetching the posts  👍
// remove posts and add reels  👍
// improve overall ui
// logout functionality  👍
// make extra info to add of the user
// reels uploading section  👍
// reels fetching section  👍
// profile post type section  👍
// location to the posts  👍
// delete the post  👍
// fetching reels but not user's
// adding comments  👍
// fetching comments  👍
// change store anme
// delete user

// search for current logged user with local token
useEffect(() => {
  const fetchUserData = async () => {
    const q = query(
      collection(db, `users`),
      where("user__loginId", "==", `${loggedId}`)
    );
    const docSnap = await getDocs(q);

    if (docSnap._snapshot.docs.size > 0) {
      setSearchedUser(
        docSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    }
  };
  fetchUserData();
}, []);
