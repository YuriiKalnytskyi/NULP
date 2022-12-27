import "./Naw.css";
import logo from "../../images/logo_new.png";
import left from "../../images/arrow left.png";
import homeImg from "../../images/homeImg.png";
import signalImg from "../../images/signalImg.png";
import logautImg from '../../images/logaut.png';
import newsImg from '../../images/newsImg.png';
import teachingImd from '../../images/teachingImd.png';
import helpImd from '../../images/helpImg.png';
import NawComponent from "./NawComponent";
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {Context} from "../../context/context";
import {logoutServer} from "../../services/authServise";


const Naw = ({ naw, setNaw, componentState, setComponentState }) => {
    const { t } = useTranslation();
    const auth = useContext(Context);


    const logout = async () => {
        auth.logout();
        await logoutServer()
    };


    const component = [
        { name: t("Home"), img: homeImg },
        { name: t("Signals"), img: signalImg },
        { name: t("News"), img: newsImg },
        { name: t("Teaching"), img: teachingImd }
    ]

    return (
        <div className={"NawContainer"}>
            <div className={"line"}/>
            <div className="divLogo">
                <img src={logo} alt={"logo"}/>
            </div>


            <div className={"nawContainer"}>

                <div className={"componentContainer"}>
                    <div className={"line2"}/>

                    {
                        component.map((value, index) =>
                            <div className={'naw'}
                                 key={index}
                                 onClick={() => {
                                     setComponentState(value.name);
                                 }}>

                                <NawComponent
                                    ing={value.img}
                                    text={value.name}
                                    state={componentState}
                                    naw={naw}
                                />
                            </div>)
                    }

                </div>
                <div className={'componentContainer'}>
                    <div className={"line2"}/>


                    <a style={{ textDecoration: "none" }} href={'https://t.me/ukrtrader_manager'} target={'_blanka'}>
                        <div
                            className={'naw'}
                        >
                            <NawComponent
                                ing={helpImd}
                                text={t("Help")}
                                state={componentState}
                                naw={naw}
                            />
                        </div>
                    </a>

                </div>

                <div className={'componentContainer2'}>
                    <div className={"line2"}/>
                    <div
                        onClick={logout}
                        className={'naw'}
                    >
                        <NawComponent
                            ing={logautImg}
                            text={t("GoOut")}
                            state={componentState}
                            naw={naw}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Naw;
