import { Dialog } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import './Teaching.css'
import React, {useState} from "react";

const AddLink = ({ open, setOpen, onChange , index , setIndexLink, indexLink }) => {

    const [text, setText] = useState('')

    const close = () => {
        setOpen(false)
      setIndexLink(indexLink+1)
    };

    const close2 =() => {
        setOpen(false)
      // setIndexLink(indexLink-1)
    }

    return(
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
                <div className={"updateUserContainer"}>
                    <CloseIcon className={'close'} onClick={close2} />

                    <div className={"updateContainer"}>

                        <textarea
                            className={'InputTitle2'}
                            placeholder={'Link'}
                            name={`link ${index} ${indexLink}`}
                            id=''
                            cols='20' rows='20'
                            value={text.value}
                            onChange={onChange}
                        />

                        <div className={'addTextBtn'}>
                            <button onClick={close} className={'addButton3'}>Додати силку</button>
                        </div>




                    </div>
                </div>
            </Dialog>
        </div>
    )
}
export default AddLink
