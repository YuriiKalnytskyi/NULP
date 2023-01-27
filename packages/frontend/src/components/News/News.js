import React, {useState} from 'react'
import {useTranslation} from "react-i18next";
import './Methodology.css'
import OneCardMethodology from "./OneCardMethodology";
import RedCardMethodology from "./RedCardMethodology";
import AddMethodology from "./AddMethodology";

const News = ({ allNews, setOpen, socket }) => {

  // const role = localStorage.getItem("role");
  const role = 'admin';



  const [redMethodology, setRedMethodology] = useState({ flag: false, methodology: {} });

  const redHomeMethodologyHandler = (methodology) => {
    setRedMethodology((prev) => {
      prev.flag = true;
      prev.methodology = methodology;
      return { ...prev };
    });
  };

  const closeMethodology = () => {
    setRedMethodology((prev) => {
      prev.flag = false;
      prev.methodology = {};
      return { ...prev };
    });
  };


  return (
      <div className={"methodologyContainer"}>

        {redMethodology.flag && <RedCardMethodology
            methodology={redMethodology.methodology}
            closeMethodology={closeMethodology}
        />
        }
        {
          !redMethodology.flag ? <div
              className={window.innerWidth > 600 ? "methodologyContainerSkrol" : 'methodologyContainerSkrol3'}>
            {role === "admin" && window.innerWidth > 600 && <AddMethodology setOpen={setOpen}/>}
            {
              allNews && allNews.length ? allNews.map((methodology, index) =>
                  <OneCardMethodology
                      key={index}
                      methodology={methodology}
                      redHomeMethodologyHandler={redHomeMethodologyHandler}
                  />) : null
            }
          </div> : window.innerWidth > 600 &&
              <div
                  className={redMethodology.flag ? "methodologyContainerSkrol2" : "methodologyContainerSkrol" }>
                {role === "admin" && <AddMethodology setOpen={setOpen}/>}
                {
                  allNews.length &&  allNews.map((methodology, index) =>
                      <OneCardMethodology
                          key={index}
                          methodology={methodology}
                          redHomeMethodologyHandler={redHomeMethodologyHandler}
                      />)
                }
              </div>
        }


      </div>
  )
}
export default News;
