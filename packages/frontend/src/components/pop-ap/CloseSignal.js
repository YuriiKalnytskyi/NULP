import { Dialog } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './PopApStail.css';
import { useEffect, useState } from "react";
import arrow2 from "../../images/Polygon.png";
import arrow from "../../images/Polygon 4.png";
import { closeSignalServer } from "../../services/adminServise";

const UpdateSignal = ({ open, setOpen, value, socket }) => {
  const [disable, setDisable] = useState(false)

  const [arrowFlag2, setArrowFlag2] = useState(false);
  const [closeSignalId, setCloseSignalId] = useState({
    title: 'Виберіть',
    countItem:'',
    signalId: value.signalId
  });

    const order = [
        'TAKE',
        'STOP LOSS',
        'безубиток',
        'руками',
        '(скасовано)',
    ];


  const radioChange = (e) => {
    setCloseSignalId({ ...closeSignalId, [e.target.name]: e.target.id });
    setArrowFlag2(false);
  };
  const onChange = (e) =>{
    setCloseSignalId({ ...closeSignalId, [e.target.name]: e.target.value });
  }

  const closeSignal = async () => {
    socket.emit("signal");
    await closeSignalServer(closeSignalId)
    setOpen(false)
  }

  useEffect(()=> {
    if (closeSignalId.title === 'Виберіть' || closeSignalId.countItem===''){
      setDisable(false)
    }
    else {
      setDisable(true)
    }
  },[closeSignalId])

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
        <div className={"updateUserContainer"} >
          <CloseIcon className={'close'} onClick={()=>{setOpen(false)}} />

          <div className={"updateContainer"}>
            <div className={"updateTitle"}>{value.signalName.toUpperCase()}</div>

            <div className={'updateInputContainer2'}>

              <input
                className={'updateInput'}
                placeholder={"пункти"}
                onChange={onChange}
                style={{
                  width: '50%',
                  color: 'black',
                }}
                type='number'
                name={'countItem'}
              />

              <div className={'castomSelect'}>
                <div className={'statusSignal'} onClick={() => {
                  setArrowFlag2(!arrowFlag2);
                }}>
                  {closeSignalId.title}
                </div>
                <img
                  onClick={() => {
                    setArrowFlag2(!arrowFlag2);
                  }}
                  className={'castomSelectArrow'}
                  src={arrowFlag2 ? arrow2 : arrow}
                  alt={'test'}
                />
                {arrowFlag2 && (
                  <div className={'castomSelectInput'}>
                    <div className={'castomSelectBbox'}>
                      <div className='optionsContainer active'>
                        {order.map((value, index) => (
                          <div key={index} className='option'>
                            <input
                              type='radio'
                              className='radio'
                              onChange={radioChange}
                              id={value}
                              name='title'
                            />
                            <label htmlFor={value}>{value}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>



            </div>

            <div className={'updateBtnContainer'}>
              <button disabled={!disable}  onClick={closeSignal} className={disable? 'updateBtn': 'updateBtnDisable' }>Закрити</button>
            </div>

          </div>
        </div>
      </Dialog>
    </div>
  );
};


export default UpdateSignal;
