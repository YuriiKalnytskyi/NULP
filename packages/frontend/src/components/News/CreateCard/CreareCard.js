import React, {useEffect, useState} from 'react'
import CloseIcon from '@material-ui/icons/Close';
import './CreateCard.css'
import AddImages from "./AddImages";
import AddText from "./AddText";
import EditIcon from "@material-ui/icons/Edit";
import EditText from "./EditText";
import EditImage from "./EditImage";
import {useInput} from "../../../hooks/useInput";
import AddLink from "./AddLink";
import EditLink from "../../Teaching/EditLink";
import {addNewsServer} from "../../../services/adminServise";

const CreateCard = ({ open, setOpen, socket, component, setOpenUserHomework }) => {

    const formData = new FormData()

    const [addImagesState, setAddImagesState] = useState(false)
    const [addTextState, setAddTextState] = useState(false)
    const [addLinkState, setAddLinkState] = useState(false);

    const [editText, setEditText] = useState({ flag: false, value: {} })
    const [editImage, setEditImage] = useState({ flag: false, value: {} })
    const [editLink, setEditLink] = useState({ flag: false, value: {} });

    const [text, setText] = useState({})
    const [images, setImages] = useState({})
    const [links, setLinks] = useState({});

    const [index, setIndex] = useState(0)
    const [indexImages, setIndexImages] = useState(0)
    const [indexLink, setIndexLink] = useState(0);

    const [disabledBtn, setDisabledBtn] = useState(false)


    const title = useInput('', {
        isEmpty: true,
        minLength: 3,
    });
    const number = useInput('', {
        isEmpty: true,
    });


    const addText = () => {
        setAddTextState(true)
        setIndex(index + 1)
    };
    const editTextHandler = (t) => {
        setEditText((prev => {
            prev.flag = true
            prev.value = t
            return { ...prev };
        }))
    };

    const addImages = () => {
        setAddImagesState(true)
    };
    const editImages = (i) => {
        setEditImage((prev => {
            prev.flag = true
            prev.value = i
            return { ...prev };
        }))
    };

    const addLink = () => {
        setAddLinkState(true);
        setIndexLink(indexLink + 1);
    };
    const editLinks = (i) => {
        setEditLink((prev) => {
            prev.flag = true;
            prev.value = i;
            return { ...prev };
        });
    };


    const textOnChange = (e) => {
        setText({ ...text, [e.target.name]: e.target.value });
    };


    const imagesOnChange = (e) => {
        setImages({ ...images, [e.target.name]: e.target.files[0] });
    };

    const linkOnChange = (e) => {
        setLinks({ ...links, [e.target.name]: e.target.value });
    };

    const close = () => {
        setOpen(false)
    };


    const create = async () => {
        Object.entries(images).map((i) => {
            formData.append(i[0], i[1])
        })
        Object.entries(text).map((t) => {
            formData.append(t[0], t[1])
        })
        Object.entries(links).map((l) => {
            formData.append(l[0], l[1])
        })

        setOpen(false)

        formData.append('title', title.value);

        await addNewsServer(formData)

        socket.emit('addData');
    }


    useEffect(() => {
        if (!title.inputValid) {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(true);
        }
    }, [title.inputValid]);


    return (
        <div className={'createContainer'}>
            {
                addImagesState && <AddImages
                    setOpen={setAddImagesState}
                    open={addImagesState}
                    onChange={imagesOnChange}
                    index={index}
                    setIndex={setIndex}
                    indexImages={indexImages}
                    setIndexImages={setIndexImages}

                />
            }
            {
                editImage && <EditImage
                    open={editImage.flag}
                    setOpen={setEditImage}
                    onChange={imagesOnChange}
                    value={editImage.value}
                />
            }


            {
                addTextState && <AddText
                    setOpen={setAddTextState}
                    open={addTextState}
                    onChange={textOnChange}
                    setIndex={setIndex}
                    index={index}
                />
            }
            {
                editText.flag && <EditText
                    onChange={textOnChange}
                    open={editText.flag}
                    setOpen={setEditText}
                    value={editText.value}
                />
            }

            {addLinkState && (
                <AddLink
                    setOpen={setAddLinkState}
                    open={addLinkState}
                    onChange={linkOnChange}
                    index={index}
                    indexLink={indexLink}
                    setIndexLink={setIndexLink}
                />
            )}
            {editLink.flag && (
                <EditLink
                    onChange={linkOnChange}
                    open={editLink.flag}
                    setOpen={setEditLink}
                    value={editLink.value}
                />
            )}

            <CloseIcon color={'error'} className={'closeCard'} onClick={close}/>
            <div className={'addInputTitle'}>


                <input className={'InputTitle'}
                       type='text'
                       placeholder={'Тема'}
                       style={
                           title.isDirty && title.flag
                               ? {
                                   border: '1px solid #FF0000',
                               }
                               : { border: '1px solid silver' }
                       }
                       value={title.value}
                       onChange={(e) => {

                           title.onChange(e);
                       }}
                       onBlur={(e) => title.onBlur(e)}
                />

            </div>

            <div className={'scrollCreate'}>
                <div className={'TextArea'}>

                    {
                        images && Object.entries(images).filter((image) =>
                            image[0].split(' ')[1] === (0).toString()).map((i, index) =>
                            <div key={index} className={'addImage'}>
                                Картинка {i[1]?.name}
                                <EditIcon onClick={() => editImages(i)} style={{ marginLeft: '20px' }}/>
                            </div>
                        )
                    }

                    {links &&
                    Object.entries(links)
                        .filter((link) => link[0].split(' ')[1] === (0).toString())
                        .map((i, index) => (
                            <div key={index} className={'text2'}>
                                {i[1]}
                                <EditIcon onClick={() => editLinks(i)} style={{ marginLeft: '20px' }} />
                            </div>
                        ))}
                    {
                        Object.entries(text).map((t, index) =>
                            <div key={index} className={'addText'}>
                                <div className={'text2'}>
                                    {t[1]}
                                    <EditIcon onClick={() => editTextHandler(t)}
                                              className={'editIcon'}

                                    />
                                </div>
                                <div>
                                    {links &&
                                    Object.entries(links)
                                        .filter((link) => link[0].split(' ')[1] === (index + 1).toString())
                                        .map((i, index) => (
                                            <div key={index} className={'text2'}>
                                                {i[1]}
                                                <EditIcon onClick={() => editLinks(i)} style={{ marginLeft: '20px' }} />
                                            </div>
                                        ))}
                                </div>
                                <div>
                                    {
                                        images && Object.entries(images).filter((image) =>

                                            image[0].split(' ')[1] === (index + 1).toString()).map((i, index) =>
                                            <div key={index} className={'addImage2'}>
                                                Картинка {i[1].name}
                                                <EditIcon onClick={() => editImages(i)}
                                                    // className={'editIcon'}
                                                          style={{ marginLeft: '20px' }}
                                                />
                                            </div>
                                        )
                                    }

                                </div>

                            </div>
                        )
                    }

                </div>
            </div>


            <div className={'addButtonContainer'}>

                <div className={'btn'}>
                    <button onClick={addText} className={'addButton2'}>Додати текст</button>
                    <button onClick={addImages} className={'addButton2'}>Додати фото</button>
                    <button onClick={addLink} className={'addButton2'}>Додати силку</button>
                </div>


                <button onClick={create} disabled={!disabledBtn}
                        className={!disabledBtn ? 'addButtonDisable' : 'addButton'}>Опублікувати
                </button>


            </div>
        </div>

    )
}
export default CreateCard;
