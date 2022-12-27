import {Typography } from "@material-ui/core";
import { useState } from "react";
import "./Naw.css";

const NawComponent = ({ ing, state, text, naw }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            {
                window.innerWidth > 600 ?  <div
                    className={"nawComponent"}
                    onMouseOver={() => setShow(true)}
                    onMouseOut={() => setShow(false)}
                >
                    <div className={"component"}>
                        {state === text && <div className={"lineComponent"} />}
                        {/*<div className={"lineComponent"} />*/}

                        <div className={naw ? "imgContainer" : "imgContainer2"}>
                            <div className={"imgNaw"}>
                                <img src={ing} alt={"test"} />
                            </div>
                        </div>

                        {!naw && (
                            <Typography
                                variant="h6"
                                style={
                                    state === text
                                        ? { color: "#FFFFFF", fontFamily: "Gilroy", fontWeight: 700}
                                        : { color: "#EBEBEB", opacity: 0.64 , fontFamily: "Gilroy", fontWeight: 400}
                                }
                                className={"titleNaw"}
                            >
                                {text}
                            </Typography>
                        )}

                        {show && naw && (<div className={"show"}>{text}</div>)}

                    </div>


                </div> : <div className={'item'}>
                    <div className={"imgNaw"}>
                        <img src={ing} alt={"test"}/>
                    </div>
                </div>
            }

        </>

    );
};

export default NawComponent;
