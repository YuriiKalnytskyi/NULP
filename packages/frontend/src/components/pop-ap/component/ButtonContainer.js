import { useTranslation } from "react-i18next";

const ButtonContainer = ({changeComponent}) => {
  const { t } = useTranslation();
  const role = localStorage.getItem("role");

  return (
    <>
      <button onClick={() => changeComponent("changePassword")}
              className={"profileButtonWrapper"}>{t("changeBtn3")}
      </button>
      <button
        onClick={() => {
          role === "admin" ? changeComponent("notification") :
          changeComponent("changeEmail");
        }}
        className={"profileButtonWrapper"}>
        {
          role === "admin" ? "Надіслати сповішення" :
          t("changeBtn2")
        }
      </button>
      <button
        onClick={() => {
          role === "admin" ? changeComponent("addAll") :
            changeComponent("changeNumber");
        }}
        className={"profileButtonWrapper"}>
        {
          role === "admin" ? "Продовження Підписки Багатьом" :
            t("changeBtn4")
        }
      </button>
      <button
        onClick={() => {
          role === "admin" ? changeComponent("addOne") :
            changeComponent("change");
        }}
        className={role === "admin" ? "profileButtonWrapper" : "profileButtonWrapperTwo"}>
        {
          role === "admin" ? "Продовження Підписки Одному" :
          t("changeBtn5")
        }
      </button>
    </>
  )
}

export default ButtonContainer
