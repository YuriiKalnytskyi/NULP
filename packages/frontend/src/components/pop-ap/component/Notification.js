import arrow2 from "../../../images/Polygon.png";
import arrow from "../../../images/Polygon 4.png";
import { useInput } from "../../../hooks/useInput";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { addNotificationServer } from "../../../services/adminServise";


const Notification = ({ changeComponent, socket, setSuccess }) => {
  const { t } = useTranslation();

  const [disabledSendNotifi, setDisabledSendNotifi] = useState(false);
  const [arrowFlag2, setArrowFlag2] = useState(false);
  const [country, setСountry] = useState("Виберіть Країну");


  const countryArr = [
    'Ukraine',
    'France',
    'Spain',
    'Sweden',
    'Norway',
    'Germany',
    'Finland',
    'Poland',
    'Italy',
    'United Kingdom',
    'Romania',
    'Belarus',
    'Kazakhstan',
  ];

  const radioChange = (e) => {
    setСountry(e.target.id);
    setArrowFlag2(false);
  };

  const textarea = useInput("", { isEmpty: true, minLength: 3 });

  const sendNotification = async () => {
    const sendNotificationData = await addNotificationServer({
      "country": country,
      "description": textarea.value
    });
    socket.emit("notification");

    if (sendNotificationData.signal) {
      setSuccess((prev) => {
        prev.flag = true;
        prev.message = "Сповіщення успішно надіслано";
        return { ...prev };
      });
      textarea.setInputValid();
      setСountry("Виберіть Країну");
    }

  };

  useEffect(() => {
    if (!textarea.inputValid || country === "Виберіть Країну") {
      setDisabledSendNotifi(false);
    } else {
      setDisabledSendNotifi(true);
    }
  }, [textarea, country]);

  return (
    <>
       <textarea
         className={"textarea"}
         placeholder={"Текст"} name="" id="" cols="20" rows="20"
         value={textarea.value}
         onChange={(e) => {
           textarea.onChange(e);
         }}
         onBlur={(e) => textarea.onBlur(e)}
         style={
           textarea.isDirty && textarea.flag
             ? { border: "1px solid #FF0000" }
             : { border: "1px solid silver" }
         }
       />

      <div className={"castomSelect2"}>
        <div className={"statusSignal"} onClick={() => {
          setArrowFlag2(!arrowFlag2);
        }}>
          {country}
        </div>
        <img
          onClick={() => {
            setArrowFlag2(!arrowFlag2);
          }}
          className={"castomSelectArrow"}
          src={arrowFlag2 ? arrow2 : arrow}
          alt={"test"}
        />
        {arrowFlag2 && (
          <div className={"castomSelectInput2"}>
            <div className={"castomSelectBbox"}>
              <div className="optionsContainer active">
                {countryArr.map((value, index) => (
                  <div key={index} className="option">
                    <input
                      type="radio"
                      className="radio"
                      onChange={radioChange}
                      id={value}
                      name="country"
                    />
                    <label htmlFor={value}>{value}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>


      <button onClick={sendNotification}
              disabled={!disabledSendNotifi}
              className={!disabledSendNotifi ? "profileButtonWrapper" : "profileButtonWrapperTwo"}> Надіслати
      </button>

      <button onClick={() => changeComponent("button")}
              className={"profileButtonWrapper"}>{t("changeBtn")}
      </button>
    </>
  );
};

export default Notification;
