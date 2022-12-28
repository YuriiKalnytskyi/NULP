import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Main.css";
import io from "socket.io-client";
import Naw from "./Naw/Naw";
import Header from "./Header/Header";
import UserInfo from "./pop-ap/UserInfo";
import News from "./News/News";
import CreateNews from "./News/CreateNews";
import Teaching from "./Teaching/Teaching";
import CreateTeaching from "./Teaching/CreateTeaching";
import noise from "../images/noise.png";
import PreReloader from "./preLoader/PreReloader";
import { Context } from "../context/context";
import { useRequest } from "../hooks/useRequest";
import Naw2 from "./Naw/Naw2";

let socket = null;

const Main = () => {
  const auth = useContext(Context);

  const { t } = useTranslation();
  const [componentState, setComponentState] = useState(t("Home"));

  const [naw, setNaw] = useState(false);

  const [updateFlag, setUpdateFlag] = useState("");
  const [addNotificationFlag, setAddNotificationFlag] = useState("");

  const [openTeaching, setOpenTeaching] = useState(false)





  const [openUserInfo, setOpenUserInfo] = useState(false);


  const [loader, setLoader] = useState(false);

  console.log(process.env.REACT_APP_API_URL)

  useEffect(() => {


    socket = io(process.env.REACT_APP_API_URL, {
      transports: ['websocket', 'polling'], // use WebSocket first, if available
    });


    socket.on("connect", () => console.log(`Client connected: ${socket.id}`));

    socket.on("connection", (data) => {
      setTimeout(() => {
        setUpdateFlag(data.user);
      }, 1500);
    });

  }, []);



  if (loader) {
    return <PreReloader />;
  }


  return (
    <div className="Main">
      {
        openUserInfo && <UserInfo open={openUserInfo} setOpen={setOpenUserInfo} socket={socket} />
      }

      <div className={"ellipseContainerMain"}>
        <div className={"ellipse1Main"} />
        <img src={noise} alt={"noise"} className={"noiseMain"} />
      </div>

      <div className={"a"}>

        {
          window.innerWidth > 600 && <div className={naw ? "nawBar2" : "nawBar"}>
            <Naw naw={naw} setNaw={setNaw} componentState={componentState}
                 setComponentState={setComponentState} />
          </div>
        }




        <div className={naw ? "container2" : "container"}>

          <div className="header">
            <Header componentState={componentState}
                    open={openUserInfo} setOpen={setOpenUserInfo}
                    addNotificationFlag={addNotificationFlag}
                    setUpdateFlag={setUpdateFlag}
                    setComponentState={setComponentState}
            />
          </div>





          <div className={window.innerWidth > 600 ? "infoContainer": "infoContainer2"}>
            <div className={"homeContainer"}>

              {/*{*/}
              {/*  componentState === t("News") && <div style={{height: '100%'}}>*/}
              {/*    {!openNews && <News allNews={allNews}*/}
              {/*                        setOpen={setOpenNews}*/}
              {/*                        socket={socket}*/}
              {/*    />}*/}
              {/*    {*/}
              {/*      openNews && <CreateNews open={openNews} setOpen={setOpenNews} socket={socket} />*/}
              {/*    }*/}

              {/*  </div>*/}
              {/*}*/}
              {
                componentState === t("Teaching") && <div style={{height: '100%'}}>
                  {!openTeaching && <Teaching
                    allTeaching={[]}
                    setOpen={setOpenTeaching}
                    socket={socket}

                  />}
                  {
                    openTeaching &&
                    <CreateTeaching open={openTeaching} setOpen={setOpenTeaching} socket={socket} />
                  }
                </div>
              }


            </div>
          </div>

          {
            window.innerWidth < 600 && <div className={'nawBar3'}>
              <Naw2 componentState={componentState}
                    setComponentState={setComponentState}/>
            </div>

          }



        </div>
      </div>
    </div>
  );
};

export default Main;
