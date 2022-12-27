import './AuthStail.css';
import logo from '../../images/logo_new.png';
import lock from '../../images/Lock.png';
import { Link, Redirect } from "react-router-dom";
import { useState } from 'react';
import noise from '../../images/noise.png';
import ChangeLanguage from '../ChangeLanguage/ChangeLanguage';
import { useTranslation } from "react-i18next";
import { forgotPasswordStep2Server } from "../../services/authServise";

const ForgotPasswordStep2 = () => {
  const { t } = useTranslation();

  const [data, setData] = useState({ code: '' });
  const [error, setError] = useState({flag: false, message: ''})
  const [success, setSuccess] = useState(false);


  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const forgotPassword = async (e) => {
    const  forgotPasswordData  = await forgotPasswordStep2Server(data.code);

    if (forgotPasswordData.errorCode === 160) {
      setError((prev) => {
        prev.flag = true;
        prev.message = t("Text_forgot_password8");
        return { ...prev };
      });
    }else {
      setSuccess(true)
    }
  };

  return (
    <div className={'rootAuth'}>

      {
        success && <Redirect to={'/password-forgot-step-3'} />
      }
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
                <div className={'forgotTitle'}>{t("Text_forgot_password6")}</div>
                <div className={'forgotText'}>
                  {t('Text_forgot_password7')}
                </div>
              </div>

              <div
                className={'forgotContainerInput'}
                style={{ justifyContent: 'center' }}
              >
                <div className={'forgotContainerInputStep2'}>
                  <input
                    className={'inputForgot2'}
                    type="text"
                    name="code"
                    inputMode="numeric"
                    minLength="4"
                    maxLength="4"
                    size="4"
                    onChange={changeHandler}
                  />
                  {error.flag  && (
                    <div className={'inputError2'}>{error.message}</div>
                  )}
                </div>

              </div>
            </div>
            <div className={'buttonContainer'} style={{ marginTop: '-20px' }}>
              <div className={'buttonInfo'}>
                  <button
                    onClick={forgotPassword}
                    disabled={data.code.length <= 3}
                    style={{ marginTop: '5px' }}
                    className={
                      data.code.length <= 3 ? 'btnDisabled' : 'btnBlack'
                    }
                  >
                    {t("Text_forgot_password3")}
                  </button>

                <Link className={'linc'} to={'/login'}>
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

export default ForgotPasswordStep2;
