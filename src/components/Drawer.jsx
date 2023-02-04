import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useDispatch, useSelector } from "react-redux";
const drawerBleeding = 56;
const Root = styled("div")(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

function Drawer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  //     redux
  const { swipeableDrawer } = useSelector((state) => state.instaReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setOpen(swipeableDrawer);
  }, [swipeableDrawer, dispatch]);

  return (
    <Root>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={() => {
          dispatch({
            type: "setSwipeableDrawer",
            payload: false,
          });
        }}
        onOpen={() => {
          dispatch({
            type: "setSwipeableDrawer",
            payload: true,
          });
        }}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: false,
        }}
      >
        <>{props.component} </>
      </SwipeableDrawer>
    </Root>
  );
}

export default Drawer;
