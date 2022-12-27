import { Dialog } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import './Teaching.css'
import React, {useEffect, useState} from "react";

const EditLink = ({ open, setOpen, onChange , value   }) => {

    const [text, setText] = useState('')

    const close = () => {
        setOpen((prev => {
            prev.flag = false
            prev.value = {}
            return { ...prev };
        }))
    };

    const close2 =() => {
        setOpen((prev => {
            prev.flag = false
            prev.value = {}
            return { ...prev };
        }))(false)

    }

    useEffect(()=> {
        setText(value[1])
    },[value])


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
                            placeholder={'силка'}
                            name={value[0]}
                            id=''
                            cols='20' rows='20'
                            value={text}
                            onChange={(e) => {
                                onChange(e)
                                setText(e.target.value)
                            }}
                        />

                        <div className={'addTextBtn'}>
                            <button onClick={close} className={'addButton3'}>Змінити силку</button>
                        </div>

                    </div>
                </div>
            </Dialog>
        </div>
    )
}
export default EditLink
