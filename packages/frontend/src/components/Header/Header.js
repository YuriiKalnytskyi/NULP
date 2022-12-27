import "./Header.css";
import notifImg from "../../images/notifImg.png";
import userImg from "../../images/userImg.png";
import {Button, Popover} from "@material-ui/core";
import {useEffect, useState} from "react";
import {getAllNotification} from "../../services/services";
import ChangeLanguage from "../ChangeLanguage/ChangeLanguage";


const Header = ({ componentState, open, setOpen, setUpdateFlag, setComponentState }) => {
    const [menuAnchor, setMenuAnchor] = useState(false);





    return (
        <div className={"Header"}>
            <div className="headerTitle"
                 style={window.innerWidth < 980 ? { fontSize: "20px" } : { fontSize: "32px" }}>{componentState}</div>
            <div className={"headerContainer"} style={window.innerWidth < 980 ? {
                maxWidth: "400px",
                minWidth: "25%"
            } : { width: "30%" }}>

                <div style={{ position: "relative", marginRight: "75px" }}>
                  <ChangeLanguage setUpdateFlag={setUpdateFlag} setComponentState={setComponentState} />
                </div>


                <div className={"notifiContainer"}>
                    <Button
                        onClick={({ currentTarget }) => {
                            setMenuAnchor(currentTarget);
                        }}
                    >
                        <div
                          style={{ position: "relative" }}
                        >
                             <div className={"circle11"}/>
                            <img src={notifImg} alt={"notifImg"}/>
                        </div>

                    </Button>
                    <Popover
                        open={!!menuAnchor}
                        anchorEl={menuAnchor}
                        onClose={() => setMenuAnchor(null)}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                    >
                        <div className={"nitifiContent"}>
                          dldkdk
                        </div>
                    </Popover>
                </div>
                <div style={{ position: "relative", marginLeft: "75px" }} onClick={() => {
                    setOpen(!open)
                }}>
                    <img src={userImg} alt={"notifImg"}/>
                </div>
            </div>
        </div>
    );
};

export default Header
