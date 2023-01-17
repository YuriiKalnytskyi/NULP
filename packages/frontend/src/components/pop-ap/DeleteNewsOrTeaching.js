import { Dialog } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './PopApStail.css';
import { deleteTeachingServer } from '../../services/adminServise';

const DeleteNewsOrTeaching = ({ open, setOpen, value, socket, component }) => {
  const deleteValue = async () => {
    if (component === 'teaching') {
      await deleteTeachingServer(value?.id);
      socket.emit('teaching');
    } else {
      //TODO сказати андрію щоб додав до новин Id
      // await deleteNewsServer()
      socket.emit('news');
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        PaperProps={{
          style: { borderRadius: 37 }
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={'updateUserContainer'}>
          <CloseIcon
            className={'close'}
            onClick={() => {
              setOpen(false);
            }}
          />

          <div className={'updateContainer2'}>
            {component === 'teaching' ? (
              <div className={'updateInputContainer2'}>
                <div className={'updateTitle'} style={{ marginBottom: '30px' }}>
                  Урок № {value?.lesson}
                </div>

                <div className={'updateTitle'} style={{ textAlign: 'center' }}>
                  {value?.description}
                </div>
              </div>
            ) : (
              <div className={'updateInputContainer2'}>
                <div className={'updateTitle'} style={{ textAlign: 'center' }}>
                  {value?.title}
                </div>
              </div>
            )}

            <div className={'updateBtnContainer'}>
              <button onClick={deleteValue} className={'updateBtn'}>
                Видалити
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteNewsOrTeaching;
