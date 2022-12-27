import { Dialog } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useState } from "react";
import { addTakeServer } from "../../services/adminServise";

const AddTake = ({ open, setOpen, value, socket }) => {

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
    await addTakeServer({"signalId":value.signalId,
      "take":data})
  }

  return(
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
            <div className={'updateText'}>Додати Take</div>

            <div className={'updateInputContainer'}>
              <input
                className={'updateInput'}
                onChange={(e)=> {setData(e.target.value)}}
                style={{
                  width: '50%',
                  color: 'black',
                }}
                type='number'
                name={'take'}
              />
            </div>
            <div className={'updateBtnContainer'}>
              <button disabled={!disable}  onClick={updateSignal} className={disable? 'updateBtn': 'updateBtnDisable' }>Опублікувати</button>
            </div>

          </div>
        </div>
      </Dialog>
    </div>
  )
}
export default AddTake