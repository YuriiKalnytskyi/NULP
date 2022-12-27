import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useInput } from "../../../hooks/useInput";
import { changeEmailServer } from "../../../services/userServise";


const ChangeEmail = ({changeComponent, setUpdateProfile,updateProfile, setSuccess}) => {
  const { t } = useTranslation();

  const [error, setError] = useState({ flag: false, message: "", input: "" });

  const [disabledChangeEmail, setDisabledChangeEmail] = useState(false);

  const email = useInput("", { isEmpty: true, minLength: 3, emailValid: true });
  const password = useInput("", { isEmpty: true, minLength: 3 });

  const changeHandler = (e) => {
    if (e.target.name === "password") {
      setError((prev) => {
        prev.flag = false;
        prev.message = "";
        prev.input = "";
        return { ...prev };
      });
    }
  };

  const changeEmail = async () => {
    const changeEmailData = await changeEmailServer({
      "password": password.value,
      "email": email.value
    });

    if (changeEmailData.errorCode === 170) {
      setError((prev) => {
        prev.flag = true;
        prev.message = t("Password_invalid");
        prev.input = "password";
        return { ...prev };
      });
    } else {
      setUpdateProfile(!updateProfile);
      setSuccess((prev) => {
        prev.flag = true;
        prev.message = t("SuccessMessage2");
        return { ...prev };
      });
      password.setInputValid();
      email.setInputValid();
    }
  };

  const changeEmailDiv = [
    { name: "ChangeEmail1", nameHandler: password, nameInput: "password" },
    { name: "ChangeEmail2", nameHandler: email, nameInput: "email" }
  ];

  useEffect(() => {
    if (
      !email.inputValid ||
      !password.inputValid) {
      setDisabledChangeEmail(false);
    } else {
      setDisabledChangeEmail(true);
    }
  }, [email, password]);
  return(
    <>
      {
        changeEmailDiv && changeEmailDiv.map((value, index) =>
          <div key={index} className={"inputChangeContainer"}>
            <input
              className="changeInput"
              placeholder={t(value.name)}
              name={value.nameInput}
              value={value.nameHandler.value}
              onChange={(e) => {
                value.nameHandler.onChange(e);
                changeHandler(e)
              }}
              onBlur={(e) => value.nameHandler.onBlur(e)}
              style={
                value.nameHandler.isDirty && value.nameHandler.flag
                  ? { border: "1px solid #FF0000" }
                  : { border: "1px solid silver" }
              }
            />
            {
              error.flag && value.nameInput === error.input &&
              <div className={"inputError3"}>{error.message}</div>
            }
          </div>
        )
      }
      <button
        disabled={!disabledChangeEmail} onClick={
        changeEmail
      }
        className={!disabledChangeEmail ? "profileButtonWrapper" : "profileButtonWrapperTwo"}
      >{t("changeBtn2")}
      </button>
      <button onClick={() => changeComponent("button")}
              className={"profileButtonWrapper"}>{t("changeBtn")}
      </button>
    </>
  )
}

export default ChangeEmail
