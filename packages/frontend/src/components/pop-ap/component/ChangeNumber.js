import { useTranslation } from "react-i18next";
import { useInput } from "../../../hooks/useInput";
import { changeNumberServer } from "../../../services/userServise";


const ChangeNumber = ({setUpdateProfile,updateProfile, setSuccess, changeComponent }) => {
  const { t } = useTranslation();

  const accountNumber = useInput("", { isEmpty: true, minLength: 9, maxLength: 9 });


  const changeNumber = async () => {
    const changeNumberData = await changeNumberServer({ accountNumber: accountNumber.value });
    setUpdateProfile(!updateProfile);
    if (changeNumberData.accountNumber) {
      setSuccess((prev) => {
        prev.flag = true;
        prev.message = t("SuccessMessage");
        return { ...prev };
      });
      accountNumber.setInputValid();
    }
  };


  return(
    <>
      <div className={"inputChangeContainer"}>
        <input
          className="changeInput"
          placeholder={t("changeNumber")}
          name={"number"}
          value={accountNumber.value}
          inputMode="numeric"
          minLength="9"
          maxLength="9"
          size="9"
          onChange={(e) => {
            accountNumber.onChange(e);
          }}
          onBlur={(e) => accountNumber.onBlur(e)}
          style={
            accountNumber.isDirty && accountNumber.flag
              ? { border: "1px solid #FF0000" }
              : { border: "1px solid silver" }
          }
        />
      </div>

      <button
        disabled={!accountNumber.inputValid} onClick={
        changeNumber
      }
        className={!accountNumber.inputValid ? "profileButtonWrapper" : "profileButtonWrapperTwo"}
      >{t("changeBtn6")}
      </button>
      <button onClick={() => changeComponent("button")}
              className={"profileButtonWrapper"}>{t("changeBtn")}
      </button>
    </>
  )
}

export default ChangeNumber
