import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Main.css';
import io from 'socket.io-client';
import Naw from './Naw/Naw';
import Header from './Header/Header';
import UserInfo from './pop-ap/UserInfo';
import Teaching from './Teaching/Teaching';
import CreateTeaching from './Teaching/CreateTeaching';
import noise from '../images/noise.png';
import PreReloader from './preLoader/PreReloader';
import { useRequest } from '../hooks/useRequest';
import Naw2 from './Naw/Naw2';
import { getAllTeachingServer } from '../services/services';

let socket = null;

const Main = () => {

  const { t } = useTranslation();
  const [componentState, setComponentState] = useState(t('Home'));
  const [loader, setLoader] = useState(false);

  const [naw, setNaw] = useState(false);

  const [updateFlag, setUpdateFlag] = useState('');
  const [addNotificationFlag, setAddNotificationFlag] = useState('');

  const [openTeaching, setOpenTeaching] = useState(false);

  const [allTeaching, setAllTeaching] = useState([]);

  const data = (d) => {
    const all = {};
    for (let i = 0; i < d.length; i++) {
      if (!all[d[i].subject]) {
        all[d[i].subject] = [d[i]];
      }
      if (
        all[d[i].subject] &&
        !all[d[i].subject].find((v) => v.subject === d[i].subject && v.title === d[i].title)
      ) {
        all[d[i].subject] = [...all[d[i].subject], d[i]];
      }
    }
    return Object.entries(all);
  };

  const getAllTeaching = async () => {
    const getAllTeachingData = await getAllTeachingServer();
    setAllTeaching(data(getAllTeachingData));
  };

  useRequest('getAllTeaching', getAllTeaching, [updateFlag], setLoader);

  const [openUserInfo, setOpenUserInfo] = useState(false);

  // useEffect(() => {
  //
  //   // socket = io('https://localhost:4000/', {
  //   //   transports: ['websocket', 'polling'], // use WebSocket first, if available
  //   // });
  //
  //   socket = io('https://localhost:4000/', {
  //     cors: {
  //       origin: "http://localhost:4000",
  //       credentials: true
  //     },transports : ['websocket', "websocket", 'polling'] });
  //
  //   socket.on("connect", () => console.log(`Client connected: ${socket.id}`));
  //
  //   socket.on("addData", (data) => {
  //     setTimeout(() => {
  //       setUpdateFlag(data.user);
  //     }, 1000);
  //   });
  // }, []);

  if (loader) {
    return <PreReloader />;
  }

  return (
    <div className="Main">
      {openUserInfo && <UserInfo open={openUserInfo} setOpen={setOpenUserInfo} socket={socket} />}

      <div className={'ellipseContainerMain'}>
        <div className={'ellipse1Main'} />
        <img src={noise} alt={'noise'} className={'noiseMain'} />
      </div>

      <div className={'a'}>
        {window.innerWidth > 600 && (
          <div className={naw ? 'nawBar2' : 'nawBar'}>
            <Naw
              naw={naw}
              setNaw={setNaw}
              componentState={componentState}
              setComponentState={setComponentState}
            />
          </div>
        )}

        <div className={naw ? 'container2' : 'container'}>
          <div className="header">
            <Header
              componentState={componentState}
              open={openUserInfo}
              setOpen={setOpenUserInfo}
              addNotificationFlag={addNotificationFlag}
              setUpdateFlag={setUpdateFlag}
              setComponentState={setComponentState}
            />
          </div>

          <div className={window.innerWidth > 600 ? 'infoContainer' : 'infoContainer2'}>
            <div className={'homeContainer'}>
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
              {componentState === t('Teaching') && (
                <div style={{ height: '100%' }}>
                  {!openTeaching && (
                    <Teaching
                      allTeaching={allTeaching || []}
                      setOpen={setOpenTeaching}
                      socket={socket}
                    />
                  )}
                  {openTeaching && (
                    <CreateTeaching open={openTeaching} setOpen={setOpenTeaching} socket={socket} />
                  )}
                </div>
              )}
            </div>
          </div>

          {window.innerWidth < 600 && (
            <div className={'nawBar3'}>
              <Naw2 componentState={componentState} setComponentState={setComponentState} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
