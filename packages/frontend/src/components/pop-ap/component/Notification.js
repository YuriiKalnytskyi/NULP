import { useInput } from '../../../hooks/useInput';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { addNotificationServer } from '../../../services/adminServise';

const Notification = ({ changeComponent, socket, setSuccess }) => {
  const { t } = useTranslation();

  const [disabledSendNotifi, setDisabledSendNotifi] = useState(false);

  const textarea = useInput('', { isEmpty: true, minLength: 3 });

  const sendNotification = async () => {
    const sendNotificationData = await addNotificationServer({
      description: textarea.value
    });
    socket.emit('addData');

    if (sendNotificationData.signal) {
      setSuccess((prev) => {
        prev.flag = true;
        prev.message = 'Сповіщення успішно надіслано';
        return { ...prev };
      });
      textarea.setInputValid();
    }
  };

  useEffect(() => {
    if (!textarea.inputValid) {
      setDisabledSendNotifi(false);
    } else {
      setDisabledSendNotifi(true);
    }
  }, [textarea]);

  return (
    <>
      <textarea
        className={'textarea'}
        placeholder={'Текст'}
        name=""
        id=""
        cols="20"
        rows="20"
        value={textarea.value}
        onChange={(e) => {
          textarea.onChange(e);
        }}
        onBlur={(e) => textarea.onBlur(e)}
        style={
          textarea.isDirty && textarea.flag
            ? { border: '1px solid #FF0000' }
            : { border: '1px solid silver' }
        }
      />


      <button
        onClick={sendNotification}
        disabled={!disabledSendNotifi}
        className={!disabledSendNotifi ? 'profileButtonWrapper' : 'profileButtonWrapperTwo'}
      >
        {' '}
        Надіслати
      </button>

      <button onClick={() => changeComponent('button')} className={'profileButtonWrapper'}>
        {t('changeBtn')}
      </button>
    </>
  );
};

export default Notification;
