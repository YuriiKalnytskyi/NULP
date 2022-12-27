import "./AuthStail.css";
import logo from "../../images/logo_new.png";
import noise from "../../images/noise.png";
import {Link, Redirect} from "react-router-dom";
import {useTranslation} from "react-i18next";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React, {useEffect, useState} from "react";
import {useInput} from "../../hooks/useInput";
import PaymentPage2 from "../pop-ap/PaymentPage2";

import {registerServer} from "../../services/authServise";
import ReCAPTCHA from "react-google-recaptcha";
import ChangeLanguage from "../ChangeLanguage/ChangeLanguage";


const Registration = () => {
    const { t } = useTranslation();

    const [captcha, setCaptcha] = useState(false);
    const [error, setError] = useState({ flag: false, message: "", input: "" });
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [success, setSuccess] = useState({ flag: false, paymentUrl: "" });
    const [checked, setChecked] = useState(false);
    const [pass, setPass] = useState(false);
    const [pass1, setPass1] = useState(false);

    const [test, setTest] = useState(false)


    const name = useInput("", { isEmpty: true, minLength: 3 });
    const lastName = useInput("", { isEmpty: true, minLength: 3 });
    const email = useInput("", { isEmpty: true, minLength: 3, emailValid: true });
    const password = useInput("", { isEmpty: true, minLength: 3 });
    const repeatPassword = useInput("", { isEmpty: true, minLength: 3 });
    const isCoincidencePassword =
        password.value.toString().trim() === repeatPassword.value.toString().trim();

    const changeHandler = (e) => {
        if (e.target.name === "email") {
            setError((prev) => {
                prev.flag = false;
                prev.message = "";
                return { ...prev };
            });
        }
    };

    const registerHandler = async () => {
        repeatPassword.setInputValid()
        const registerData = await registerServer({
            firstName: name.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            repeatPassword: repeatPassword.value,
            country: 'Ukraine'
        });

        if (registerData.flag) {
            setTest(true)
        }

        if (registerData?.paymentUrl) {
            setSuccess((prev) => {
                prev.flag = true;
                prev.paymentUrl = registerData?.paymentUrl;
                return { ...prev };
            });
        }
        if (!registerData?.success) {
            if (registerData?.errorCode === 120)
                setError((prev) => {
                    prev.flag = true;
                    prev.message = t("Email_is_exist");
                    return { ...prev };
                });
        }
    };

    useEffect(() => {
        if (
            !name.inputValid ||
            !lastName.inputValid ||
            !email.inputValid ||
            !password.inputValid ||
            !repeatPassword.inputValid ||
            !isCoincidencePassword ||
            !checked ||
            !captcha
        ) {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(true);
        }
    }, [
        name, lastName, email, password, repeatPassword, isCoincidencePassword, checked, captcha
    ]);

    const inputDiv = [
        { name: "firstName", nameHandler: name, placeholder: "Name" },
        { name: "lastName", nameHandler: lastName, placeholder: "LastName" },
        { name: "email", nameHandler: email, placeholder: "Email" }
    ];
    const inputDiv2 = [
        { name: "password", nameHandler: password, placeholder: "Password", state: pass, setState: setPass },
        {
            name: "repeatPassword",
            nameHandler: repeatPassword,
            placeholder: "Repeat_password",
            state: pass1,
            setState: setPass1
        }
    ];




    function onChange(value) {
        if (value.length !== 0) {
            setCaptcha(true)
        } else {
            setCaptcha(false)
        }
    }

    return (
        <div className={"rootAuth"}>
            {
                test && <Redirect to={'/login'}/>
            }

            {success.flag && <PaymentPage2 open={success} setOpen={setSuccess} paymentUrl={success.paymentUrl}/>}
            <div className={"changeLanguage"}>
              <ChangeLanguage />
            </div>

            <div className={"ellipseContainer"}>
                <div className={"ellipse1"}/>
                <img src={noise} alt={"noise"} className={"noise"}/>
            </div>

            <div className={"authInfoContainer"}>
                <div className={"logoContainer"}>
                    <img className={"ingLogo"} src={logo} alt={"logo"}/>
                </div>

                <div className={"formContainer"}>
                    <div className={"formBig"}>

                        <div className={"boxContainer2"}>
                            <div className={"forgotTitle"}>{t("Create_account")}</div>
                            {
                                inputDiv.map(({ name, nameHandler, placeholder }, index) =>
                                    <div key={index} className={"inputContainer"}>
                                        <input
                                            className={"inputStail"}
                                            name={name}
                                            type="text"
                                            style={
                                                nameHandler.isDirty && name.flag
                                                    ? { border: "1px solid #FF0000" }
                                                    : { border: "1px solid silver" }
                                            }
                                            placeholder={t(placeholder)}
                                            value={name.value}
                                            onChange={(e) => {
                                                changeHandler(e);
                                                nameHandler.onChange(e);
                                            }}
                                            onBlur={(e) => nameHandler.onBlur(e)}
                                        />
                                        {name === "email" && email.isDirty && email.flag &&
                                        email.message === "Некоректна email" && (
                                            <div className={"inputError"}>{t("EmailError")}</div>
                                        )}
                                        {name === "email" && error.flag && (
                                            <div className={"inputError"}>{error.message}</div>
                                        )}
                                    </div>
                                )
                            }
                            {
                                inputDiv2.map(({ name, nameHandler, placeholder, state, setState }, index) =>
                                    <div className={"inputContainer"}>
                                        <div key={index}
                                             style={{
                                                 width: "100%",
                                                 height: "40px",
                                                 position: "relative",
                                                 display: "flex",
                                                 justifyContent: "center"
                                             }}
                                        >
                                            <input
                                                className={"inputStail"}
                                                name={name}
                                                style={
                                                    nameHandler.isDirty && nameHandler.flag || !isCoincidencePassword
                                                        ? {
                                                            border: "1px solid #FF0000"
                                                        }
                                                        : { border: "1px solid silver" }
                                                }
                                                type={state ? "text" : "password"}
                                                placeholder={t(placeholder)}
                                                value={nameHandler.value}
                                                onChange={(e) => {
                                                    changeHandler(e);
                                                    nameHandler.onChange(e);
                                                }}
                                                onBlur={(e) => nameHandler.onBlur(e)}
                                            />
                                            <div className={"forgotIcon2"}>
                                                {state ? (
                                                    <VisibilityIcon
                                                        style={{ color: "black" }}
                                                        onClick={() => {
                                                            setState(!state);
                                                        }}
                                                    />
                                                ) : (
                                                    <VisibilityOffIcon
                                                        style={{ color: "black" }}
                                                        onClick={() => {
                                                            setState(!state);
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        {name === "repeatPassword" && repeatPassword.isDirty &&
                                        !isCoincidencePassword &&
                                        !repeatPassword.flag && (
                                            <div className={"inputError"}>{t("Password_invalid2")}</div>
                                        )}
                                        {name === "repeatPassword" && error.flag && error.input === "repeatPassword" && (
                                            <div className={"inputError"}>{error.message}</div>
                                        )}
                                    </div>)
                            }

                            <div className="recaptcha">
                                <ReCAPTCHA
                                    data-size="compact"
                                    sitekey="6LefFw0hAAAAAIobjE823nYW5WpU5yQM8zct9EFI"
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div className={"buttonContainer"}>
                            <div className={"buttonInfo"}>
                                <button
                                    disabled={!disabledBtn}
                                    onClick={registerHandler}
                                    className={!disabledBtn ? "btnDisabled" : "btnBlack"}
                                >
                                    {t("Create_account")}
                                </button>
                                <div className={"btnText"}>
                      <span style={{ marginTop: "17px" }}>
                          <Link
                              style={{
                                  color: "red",
                                  textDecoration: "none"
                              }}
                              to={"/login"}
                          >
                          {t("Log_in")}
                        </Link>
                      </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
