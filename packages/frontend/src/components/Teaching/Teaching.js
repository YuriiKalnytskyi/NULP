import "./Teaching.css";
import plus from "../../images/+.svg";
import { useState } from "react";

const Teaching = ({ allTeaching, setOpen, socket, }) => {
        // const role = localStorage.getItem("role");
        const role = 'admin';


        const [deleteValue, setDeleteValue] = useState({ flag: false, value: {} })
        const [redTeachingState, setRedTeachingState] = useState({ flag: false, teaching: {} });


        const redTeaching = (teaching) => {
            setRedTeachingState((prev) => {
                prev.flag = true;
                prev.teaching = teaching;
                return { ...prev };
            });
        };

        const closeTeaching = () => {
            setRedTeachingState((prev) => {
                prev.flag = false;
                prev.teaching = {};
                return { ...prev };
            });
        };
        const deleteTeaching = () => {
            setDeleteValue((prev) => {
                prev.flag = true;
                prev.value = redTeachingState.teaching;
                return { ...prev };
            });
        }
        return (
            <div className={"TeachContainer"}>
                {redTeachingState.flag && <div  style={window.innerWidth > 600 ? {width: '70%'}: {width: '100%'}} className={'redMethodology'}>
                    <div className={"methodologyWrapper2"}>
                        <div className={"methodologyTime2"}>
                            Методичка №{redTeachingState?.teaching.number}
                        </div>
                        <div className={"methodologyTitle2"}>{redTeachingState?.teaching.title}</div>
                        <div className={'methodologyInfo2Container'}>
                            <div className={"methodologyInfo2"}>
                                <div className={'methodologyDescription1'}>
                                    {
                                        redTeachingState?.teaching?.description?.images && Object.entries(redTeachingState?.teaching.description?.images).filter((image) =>

                                            image[0].split(' ')[1] === (0).toString()).map((i, index) =>
                                            <div key={index} className={'addImage'}>
                                                Картинка {i[1].name}
                                            </div>
                                        )
                                    }
                                    {
                                        redTeachingState?.teaching?.description && redTeachingState?.teaching?.description.text.map((t, index) =>
                                            <div key={index} className={'description'}>
                                                <div className={'descriptionText'}>{t[`text ${index + 1}`]}</div>

                                                {
                                                    redTeachingState?.teaching?.description?.images?.filter((image) =>
                                                        Object.entries(image)[0][0].split(' ')[1] === (index + 1).toString()).map((i) =>

                                                        <div className={'imTestContainer'}>
                                                            <img className={'imTest'} src={Object.entries(i)[0][1]}
                                                                 alt={'fkfkfkr'}/>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className={"methodologyButton2"}>
                            <button onClick={closeTeaching} className={"readMethodologyButton"}>Закрити</button>

                        </div>
                    </div>
                </div>
                }
                {window.innerWidth > 600 && !redTeachingState.flag ?
                    <div style={window.innerWidth > 600 ? {height: '87%'}: {height: '77%'}} className={redTeachingState.flag ? "TeachContainerSkrol2" : "TeachContainerSkrol"}>
                        {role === "admin" && (
                            <div className={"addTeaching"} onClick={() => {
                                setOpen(true);
                            }}>
                                <img src={plus} alt="plus"/>
                            </div>
                        )}
                        {
                            allTeaching.map((teaching, index) =>
                                <div key={index} className={"teachingWrapper"}>
                                    <div className={"teachingTime"}>Урок {teaching.lesson}</div>
                                    <div className={"teachingTitle"}>{teaching.title}</div>
                                    <div className={"teachingButton"}>
                                        <button onClick={() => {
                                            redTeaching(teaching);
                                        }} className={"readTeachingButton"}>Перейти
                                        </button>
                                    </div>
                                </div>)
                        }
                    </div> : window.innerWidth < 600 && !redTeachingState.flag ?
                        <div style={window.innerWidth > 600 ? {height: '87%'}: {height: '77%', justifyContent: 'center'}} className={redTeachingState.flag ? "TeachContainerSkrol2" : "TeachContainerSkrol"}>
                            {role === "admin" && (
                                <div className={"addTeaching"} onClick={() => {
                                    setOpen(true);
                                }}>
                                    <img src={plus} alt="plus"/>
                                </div>
                            )}
                            {
                                allTeaching.map((teaching, index) =>
                                    <div key={index} className={"teachingWrapper"}>
                                        <div className={"teachingTime"}>Урок {teaching.lesson}</div>
                                        <div className={"teachingTitle"}>{teaching.title}</div>
                                        <div className={"teachingButton"}>
                                            <button onClick={() => {
                                                redTeaching(teaching);
                                            }} className={"readTeachingButton"}>Перейти
                                            </button>
                                        </div>
                                    </div>)
                            }
                        </div> : window.innerWidth > 600 && redTeachingState.flag ?
                            <div className={redTeachingState.flag ? "TeachContainerSkrol2" : "TeachContainerSkrol"}>
                                {role === "admin" && (
                                    <div className={"addTeaching"} onClick={() => {
                                        setOpen(true);
                                    }}>
                                        <img src={plus} alt="plus"/>
                                    </div>
                                )}
                                {
                                    allTeaching.map((teaching, index) =>
                                        <div key={index} className={"teachingWrapper"}>
                                            <div className={"teachingTime"}>Урок {teaching.lesson}</div>
                                            <div className={"teachingTitle"}>{teaching.title}</div>
                                            <div className={"teachingButton"}>
                                                <button onClick={() => {
                                                    redTeaching(teaching);
                                                }} className={"readTeachingButton"}>Перейти
                                                </button>
                                            </div>
                                        </div>)
                                }
                            </div> : ''
                }

            </div>
        );
    }
;

export default Teaching;
