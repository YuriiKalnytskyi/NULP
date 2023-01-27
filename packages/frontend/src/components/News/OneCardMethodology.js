import React from 'react'
import './Methodology.css'
import {useTranslation} from "react-i18next";

const OneCardMethodology  = ({methodology, redHomeMethodologyHandler}) => {
    const { t } = useTranslation();

    return (
      <div  className={"methodologyWrapper"}>

          <div className={"methodologyTime"}>{methodology.title}
          </div>
          <div className={"methodologyTitle"}>{methodology?.description?.text[0]}</div>
          {/*<div className={"methodologyInfo"}></div>*/}
          <div className={"methodologyButton"}>
              <button onClick={() => {
                  redHomeMethodologyHandler(methodology);
              }} className={"readMethodologyButton"}>{t('Text')}
              </button>

          </div>
      </div>
  )
}
export default OneCardMethodology  ;
