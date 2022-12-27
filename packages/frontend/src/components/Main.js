import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Main.css";
import { getAllNewsServer, getAllSignalServer, getAllTeachingServer } from "../services/services";
import io from "socket.io-client";
import Naw from "./Naw/Naw";
import Header from "./Header/Header";
import UserInfo from "./pop-ap/UserInfo";
import Signal from "./signalComponent/Signal";
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
  const [addTeachingFlag, setAddTeachingFlag] = useState("");
  const [addNewsFlag, setAddNewsFlag] = useState("");

  const [allSignal, setAllSignal] = useState([]);
  const limit = 50;
  const parentRef = useRef();
  const childRef = useRef();


  const [allNews, setAllNews] = useState([]);
  const [allTeaching, setAllTeaching] = useState([]);


  const [openUserInfo, setOpenUserInfo] = useState(false);
  const [openNews, setOpenNews] = useState(false);
  const [openTeaching, setOpenTeaching] = useState(false);


  const [loader, setLoader] = useState(false);


  const getSignal = async () => {
    const data = await getAllSignalServer(1, limit);
    if (data?.errorCode === 112) {
      auth.logout();
    }

    setAllSignal(data.signals);
  };

  const getAllNews = async () => {
    const getAllNewsData = await getAllNewsServer();
    setAllNews(getAllNewsData);
    setLoader(false);
  };
  const getAllTeaching = async () => {
    const getAllTeachingData = await getAllTeachingServer();
    setAllTeaching(getAllTeachingData);
    setLoader(false);
  };


  // const getSignalScroll = async (page, limit) => {
  //
  //   if (allSignal.length <= totalCount){
  //     const data = await getAllSignalServer(page, limit);
  //     if (data?.errorCode === 112){
  //       auth.logout();
  //     }
  //     setAllSignal(prev => [...prev, ...data.signals]);
  //     setPage(prev => prev+ 1)
  //   }
  //
  // };
  // useScroll(parentRef, childRef, ()=> getSignalScroll(page, limit), totalCount, allSignal.length)


  useEffect(() => {
        socket = io('https://ukrtrader-back.herokuapp.com/', {
            transports: ['websocket', 'polling'], // use WebSocket first, if available
    });

    socket.on("connect", () => console.log(`Client connected: ${socket.id}`));

    socket.on("getSignal", (data) => {
      setTimeout(() => {
        setUpdateFlag(data.user);
      }, 1500);
    });
    socket.on("getTeaching", (data) => {
      setTimeout(() => {
        setAddTeachingFlag(data.user);
      }, 1500);
    });
    socket.on("getNews", (data) => {
      setTimeout(() => {
        console.log("00d00000000000");
        setAddNewsFlag(data.user);
      }, 1500);
    });
    socket.on("getNotification", (data) => {
      setAddNotificationFlag(data.user);
    });
  }, []);



  // useRequest("getAllTeaching", getAllTeaching, [addTeachingFlag], setLoader);

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
              {componentState === t("Home") &&
              <div style={{height: '100%'}}>
                <Signal
                  socket={socket}
                  allSignal={allSignal}
                  naw={naw} componentState={componentState}
                  parentRef={parentRef}
                  childRef={childRef}
                />
                <div className={'news'}>
                  <div style={window.innerWidth > 600 ? {height: "34.5%"}: {height: "30.5%", width: "100%"}} className={'newsScrol'}>
                    {
                      allNews.map((news, index) =>
                        <div key={index} className={"NewsWrapper4"}
                             style={window.innerWidth > 600 ? { width: "550px" } : { width: "94%" }}>
                          <div className={"newsTime"}>
                            {news.date.split("T")[0].split("-").join(".")}
                            <span style={{ marginLeft: "7px" }}>
                  {news.date.split("T")[1].split(":")[0]}:
                              {news.date.split("T")[1].split(":")[1]}
                </span>

                          </div>
                          <div className={"newsTitle"}>{news.title}</div>
                          <div className={"newsInfo"}>
                            {
                               news.description.substr(0, 200)
                            }
                            ...
                          </div>
                          <div className={"newsButton"}>
                            <button onClick={() => {
                              setComponentState(t('News'))
                            }}
                                    className={"readNewsButton"}>{t("Text")}
                            </button>
                          </div>
                        </div>)
                    }
                  </div>

                </div>
              </div>

              }

              {componentState === t("Signals") &&  <Signal
                socket={socket}
                allSignal={allSignal} naw={naw}
                componentState={componentState}
                parentRef={parentRef}
                childRef={childRef}
              />
              }
              {
                componentState === t("News") && <div style={{height: '100%'}}>
                  {!openNews && <News allNews={allNews}
                                      setOpen={setOpenNews}
                                      socket={socket}
                  />}
                  {
                    openNews && <CreateNews open={openNews} setOpen={setOpenNews} socket={socket} />
                  }

                </div>
              }
              {
                componentState === t("Teaching") && <div style={{height: '100%'}}>
                  {!openTeaching && <Teaching
                    allTeaching={allTeaching}
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
