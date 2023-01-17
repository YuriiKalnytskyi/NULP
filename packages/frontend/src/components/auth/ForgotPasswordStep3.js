import './AuthStail.css';
import logo from '../../images/logo_new.png';
import lock from '../../images/Lock.png';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useEffect, useState } from 'react';
import { useInput } from '../../hooks/useInput';
import noise from '../../images/noise.png';
import { forgotPasswordStep3Server } from '../../services/authServise';
import { useTranslation } from 'react-i18next';

const ForgotPasswordStep3 = () => {
  const { t } = useTranslation();

  const [pass, setPass] = useState(false);
  const [pass1, setPass1] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const [data, setData] = useState({
    password: '',
    repeatPassword: ''
  });

  const password = useInput('', {
    isEmpty: true,
    minLength: 3,
    maxLength: 8
  });
  const repeatPassword = useInput('', {
    isEmpty: true,
    minLength: 3,
    maxLength: 8
  });

  const isCoincidencePassword =
    password.value.toString().trim() === repeatPassword.value.toString().trim();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const forgotPassword = async () => {
    const email = localStorage.getItem('forgotEmail');
    localStorage.removeItem('forgotEmail');
    await forgotPasswordStep3Server({
      email,
      password: data.password,
      repeatPassword: data.repeatPassword
    });
  };

  useEffect(() => {
    if (!password.inputValid || !repeatPassword.inputValid || !isCoincidencePassword) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [password.inputValid, repeatPassword.inputValid, isCoincidencePassword]);

  return (
    <div className={'rootAuth'}>
      {/*<div className={'changeLanguage'}>*/}
      {/*  <ChangeLanguage />*/}
      {/*</div>*/}
      <div className={'ellipseContainer'}>
        <div className={'ellipse1'} />
        {/*<img src={frame} alt={'frame'} className={'frame'} />*/}
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
                <div className={'forgotTitle'}>{t('Text_forgot_password9')}</div>
              </div>

              <div className={'forgotContainerInput'}>
                {password.isDirty && password.flag && (
                  <div className={'inputError'}>{password.message}</div>
                )}
                <div
                  style={{
                    position: 'relative',
                    width: '90%',
                    display: 'flex',
                    marginBottom: '10px',
                    justifyContent: 'center'
                  }}
                >
                  <input
                    className={'inputForgot3'}
                    name="password"
                    type={pass ? 'text' : 'password'}
                    placeholder={t('Password')}
                    value={password.value}
                    onChange={(e) => {
                      changeHandler(e);
                      password.onChange(e);
                    }}
                    onBlur={(e) => password.onBlur(e)}
                  />
                  <div className={'forgotIcon'}>
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

                {repeatPassword.isDirty && repeatPassword.flag && (
                  <div className={'inputError'}>{repeatPassword.message}</div>
                )}

                {repeatPassword.isDirty && !isCoincidencePassword && !repeatPassword.flag && (
                  <div className={'inputError'}>Паролі не співпадають</div>
                )}
                <div
                  style={{
                    position: 'relative',
                    width: '90%',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <input
                    className={'inputForgot3'}
                    name="repeatPassword"
                    type={pass1 ? 'text' : 'password'}
                    placeholder={t('Repeat_password')}
                    value={repeatPassword.value}
                    onChange={(e) => {
                      changeHandler(e);
                      repeatPassword.onChange(e);
                    }}
                    onBlur={(e) => repeatPassword.onBlur(e)}
                  />
                  <div className={'forgotIcon'}>
                    {pass1 ? (
                      <VisibilityIcon
                        style={{ color: 'black' }}
                        onClick={() => {
                          setPass1(!pass1);
                        }}
                      />
                    ) : (
                      <VisibilityOffIcon
                        style={{ color: 'black' }}
                        onClick={() => {
                          setPass1(!pass1);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={'buttonContainer'} style={{ marginTop: '-12px' }}>
              <div className={'buttonInfo'}>
                <Link className={'linc'} to={'/login'}>
                  <button
                    onClick={forgotPassword}
                    disabled={!disabledBtn}
                    style={{ marginTop: '5px' }}
                    className={!disabledBtn ? 'btnDisabled' : 'btnBlack'}
                  >
                    {t('Text_forgot_password3')}
                  </button>
                </Link>

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

export default ForgotPasswordStep3;
