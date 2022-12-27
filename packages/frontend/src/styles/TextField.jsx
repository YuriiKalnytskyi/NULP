import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    border: 'none',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.palette.white,
    fontWeight: 'normal',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: theme.palette.white,
    },
    '&$focused': {
      backgroundColor: theme.palette.white,
      color: theme.palette.black,
    },
    '& .MuiInputLabel-animated': {
      transition: `color 200ms cubic-bezier(${'0.0, 0, 0.2, 1'}) 0ms,transform 200ms cubic-bezier(${'0.0, 0, 0.2, 1'}) 0ms`,
    },
    '& .MuiInputLabel-filled.MuiInputLabel-marginDense': {
      transform: `translate(${'12px, 29px'}) scale(${'1'})`,
    },
    '& .MuiInputLabel-filled.MuiInputLabel-shrink': {
      transform: `translate(${'12px, 7px'}) scale(${'0.75'})`,
    },
  },
  focused: {},
}));

export const FlowTextField = (props) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      InputProps={{ classes, disableUnderline: true }}
      {...props}
    />
  );
};
