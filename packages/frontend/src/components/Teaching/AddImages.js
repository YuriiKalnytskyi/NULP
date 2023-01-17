import { Dialog } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import './Teaching.css';

const AddImages = ({ open, setOpen, onChange, index, indexImages, setIndexImages }) => {
  const close = () => {
    setOpen(false);
    setIndexImages(indexImages + 1);
  };
  const close2 = () => {
    setOpen(false);
    setIndexImages(indexImages - 1);
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
            <div className={'fileContainer'}>
              <input
                className="fileInput"
                id="file"
                type="file"
                accept={'image/*'}
                name={`image ${index} ${indexImages}`}
                onChange={onChange}
              />
              {/*<label for='file' className={'labelInput'}*/}
              {/*>*/}
              {/*    <AddAPhotoIcon />*/}
              {/*</label>*/}
            </div>

            <div className={'addTextBtn'}>
              <button onClick={close} className={'addButton3'}>
                Додати фото
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default AddImages;
