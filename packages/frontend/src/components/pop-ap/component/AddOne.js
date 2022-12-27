import { useTranslation } from "react-i18next";
import { useInput } from "../../../hooks/useInput";
import { useEffect, useState } from "react";
import { addOneServer } from "../../../services/adminServise";

const AddOne = ({changeComponent, setSuccess}) => {
  const { t } = useTranslation();

  const [disabledAddOne, setDisabledAddOne]= useState(false)

  const days = useInput("", { isEmpty: true});
  const email = useInput("", { isEmpty: true, minLength: 3, emailValid: true });

  const sendAddOne = async () => {
    const sendAddOneData =  await addOneServer({
      "daysCount": days.value,
      "email":email.value
    })

    if (!sendAddOneData?.success) {
      setSuccess((prev) => {
        prev.flag = true;
        prev.message = `щось пішло не так`;
        return { ...prev };
      });
      days.setInputValid()
      email.setInputValid()
      console.log(sendAddOneData);
    }
    if (sendAddOneData.signal) {
      setSuccess((prev) => {
        prev.flag = true;
        prev.message = `Успішно додали ${days.value} користувачу ${email.value} `;
        return { ...prev };
      });
      days.setInputValid()
      email.setInputValid()
    }

  }

  useEffect(()=>{
    if (!days.inputValid || !email.inputValid){
      setDisabledAddOne(false)
    }else {
      setDisabledAddOne(true)
    }
  },[days, email])

  return(
    <>
      <div className={"inputChangeContainer"}>
        <input
          className="changeInput"
          placeholder={'Кількість днів'}
          name={"days"}
          type={'number'}
          value={days.value}
          onChange={(e) => {
            days.onChange(e);
          }}
          onBlur={(e) => days.onBlur(e)}
          style={
            days.isDirty && days.flag
              ? { border: "1px solid #FF0000" }
              : { border: "1px solid silver" }
          }
        />
      </div>
      <div className={"inputChangeContainer"}>
        <input
          className="changeInput"
          placeholder={'email людини'}
          name={"email"}
          type={'text'}
          value={email.value}
          onChange={(e) => {
            email.onChange(e);
          }}
          onBlur={(e) => email.onBlur(e)}
          style={
            email.isDirty && email.flag
              ? { border: "1px solid #FF0000" }
              : { border: "1px solid silver" }
          }
        />
      </div>


      <button onClick={sendAddOne}
              disabled={!disabledAddOne}
              className={!disabledAddOne?"profileButtonWrapper":"profileButtonWrapperTwo"}> Надіслати
      </button>

      <button onClick={() => changeComponent("button")}
              className={"profileButtonWrapper"}>{t("changeBtn")}
      </button>

    </>
  )
}

export default AddOne
