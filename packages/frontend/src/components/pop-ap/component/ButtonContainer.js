import { useTranslation } from 'react-i18next';

const ButtonContainer = ({ changeComponent }) => {
  const { t } = useTranslation();
  const role = localStorage.getItem('role');

  return (
    <>
      <button onClick={() => changeComponent('changePassword')} className={'profileButtonWrapper'}>
        {t('changeBtn3')}
      </button>

      {role === 'ADMIN' && (
        <button
          onClick={() => {
            changeComponent('notification');
          }}
          className={'profileButtonWrapper'}
        >
          Надіслати сповішення
        </button>
      )}
    </>
  );
};

export default ButtonContainer;
