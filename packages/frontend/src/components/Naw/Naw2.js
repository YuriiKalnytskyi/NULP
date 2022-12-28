import React, { useContext } from "react";
import './Naw.css'
import {useTranslation} from "react-i18next";
import NawComponent from "./NawComponent";
import {logoutServer} from "../../services/authServise";
import newsImg from "../../images/newsImg.png";
import teachingImd from "../../images/teachingImd.png";
import helpImd from '../../images/helpImg.png';
import logautImg from '../../images/logaut.png';
import { Context } from "../../context/context";



const Naw2 = ({ componentState, setComponentState }) => {

    const { t } = useTranslation();
    const auth = useContext(Context);


    const logoutHandler = async () => {
        auth.logout();
        await logoutServer()
    };
    const handler = (item) => {
        setComponentState(item)
    };



    const component = [
        { name: t("News"), img: newsImg },
        { name: t("Teaching"), img: teachingImd }
    ]

    return (
        <div className={'NawContainer2'}>


            {
                component.map((i) =>
                    <div onClick={()=> handler(i.name)}><NawComponent ing={i.img} text={i.name} state={componentState}/></div>
                )
            }
            <div>
                <a  style={{textDecoration: "none"}} href={'https://t.me/ukrtrader_manager'} target={'_blanka'}>
                    <NawComponent ing={helpImd} state={componentState} text={t("Help")}/>
                </a>
            </div>
            <div onClick={logoutHandler}>
                <NawComponent ing={logautImg} state={componentState} text={t("GoOut")}/>
            </div>


        </div>
    )
}
export default Naw2;
