import './AuthStail.css';
import logo from '../../images/logo_new.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import { useInput } from '../../hooks/useInput';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Context } from '../../context/context';
import noise from '../../images/noise.png';
import PaymentPage2 from "../pop-ap/PaymentPage2";
import { loginServer } from "../../services/authServise";
import ChangeLanguage from "../ChangeLanguage/ChangeLanguage";


const Login = () => {
  const { t } = useTranslation();
  const auth = useContext(Context);

  const [disabledBtn, setDisabledBtn] = useState(false);

  console.log(disabledBtn)
  const [error, setError] = useState({ flag: false, message: '', input: '' });
  const [paymentError, setPaymentError] = useState({ flag: false,  paymentUrl: '' });
  const [checked, setChecked] = useState(false);
  const [pass, setPass] = useState(false);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const email = useInput('', {
    isEmpty: true,
    minLength: 3,
    emailValid: true,
  });
  const password = useInput('', {
    isEmpty: true,
    minLength: 3,
  });

  const changeHandler = (e) => {
    setError((prev) => {
      prev.flag = false;
      prev.message = '';
      prev.input = '';
      return { ...prev };
    });
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();

    const loginData = await loginServer({
      email: data.email,
      password: data.password,
    });

    if (loginData?.access_token) {
      auth.login(loginData.access_token);
    }
    if (!loginData?.success) {
      switch (loginData?.errorCode) {
        case 121:
          setError((prev) => {
            prev.flag = true;
            prev.message = t('User_not_found');
            prev.input = 'email';
            return { ...prev };
          });
          break;
        case 130:
          setError((prev) => {
            prev.flag = true;
            prev.message = t('Password_invalid');
            prev.input = 'password';
            return { ...prev };
          });
          break;
        case 100:
          setError((prev) => {
            prev.flag = true;
            prev.message = t('User_not_found');
            prev.input = 'email';
            return { ...prev };
          });
          break;
        case 191:
          setPaymentError((prev) => {
            prev.flag = true;
            prev.paymentUrl = loginData?.message;
            return { ...prev };
          });
          break;
        default:
          setError((prev) => {
            prev.flag = false;
            prev.input = '';
            return { ...prev };
          });
          break;
      }
    }
  };



  useEffect(() => {
    if (!email.inputValid || !password.inputValid) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [email.inputValid, password.inputValid]);

  return (
    <div className={'rootAuth'}>
      {
        paymentError.flag  && <PaymentPage2 open={paymentError} setOpen={setPaymentError} paymentUrl={paymentError.paymentUrl}/>
      }

      <div className={'changeLanguage'}>
        <ChangeLanguage />
      </div>
      <div className={'ellipseContainer'}>
        <div className={'ellipse1'} />
        {/*<img src={frame} alt={'frame'} className={'frame'} />*/}
        <img src={noise} alt={'noise'} className={'noise'} />
      </div>

      <div className={'authInfoContainer'}>
        <div className={'logoContainer'}>
          <img className={'ingLogo'} src={logo} alt={'logo'} />
        </div>
        <div className={'formContainerSmall'}>
          <div className={'formSmall'}>
            <div className={'boxContainer3'}>
              <div className={'forgotTitle'}>
                {t('Log_in')}
              </div>

              <form action="">
                <div className={'inputContainer'}>
                  <input
                    className={'inputStail'}
                    style={
                      email.isDirty && email.flag
                        ? {
                            border: '1px solid #FF0000',
                          }
                        : { border: '1px solid silver' }
                    }
                    name="email"
                    type="text"
                    placeholder={t('Email')}
                    value={email.value}
                    onChange={(e) => {
                      changeHandler(e);
                      email.onChange(e);
                    }}
                    onBlur={(e) => email.onBlur(e)}
                  />
                  {email.isDirty &&
                    email.flag &&
                    email.message === 'Некоректна email' && (
                      <div className={'inputError'}>{email.message}</div>
                    )}
                  {error.flag && error.input === 'email' && (
                    <div className={'inputError'}>{error.message}</div>
                  )}
                </div>

                <div className={'inputContainer'}>
                  <div
                    style={{
                      width: '100%',
                      height: '40px',
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <input
                      className={'inputStail'}
                      name="password"
                      style={
                        password.isDirty && password.flag
                          ? {
                              border: '1px solid #FF0000',
                            }
                          : {
                              border: '1px solid silver',
                            }
                      }
                      type={pass ? 'text' : 'password'}
                      placeholder={t('Password')}
                      value={password.value}
                      onChange={(e) => {
                        changeHandler(e);
                        password.onChange(e);
                      }}
                      onBlur={(e) => password.onBlur(e)}
                    />
                    <div className={'forgotIcon2'}>
                      {pass ? (
                        <VisibilityIcon
                          style={{ color: 'black' }}
                          onClick={() => {
                            setPass(!pass);
                          }}
                        />
                      ) : (
                        <VisibilityOffIcon
                          style={{ color: 'black' }}
                          onClick={() => {
                            setPass(!pass);
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {error.flag && error.input === 'password' && (
                    <div className={'inputError'}>{error.message}</div>
                  )}
                </div>

              </form>
            </div>

            <div className={'buttonContainer2'}>
              <div className={'buttonInfo'}>
                <button
                  disabled={!disabledBtn}
                  onClick={login}
                  style={{ marginTop: '5px', height: '40px' }}
                  className={!disabledBtn ? 'btnDisabled' : 'btnBlack'}
                >
                  {t('Log_in')}
                </button>
                <div className={'btnText'}>
                  <span>
                    {t('Text_forgot_password1')}?{' '}
                    <Link
                      style={{
                        color: 'red',
                        textDecoration: 'none',
                      }}
                      to={'/password-forgot-step-1'}
                    >
                      {t('Text_forgot_password2')}
                    </Link>
                  </span>
                </div>

                <Link to={'/'}>
                  <button
                    style={{
                      marginTop: '15px',
                      height: '40px',
                    }}
                    className={'btnOrange'}
                  >
                    {t('Create_account')}
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

export default Login;
