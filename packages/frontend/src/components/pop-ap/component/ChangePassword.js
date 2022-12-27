import { useInput } from "../../../hooks/useInput";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import '../PopApStail.css'
import { changePasswordServer } from "../../../services/userServise";

const ChangePassword = ({changeComponent ,setUpdateProfile, updateProfile, setSuccess}) => {
  const { t } = useTranslation();

  const [error, setError] = useState({ flag: false, message: "", input: "" });

  const [disabledChangePassword, setDisabledChangePassword] = useState(false);

  const oldPassword = useInput("", { isEmpty: true, minLength: 3 });
  const netPassword = useInput("", { isEmpty: true, minLength: 3 });
  const repeatPassword = useInput("", { isEmpty: true, minLength: 3 });
  const isCoincidencePassword = netPassword.value.toString().trim() === repeatPassword.value.toString().trim();

  const changePasswordDiv = [
    { name: "ChangePassword1", nameHandler: oldPassword, nameInput: "oldPassword" },
    { name: "ChangePassword2", nameHandler: netPassword, nameInput: "netPassword" },
    { name: "ChangePassword3", nameHandler: repeatPassword, nameInput: "repeatPassword" }
  ];

  const changeHandler = (e) => {
    if (e.target.name === "oldPassword" || e.target.name === "password" || e.target.name === "password2") {
      setError((prev) => {
        prev.flag = false;
        prev.message = "";
        prev.input = "";
        return { ...prev };
      });
    }
  };

  const changePassword = async () => {
    const changePasswordData = await changePasswordServer({
      "oldPassword": oldPassword.value,
      "newPassword": netPassword.value,
      "repeatNewPassword": repeatPassword.value
    });

    if (changePasswordData.errorCode === 170) {
      setError((prev) => {
        prev.flag = true;
        prev.message = t("Password_invalid");
        prev.input = "oldPassword";
        return { ...prev };
      });
    } else {
      setUpdateProfile(!updateProfile);
      setSuccess((prev) => {
        prev.flag = true;
        prev.message = t("SuccessMessage3");
        return { ...prev };
      });
      oldPassword.setInputValid();
      netPassword.setInputValid();
      repeatPassword.setInputValid();
    }
  };

  useEffect(() => {
    if (
      !oldPassword.inputValid ||
      !netPassword.inputValid ||
      !repeatPassword.inputValid ||
      !isCoincidencePassword
    ) {
      setDisabledChangePassword(false);
    } else {
      setDisabledChangePassword(true);
    }
  }, [isCoincidencePassword, oldPassword, netPassword, repeatPassword]);

  return(
    <>
      {
        changePasswordDiv && changePasswordDiv.map((value, index) =>
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
              error?.flag && value.nameInput === error?.input &&
              <div className={"inputError3"}>{error?.message}</div>
            }
            {value.nameInput === "repeatPassword" && repeatPassword.isDirty && !isCoincidencePassword && !repeatPassword.flag && (
              <div className={"inputError3"}>{t("Password_invalid2")}</div>
            )
            }
          </div>
        )
      }
      <button disabled={!disabledChangePassword} onClick={
        changePassword
      }
              className={!disabledChangePassword ? "profileButtonWrapper" : "profileButtonWrapperTwo"}
      >{t("changeBtn3")}
      </button>

      <button
        onClick={() => changeComponent("button")}
              className={"profileButtonWrapper"}>{t("changeBtn")}
      </button>
    </>
  )
}

export default ChangePassword
