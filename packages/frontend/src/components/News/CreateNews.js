import './News.css';
import CloseIcon from '@material-ui/icons/Close';
import { useInput } from "../../hooks/useInput";
import { alpha } from "@material-ui/core";
import { addNewsServer } from "../../services/adminServise";

const CreateNews = ({ open, setOpen, socket }) => {

  const title = useInput('', {
    isEmpty: true,
    minLength: 3,
  });
  const text = useInput('', {
    isEmpty: true,
    minLength: 3,
  });



  const createNews = async () => {
    await addNewsServer({
      "title": title.value,
      "text": text.value,
      "date": new Date()
    })
    socket.emit("news");
    setOpen(false)
  }


  return (
    <div className={'createNewsContainer'}>
      <CloseIcon color={'error'} className={'closeNews'} onClick={() => {
        setOpen(false);
      }} />
      <div className={'addNewsInputTitle'}>
        <input className={'newsInputTitle'}
               type='text'
               placeholder={'Назва'}
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

      <div className={'newsTextArea'}>
        <textarea
          className={'newsTextAreaWrapper'}
          placeholder={'Текст'} name='' id='' cols='20' rows='20'
          style={
            text.isDirty && text.flag
              ? {
                border: '1px solid #FF0000',
              }
              : { border: '1px solid silver' }
          }
          value={text.value}
          onChange={(e) => {

            text.onChange(e);
          }}
          onBlur={(e) => text.onBlur(e)}
        />
      </div>
      <div className={'addNewsButtonContainer'}>
        <button onClick={createNews} className={'addNewsButton'}>Опублікувати</button>
        <button className={'addNewsButton'}>Запланувати</button>
      </div>
    </div>

  );
};

export default CreateNews;
