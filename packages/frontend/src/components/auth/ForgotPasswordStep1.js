import './AuthStail.css';
import logo from '../../images/logo_new.png';
import lock from '../../images/Lock.png';
import { Link } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import { useState } from 'react';
import noise from '../../images/noise.png';
import { useTranslation } from 'react-i18next';
import { forgotPasswordStep1Server } from '../../services/authServise';
import ChangeLanguage from '../ChangeLanguage/ChangeLanguage';

const ForgotPasswordStep1 = () => {
  const { t } = useTranslation();

  const email = useInput('', {
    isEmpty: true,
    minLength: 3,
    emailValid: true
  });
  const [data, setData] = useState();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const forgotPassword = async () => {
    localStorage.setItem('forgotEmail', data.email);
    await forgotPasswordStep1Server(data.email);
  };

  return (
    <div className={'rootAuth'}>
      <div className={'changeLanguage'}>
        <ChangeLanguage />
      </div>

      <div className={'ellipseContainer'}>
        <div className={'ellipse1'} />
        <img src={noise} alt={'noise'} className={'noise'} />
      </div>

      <div className={'authInfoContainer'}>
        <div className={'logoContainer'}>
          <img className={'ingLogo'} src={logo} alt={'logo'} />
        </div>
        <div className={'formContainer'}>
          <div className={'formBig'}>
            <div className={'lockContainer'}>
              <img src={lock} alt={'lock'} />
            </div>

            <div className={'boxContainer'}>
              <div className={'forgotContainerText'}>
                <div className={'forgotTitle'}>{t('Text_forgot_password5')}</div>
                <div className={'forgotText'}>{t('Text_forgot_password4')}</div>
              </div>

              <div className={'forgotContainerInput'} style={{ justifyContent: 'center' }}>
                {email.isDirty && email.flag && <div className={'inputError'}>{email.message}</div>}

                <input
                  className={'inputForgot1'}
                  type="text"
                  value={email.value}
                  onChange={(e) => {
                    changeHandler(e);
                    email.onChange(e);
                  }}
                  onBlur={(e) => email.onBlur(e)}
                  name="email"
                  placeholder={t('Email')}
                />
              </div>
            </div>

            <div className={'buttonContainer'} style={{ marginTop: '-20px' }}>
              <div className={'buttonInfo'}>
                <Link className={'linc'} to={'/password-forgot-step-2'}>
                  <button
                    onClick={forgotPassword}
                    disabled={!email.inputValid}
                    style={{ marginTop: '5px' }}
                    className={!email.inputValid ? 'btnDisabled' : 'btnBlack'}
                  >
                    {t('Text_forgot_password3')}
                  </button>
                </Link>

                <Link className={'linc'} to={'/'}>
                  <button style={{ marginTop: '7px' }} className={'btnOrange'}>
                    {t('changeBtn')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordStep1;
