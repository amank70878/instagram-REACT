import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

export const UpdateUser = ({ userDetails, setReload }) => {
  const dispatch = useDispatch();

  const [modalName, setModalName] = useState("");
  const [modalBio1, setModalBio1] = useState("");
  const [modalBio2, setModalBio2] = useState("");
  const [modalBio3, setModalBio3] = useState("");
  const [modalBio4, setModalBio4] = useState("");

  useEffect(() => {
    setModalName(userDetails.user__name);
    setModalBio1(userDetails.user__Bio1);
    setModalBio2(userDetails.user__Bio2);
    setModalBio3(userDetails.user__Bio3);
    setModalBio4(userDetails.user__Bio4);
  }, []);

  const updatePostFunc = async () => {
    const noteDoc = doc(db, "users", userDetails.id);
    const newFields = {
      user__name: modalName,
      user__Bio1: modalBio1,
      user__Bio2: modalBio2,
      user__Bio3: modalBio3,
      user__Bio4: modalBio4,
    };
    await updateDoc(noteDoc, newFields);
    setReload(true);
  };

  return (
    <Box sx={style}>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <div />
        <Typography
          variant="caption"
          color="grey"
          fontSize="17px"
          textAlign="center"
        >
          User Information
        </Typography>
        <IconButton
          onClick={() =>
            dispatch({
              type: "setUserModal",
              payload: false,
            })
          }
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack direction="column" gap="15px">
        <TextField
          id="outlined-basic"
          label="your name"
          type="text"
          variant="outlined"
          value={modalName}
          onChange={(e) => setModalName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Bio 1"
          variant="outlined"
          style={{
            width: "100%",
            marginBottom: 5,
          }}
          value={modalBio1}
          onChange={(e) => setModalBio1(e.target.value)}
          type="text"
        />
        <TextField
          type="text"
          id="outlined-basic"
          label="Bio 2"
          variant="outlined"
          style={{ width: "100%" }}
          value={modalBio2}
          onChange={(e) => setModalBio2(e.target.value)}
        />
        <TextField
          type="text"
          id="outlined-basic"
          label="Bio 3"
          variant="outlined"
          style={{ width: "100%" }}
          value={modalBio3}
          onChange={(e) => setModalBio3(e.target.value)}
        />
        <TextField
          type="text"
          id="outlined-basic"
          label="Bio 4"
          variant="outlined"
          style={{ width: "100%" }}
          value={modalBio4}
          onChange={(e) => setModalBio4(e.target.value)}
        />
      </Stack>
      <Stack
        direction={"row"}
        justifyContent="flex-end"
        gap="5"
        marginTop="20px"
      >
        <Button
          variant="contained"
          sx={{ margin: "0 10px" }}
          onClick={() => {
            updatePostFunc();
            dispatch({
              type: "setUserModal",
              payload: false,
            });
          }}
        >
          Update
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "0 10px" }}
          onClick={() =>
            dispatch({
              type: "setUserModal",
              payload: false,
            })
          }
        >
          close
        </Button>
      </Stack>
    </Box>
  );
};
