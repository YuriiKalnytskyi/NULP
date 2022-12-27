import arrow2 from "../../../images/Polygon.png";
import arrow from "../../../images/Polygon 4.png";
import { useTranslation } from "react-i18next";
import { useInput } from "../../../hooks/useInput";
import { useEffect, useState } from "react";

const AddAll = ({changeComponent}) => {
  const { t } = useTranslation();

  const [disabledAddAll, setDisabledAddAll]= useState(false)
  const [arrowFlag2, setArrowFlag2] = useState(false);
  const [country, setСountry] = useState({
    country: "Виберіть Країну"
  });

  const countryArr = [
    "USA",
    "Ukraine"
  ];

  const radioChange = (e) => {
    setСountry({ ...country, [e.target.name]: e.target.id });
    setArrowFlag2(false);
  };

  const days = useInput("", { isEmpty: true, minLength: 3 });

  const sendAddAll = async () => {
    console.log(days.value);
    console.log(country.country);
  }

  useEffect(()=>{
    if (!days.inputValid || country.country ==='Виберіть Країну'){
      setDisabledAddAll(false)
    }else {
      setDisabledAddAll(true)
    }
  },[days, country])

  return (
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

       <div className={"castomSelect2"}>
         <div className={"statusSignal"} onClick={() => {
           setArrowFlag2(!arrowFlag2);
         }}>
           {country.country}
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

       <button onClick={sendAddAll}
               disabled={!disabledAddAll}
               className={!disabledAddAll?"profileButtonWrapper":"profileButtonWrapperTwo"}> Надіслати
       </button>

       <button onClick={() => changeComponent("button")}
               className={"profileButtonWrapper"}>{t("changeBtn")}
       </button>

     </>
   )
}

export default AddAll
