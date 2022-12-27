import { Dialog } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './PopApStail.css';
import { useEffect, useState } from "react";
import { updateSignalServer } from "../../services/adminServise";

const UpdateSignal = ({ open, setOpen, value, socket }) => {
  const [data, setData] = useState('')
  const [disable, setDisable] = useState(false)

  useEffect(()=> {
    if (data === ''){
      setDisable(false)
    }
    else {
      setDisable(true)
    }
  },[data])


  const updateSignal = async () => {
    socket.emit("signal");
    setOpen(false)
    await updateSignalServer(value, data)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={()=>{setOpen(false)}}
        PaperProps={{
          style: { borderRadius: 37 }
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={"updateUserContainer"}>
            <CloseIcon className={'close'} onClick={()=>{setOpen(false)}} />

          <div className={"updateContainer"}>
            <div className={"updateTitle"}>{value.signalName.toUpperCase()}</div>
            <div className={'updateText'}>Змінити {value.title} з {value.value}</div>

            <div className={'updateInputContainer'}>
              <input
                className={'updateInput'}
                onChange={(e)=> {setData(e.target.value)}}
                style={{
                  width: '50%',
                  color: 'black',
                }}
                type='number'
              />
            </div>
            <div className={'updateBtnContainer'}>
              <button disabled={!disable}  onClick={updateSignal} className={disable? 'updateBtn': 'updateBtnDisable' }>Змінити</button>
            </div>

          </div>
        </div>
      </Dialog>
    </div>
  );
};


export default UpdateSignal;
