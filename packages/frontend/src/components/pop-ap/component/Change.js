import { useTranslation } from "react-i18next";
import { useInput } from "../../../hooks/useInput";
import { useState } from "react";
import { changeSubscriptionServer } from "../../../services/userServise";

const Change = ({changeComponent}) => {
  const { t } = useTranslation();

  const [error, setError] = useState({ flag: false, message: "", input: "" });


  const password = useInput("", { isEmpty: true, minLength: 3 });

  const changeSubscription = async () => {
    const changeSubscriptionData = await changeSubscriptionServer({ password });
    if (changeSubscriptionData.errorCode === 170) {
      setError((prev) => {
        prev.flag = true;
        prev.message = t("Password_invalid");
        prev.input = "password2";
        return { ...prev };
      });
    }
  };


  return (
    <>
      <div className={"inputChangeContainer"}>
        <input
          className="changeInput"
          placeholder={t("changeBtn7")}
          name={"password2"}
          value={password.value}
          onChange={(e) => {
            password.onChange(e);
          }}
          onBlur={(e) => password.onBlur(e)}
          style={
            password.isDirty && password.flag
              ? { border: "1px solid #FF0000" }
              : { border: "1px solid silver" }
          }
        />
        {
          error.flag && error.input === "password2" && <div className={"inputError3"}>{error.message}</div>
        }
      </div>

      <button
        disabled={!password.inputValid} onClick={
        changeSubscription
      }
        className={!password.inputValid ? "profileButtonWrapper" : "profileButtonWrapperTwo"}
      >{t("changeBtn5")}
      </button>

      <button onClick={() => changeComponent("button")}
              className={"profileButtonWrapper"}>{t("changeBtn")}
      </button>
    </>
  )
}

export default Change
