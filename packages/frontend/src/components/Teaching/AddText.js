import { Dialog } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './Teaching.css';
import React, { useState } from 'react';

const AddText = ({ open, setOpen, onChange, index, setIndex }) => {
  const [text, setText] = useState('');

  const close = () => {
    setOpen(false);
  };

  const close2 = () => {
    setOpen(false);
    setIndex(index - 1);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={close2}
        PaperProps={{
          style: { borderRadius: 37 }
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={'updateUserContainer'}>
          <CloseIcon className={'close'} onClick={close2} />

          <div className={'updateContainer'}>
            <textarea
              className={'InputTitle2'}
              placeholder={'Текст'}
              name={`text ${index}`}
              id=""
              cols="20"
              rows="20"
              value={text.value}
              onChange={(e) => {
                onChange(e);
                setText(e.target.value);
              }}
            />

            <div className={'addTextBtn'}>
              <button onClick={close} className={'addButton3'}>
                Додати текст
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default AddText;
