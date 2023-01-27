import { Dialog } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, {useEffect, useState} from "react";
import './CreateCard.css'



const EditText = ({ open, setOpen, onChange, value }) => {

    const close = () => {
        setOpen((prev => {
            prev.flag = false
            prev.value = {}
            return { ...prev };
        }))
    };


    return(
        <div>
            <Dialog
                open={open}
                onClose={close}
                PaperProps={{
                    style: { borderRadius: 37 }
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={"updateUserContainer"}>
                    <CloseIcon className={'close'} onClick={close} />

                    <div className={"updateContainer"}>

                        <div className={'fileContainer'}>
                            <input
                                className="fileInput"
                                id="file"
                                type="file"
                                accept={'image/*'}
                                name={value[0]}
                                onChange={onChange}
                            />
                            {/*<label for='file' className={'labelInput'}*/}
                            {/*>*/}
                            {/*    <AddAPhotoIcon />*/}
                            {/*</label>*/}
                        </div>



                        <div className={'addTextBtn'}>
                            <button onClick={close} className={'addButton3'}>Змінити фото</button>
                        </div>


                    </div>
                </div>
            </Dialog>
        </div>
    )
}
export default EditText
