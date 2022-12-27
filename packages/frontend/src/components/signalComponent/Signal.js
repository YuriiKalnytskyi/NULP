import "./Signal.css";
import { useTranslation } from "react-i18next";
import arrow2 from "../../images/Polygon.png";
import arrow from "../../images/Polygon 4.png";
import a from "../../images/+.png";
import { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import UpdateSignal from "../pop-ap/UpdateSignal";
import CloseSignal from "../pop-ap/CloseSignal";
import AddTake from "../pop-ap/AddTake";
import { signalCreateServer } from "../../services/adminServise";

const Signal = ({ allSignal, socket, naw, componentState, childRef, parentRef }) => {
  const { t } = useTranslation();
  const role = localStorage.getItem("role");
  const pairName = [
    'EUR/USD',
    'GBP/USD',
    'USD/JPY',
    'USD/CAD',
    'USD/CHF',
    'NZF/USD',
    'EUR/USD',
    'GBP/USD',
    'USD/JPY',
    'USD/CAD',
    'USD/CHF',
    'NZF/USD',
  ];
  pairName.pop()

  const order = [
    'BUY',
    'BUY STOP',
    'BUY LIMIT',
    'SELL',
    'SELL LIMIT',
    'SELL STOP',
  ];



  const [closeSignalId, setCloseSignalId] = useState(false);
  const [updateTake, setUpdateTake] = useState(false);
  const [arr, setArr] = useState([0]);
  const [arrowFlag, setArrowFlag] = useState(false);
  const [arrowFlag2, setArrowFlag2] = useState(false);
  const [search, setSearchChange] = useState("");
  const [creteTake, setCreateTake] = useState([]);
  const [change, setChange] = useState(false);
  const [editValueState, setEditValueState] = useState(null);
  const [createSignal, setCreateSignal] = useState({
    pairName: "Вибери пару",
    order: "Ордер",
    stop_loss: ''
  });

  const all = pairName.filter((value) =>
    value.toLocaleLowerCase().includes(search.toLowerCase())
  );


  const addTake = () => {
    arr.push(arr.length + 1);
    setArr([...arr]);
  };
  const searchChange = (e) => {
    setSearchChange(e.target.value);
  };
  const radioChange = (e) => {
    setCreateSignal({ ...createSignal, [e.target.name]: e.target.id });
    setArrowFlag(false);
    setArrowFlag2(false);
  };
  const inputChange = (e) => {
    setCreateSignal({ ...createSignal, [e.target.name]: e.target.value });
  };
  const takeChange = (e) => {
    setCreateTake({ ...creteTake, [e.target.name]: e.target.value });
  };
  const copyValue = (value) => {
    navigator.clipboard.writeText(value);
  };
  const createSignalButton = async () => {
    const creteTakeSignal = Object.entries(creteTake);
    await signalCreateServer({ createSignal, creteTakeSignal });
    socket.emit("signal");
  };
  const editValue = (value) => {
    setChange(true);
    setEditValueState(value);
  };
  const closeSignal = (value) => {
    setCloseSignalId(true);
    setEditValueState(value);
  };
  const addTake2 = (value) => {
    setUpdateTake(true);
    setEditValueState(value);
  };


  return (
    <div className={"signalAllRoot"}>
      {change && (
        <UpdateSignal
          open={change}
          setOpen={setChange}
          value={editValueState}
          socket={socket}
        />
      )}
      {
        closeSignalId &&
        <CloseSignal
          open={closeSignalId}
          setOpen={setCloseSignalId}
          value={editValueState}
          socket={socket}
        />
      }
      {
        updateTake && <AddTake
          open={updateTake}
          setOpen={setUpdateTake}
          value={editValueState}
          socket={socket}
        />
      }
      <div ref={parentRef}  className={componentState === t("Home") ?
        window.innerWidth > 600? "signalContainerScrollH2": 'signalContainerScrollH1' :
        window.innerWidth > 600?"signalContainerScrollSignal2": 'signalContainerScrollSignal3'}>
        {
          componentState === t("Signals") && role === "admin" &&
          <div className={"cardContainerSignalAdd"}>
            <div className={"cardBottomSignalAdd"}>
              <div className={"btnContainer"}>
                <button onClick={createSignalButton} className={"btnPublish"}>
                  {t("Publish")}
                </button>
              </div>
            </div>

            <div className={"cardTopInfoSignalAdd"}>
              <div className={"cardTopInfoSignal"}>
                <div className={"infoBlocSignal"}>
                  <div className={"test1SignalAdmin"}>
                    <div className={"pairContainer"}>
                      <div className={"nameCoupleSignalTitle"}
                           onClick={() => {
                             setArrowFlag(!arrowFlag);
                             setArrowFlag2(false)
                           }}
                      >
                        {createSignal.pairName}
                      </div>
                      <img
                        onClick={() => {
                          setArrowFlag(!arrowFlag);
                          setArrowFlag2(false)
                        }}
                        className={"arrow"}
                        src={arrowFlag ? arrow2 : arrow}
                        alt={"test"}
                      />

                      {arrowFlag && (
                        <div className={"selectInput"}>
                          <div className={"select-box"}>
                            <div className="options-container active">
                              <div className="search-box">
                                <input
                                  onChange={searchChange}
                                  type="text"
                                  id="ser"
                                  placeholder="пошук"
                                />
                              </div>
                              <div>
                                { all &&  all.map((value, index) => (
                                  <div key={index} className="option">
                                    <input
                                      type="radio"
                                      className="radio"
                                      onChange={radioChange}
                                      id={value}
                                      name="pairName"
                                    />
                                    <label htmlFor={value}>{value}</label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={"titleTekesSignalAdmin"}>
                      <div className={"statusSignal"}
                           onClick={() => {
                             setArrowFlag2(!arrowFlag2);
                             setArrowFlag(false)
                           }}
                      >
                        {createSignal.order}
                      </div>
                      <img
                        onClick={() => {
                          setArrowFlag2(!arrowFlag2);
                          setArrowFlag(false)
                        }}
                        className={"arrow"}
                        src={arrowFlag2 ? arrow2 : arrow}
                        alt={"test"}
                      />
                      {arrowFlag2 && (
                        <div className={"selectInput2"}>
                          <div className={"select-box"}>
                            <div className="options-container active">
                              {order.map((value, index) => (
                                <div key={index} className="option">
                                  <input
                                    type="radio"
                                    className="radio"
                                    onChange={radioChange}
                                    id={value}
                                    name="order"
                                  />
                                  <label htmlFor={value}>{value}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>


                    <div className={"takeCoupleSignalAdmin"}>
                      <input
                        className={"inputTakeCoupleAdmin"}
                        name="enter_price"
                        onChange={inputChange}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className={"takeContainerSignalAdmin"}>
                    <div className={"tekeSctol"}>
                      {arr.map((value, index) => (
                        <div key={index} className={"takeSignal"}>
                          <div className={"takeTitleSignal"}>
                            TakeProfit #{index + 1}:
                          </div>
                          <input
                            className={"inputTakeCoupleAdmin"}
                            // value={creteTake[`TakeProfit #${index+1}`]}
                            name={`TakeProfit #${index + 1}`}
                            onChange={takeChange}
                            style={{
                              width: "50%",
                              color: "white"
                            }}
                            type="number"
                          />
                        </div>
                      ))}
                    </div>
                    <div className={"plas"}>
                      <img onClick={addTake} src={a} alt={"+"} />
                    </div>
                  </div>

                  <div className={"stopLosContainerSignal"}>
                    <div className={"lossTitleSignal"}>STOP LOSS:</div>
                    <input
                      className={"inputTakeCoupleAdmin"}
                      style={{
                        width: "50%",
                        color: "white"
                      }}
                      name="stop_loss"
                      onChange={inputChange}
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

                {allSignal &&
                allSignal.map((signal, index) => (
                    <div className={"cardContainerSignal"}
                         style={componentState === t("Signals") ?
                             { marginBottom: "50px" } : { marginBottom: "0" }
                         }
                         key={index}>
                        {
                            signal.title !== "" && <div className={"closeSignal"}
                                                        style={
                                                            signal.title === "TAKE" ? { border: "5px solid #24FF00" } :
                                                                signal.title === "STOP LOSS" ? { border: "5px solid #FF0000" } :
                                                                    signal.title === "безубиток" ? { border: "5px solid #FF5C00" } :
                                                                        signal.title === "(скасовано)" ? { border: "5px solid #7f7f7f" } :
                                                                            { border: "5px solid #FAFF00" }
                                                        }
                            >
                                <div className={"closeSignalContainer"}>
                                    <div className={"closeSignalTitle"}>{t('CloseSignalText')}</div>
                                    <div className={"closeSignalTitle"}
                                         style={
                                             signal.title === "TAKE" ? { color: "#24FF00" } :
                                                 signal.title === "STOP LOSS" ? { color: "#FF0000" } :
                                                     signal.title === "безубиток" ? { color: "#FF5C00" } :
                                                         signal.title === "(скасовано)" ? { color: "#7f7f7f" } :
                                                             { color: "#FAFF00" }
                                         }
                                    >{signal.title}</div>
                                    <div
                                        className={"closeSignalTitle2"}
                                        style={
                                            signal.title === "TAKE" ? { color: "#24FF00" } :
                                                signal.title === "STOP LOSS" ? { color: "#FF0000" } :
                                                    signal.title === "безубиток" ? { color: "#FF5C00" } :
                                                        signal.title === "(скасовано)" ? { color: "#7f7f7f" } :
                                                            { color: "#FAFF00" }
                                        }>{signal.countItem} %
                                    </div>
                                </div>

              </div>
            }

            <div className={"cardBottomSignal"}>
              <div className={"cardBottomSignalContainer"}>
                <div className={"changeContainer"}>
                  {
                    signal?.changes && signal.changes.map((change, index) => (
                      <div key={index} className={"change"}>
                        <div className={"changeTime"}>
                          {/*{change.time.split('T')[0].split('-').splice(1,2).join(".")}-*/}
                          {change?.time.split("T")[1].split(".")[0].split(":").splice(0, 2).join(":")}
                        </div>
                        <div className={"changeTitle"}>
                          {
                            change?.title.toUpperCase()
                          }
                        </div>
                      </div>))
                  }
                </div>
                <div className={"btnCloseContainer"}>
                  <button onClick={() => {
                    closeSignal({
                      signalId: signal.id,
                      signalName: signal.pairName
                    });
                  }} className={"btnClose"}>
                    {t("Close")}
                  </button>
                </div>
              </div>
            </div>
            <div
              className={
                signal.condition?.includes("BUY")
                  ? "cardTopSignal"
                  : "cardTopRedSignal"
              }
            >
              <div className={"cardTopInfoSignal"}>
                <div className={"infoBlocSignal"}>
                  <div className={"test1Signal"}>
                    <div className={"nameCoupleSignal"}>
                      {signal.pairName}
                    </div>
                    <div className={"titleTekesSignal"}>
                      <div className={"statusSignal"}>
                        {signal.condition}
                      </div>
                      <div className={"takeCoupleSignal"}>
                        {signal.enterPrice}
                      </div>
                    </div>
                  </div>

                  <div className={role === "admin" ? "takeContainerSignal" : "takeContainerSignal2"}>
                    {signal.takes &&
                    signal.takes.map((value, i) => (
                      <div className={"takeSignal"} key={i}>
                        <div className={"takeTitleSignal"}>
                          TakeProfit #{i + 1}:
                        </div>
                        <div className={"takeNumdarSignal"}>
                          {" "}
                          {value.take}
                        </div>
                        {role === "admin" && componentState === t("Signals") ? (
                          <EditIcon
                            onClick={() => {
                              editValue({
                                value: value.take,
                                takeId: value.id,
                                signalId: signal.id,
                                title: `TakeProfit #${i + 1}`,
                                signalName: signal.pairName
                              });
                            }}
                            style={{
                              color: "white",
                              width: "15px",
                              cursor: "pointer",
                              marginLeft: "10px"
                            }}
                          />
                        ) : (
                          <FileCopyIcon
                            onClick={() => {
                              copyValue(value.take);
                            }}
                            style={{
                              color: "white",
                              width: "15px",
                              cursor: "pointer",
                              marginLeft: "10px"
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {role === "admin" && <div className={"addTake"}><img
                    onClick={() => {
                      addTake2({ signalId: signal.id, signalName: signal.pairName });
                    }}
                    src={a} alt={"+"} />
                  </div>}

                  <div className={"stopLosContainerSignal"}>
                    <div className={"lossTitleSignal"}>STOP LOSS:</div>
                    {signal.stopLoss && (
                      <div className={"lossTakeSignal"}>
                        {signal.stopLoss}
                      </div>
                    )}
                    {role === "admin" && componentState === t("Signals") ? (
                      <EditIcon
                        onClick={() => {
                          editValue({
                            value: signal.stopLoss,
                            signalId: signal.id,
                            title: "STOP LOSS",
                            signalName: signal.pairName

                          });
                        }}
                        style={{
                          color: "white",
                          width: "15px",
                          cursor: "pointer",
                          marginLeft: "10px"
                        }}
                      />
                    ) : signal.stopLoss &&
                      <FileCopyIcon
                        onClick={() => {
                          copyValue(signal.stopLoss);
                        }}
                        style={{
                          color: "white",
                          width: "15px",
                          cursor: "pointer",
                          marginLeft: "10px"
                        }}
                      />
                    }
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}

        <div ref={childRef}/>

      </div>

    </div>
  );
};

export default Signal;
