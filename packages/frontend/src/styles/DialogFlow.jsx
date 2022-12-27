import React from 'react';
import {
  makeStyles,
  Dialog,
  IconButton,
  DialogContent,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

export const DialogFlow = ({ open, handleClose, children }) => {
  const classes = useStyles();

  return (
    <>
      <Dialog open={open} maxWidth={false} className={classes.paper}>
        <DialogContent className={classes.root}>{children}</DialogContent>
        <IconButton
          className={classes.btnClose}
          color="primary"
          aria-label="upload picture"
          onClick={handleClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    overflowY: 'unset',

    '& .MuiDialog-paper': {
      overflowY: 'unset',
    },
  },
  root: {
    maxWidth: '662px',
    width: '662px',
    background: theme.palette.primary.main,
    padding: '40px 40px 50px',
  },
  icon: {
    fontSize: '32px',
  },
  btnClose: {
    position: 'absolute',
    right: '-46px',
    top: '-5px',
    background: 'none',
    padding: '0',
  },
}));
