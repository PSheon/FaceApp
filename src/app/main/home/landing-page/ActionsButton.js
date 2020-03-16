import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import * as Actions from "app/store/actions";
import { getFullFaceDescription } from "app/utils";
import Descriptor from "app/utils/descriptor";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    right: 10,
    bottom: 20,
    zIndex: 1,
    transition: "all .5s ease-in-out",
    "&:hover": {
      transform: "translate(-10px, -10px)"
    }
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function ActionsButton(props) {
  const { getScreenShot } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const [descriptor, setDescriptor] = useState(null);
  const [screenShot, setScreenShot] = useState(null);

  const [faceOwnerName, setFaceOwnerName] = useState("");
  const [trainedFaceDescriptor, setTrainedFaceDescriptor] = useState([]);
  const [isImageTraining, setIsImageTraining] = useState(false);
  const [isImageTrainged, setIsImageTrainged] = useState(false);
  const [descriptorListOpen, setDescriptorListOpen] = useState(false);
  const [addDescriptorOpen, setAddDescriptorOpen] = useState(false);

  const handleClickOpenDescriptorList = () => {
    setDescriptorListOpen(true);
  };
  const handleCloseDescriptorList = () => {
    setDescriptorListOpen(false);
  };
  const handleClickOpenAddDescriptor = async () => {
    const newCapture = await getScreenShot();

    setScreenShot(newCapture);

    setAddDescriptorOpen(true);
  };
  const handleCloseAddDescriptor = () => {
    setScreenShot(null);
    setDescriptor(null);
    setAddDescriptorOpen(false);
  };

  const handleAddDescriptor = (faceOwnerName, trainedFaceDescriptor) => {
    const originDescriptor = Descriptor.getDescriptor();

    const newDescriptor = JSON.stringify({
      ...originDescriptor,
      [faceOwnerName]: {
        name: faceOwnerName,
        descriptors: [Array.from(trainedFaceDescriptor[0].descriptor)]
      }
    });

    Descriptor.setDescriptor(newDescriptor);

    dispatch(Actions.showMessage({ message: "已新增貴賓資訊" }));
    setAddDescriptorOpen(false);
  };
  const handleDeleteDescriptor = () => {
    Descriptor.removeDescriptor();

    dispatch(Actions.showMessage({ message: "已刪除貴賓資訊" }));
  };

  const handleTraingImage = useCallback(async screenShot => {
    setIsImageTraining(true);

    await getFullFaceDescription(screenShot, 160)
      .then(fullDesc => {
        setIsImageTrainged(true);
        setIsImageTraining(false);

        setTrainedFaceDescriptor(fullDesc);
        console.log(fullDesc);
      })
      .catch(err => {
        console.log("err, ", err);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (Descriptor.hasDescriptor()) {
      setDescriptor(Descriptor.getDescriptor());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col opacity-25 hover:opacity-100"
      )}
    >
      <IconButton
        onClick={handleClickOpenDescriptorList}
        className="text-white w-64 h-64"
        aria-label="辨識臉部"
      >
        <Tooltip title="貴賓名單" aria-label="貴賓名單" placement="left">
          <Badge
            badgeContent={descriptor ? Object.keys(descriptor).length : 0}
            color="primary"
          >
            <AccountCircleIcon />
          </Badge>
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={handleClickOpenAddDescriptor}
        className="text-white w-64 h-64"
        aria-label="新增貴賓"
      >
        <Tooltip title="新增貴賓" aria-label="新增貴賓" placement="left">
          <PersonAddIcon />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={handleDeleteDescriptor}
        className="text-white w-64 h-64"
        aria-label="刪除辨識資料"
      >
        <Tooltip
          title="刪除貴賓資料"
          aria-label="刪除貴賓資料"
          placement="left"
        >
          <DeleteIcon />
        </Tooltip>
      </IconButton>

      {/* 貴賓名單 */}
      <Dialog
        open={descriptorListOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDescriptorList}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          已辨識的貴賓名單
        </DialogTitle>
        <DialogContent>
          <List dense>
            {!!descriptor &&
              Object.entries(descriptor).map(item => (
                <ListItem
                  className="rounded-32 my-12 sm:w-360"
                  key={`list-${item[0]}`}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item[0]} className="h2 text-grey" />
                </ListItem>
              ))}
          </List>
        </DialogContent>
      </Dialog>

      {/* 新增貴賓 */}
      <Dialog
        open={addDescriptorOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAddDescriptor}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">新增貴賓</DialogTitle>
        <DialogContent>
          {screenShot && (
            <>
              <img className="rounded-12" src={screenShot} alt="螢幕擷取" />

              {isImageTrainged ? (
                trainedFaceDescriptor.length ? (
                  <div className="flex flex-col justify-center items-center">
                    <TextField
                      className="mt-16 mb-32 rounded-12"
                      id="outlined-basic"
                      label="貴賓姓名"
                      value={faceOwnerName}
                      onChange={event => setFaceOwnerName(event.target.value)}
                      variant="outlined"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={
                        faceOwnerName === "" ||
                        !!Object.entries(descriptor).find(
                          item =>
                            item[0].toLowerCase() ===
                            faceOwnerName.toLowerCase()
                        )
                      }
                      onClick={() =>
                        handleAddDescriptor(
                          faceOwnerName,
                          trainedFaceDescriptor
                        )
                      }
                    >
                      加入貴賓
                      <AccountCircleIcon />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleCloseAddDescriptor}
                    >
                      <CancelIcon />
                      重新拍攝
                    </Button>
                  </div>
                )
              ) : (
                <div className="flex justify-center items-center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleCloseAddDescriptor}
                  >
                    <CancelIcon />
                    重新拍攝
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className=""
                    onClick={() => handleTraingImage(screenShot)}
                    disabled={isImageTraining}
                  >
                    {isImageTraining ? "訓練圖片中..." : "訓練圖片"}
                    {isImageTraining ? (
                      <AccountCircleIcon />
                    ) : (
                      <AccountCircleIcon />
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ActionsButton;
