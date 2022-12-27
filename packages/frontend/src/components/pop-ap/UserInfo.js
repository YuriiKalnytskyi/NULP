import {Dialog } from "@material-ui/core";
import { useEffect, useState } from "react";
import logoimg from "../../images/logoImage.png";
import { useTranslation } from "react-i18next";
import CloseIcon from "@material-ui/icons/Close";
import ChangePassword from "./component/ChangePassword";
import ChangeEmail from "./component/ChangeEmail";
import ChangeNumber from "./component/ChangeNumber";
import Change from "./component/Change";
import Notification from "./component/Notification";
import AddAll from "./component/AddAll";
import AddOne from "./component/AddOne";
import ButtonContainer from "./component/ButtonContainer";
import { getProfileInfoServer } from "../../services/userServise";

const UserInfo = ({ open, setOpen, socket}) => {
  const { t } = useTranslation();

  const [profileData, setProfileData] = useState({});
  const [component, setComponent] = useState("button");
  const [updateProfile, setUpdateProfile] = useState(false);

  const [success, setSuccess] = useState({ flag: false, message: "" });


  const handleClose = () => {
    setOpen(false);
  };

  const changeComponent = (value) => {
    setComponent(value);
  };
  const profileInfo = async () => {
    const data = await getProfileInfoServer();
    setProfileData(data);
  };


  useEffect(() => {
    profileInfo().then();
  }, [updateProfile]);


  useEffect(() => {
    if (success.flag) {
      setTimeout(() => {
        setSuccess((prev) => {
          prev.flag = false;
          prev.message = "";
          return { ...prev };
        });
      }, 4000);
    }

  }, [success]);

  return (
    <div>
      <Dialog
        PaperProps={{
          style: { borderRadius: 37, background: "rgba(13, 17, 24, 0.77)" }
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={"userInfoContainer"}>
          <CloseIcon className={"close"} onClick={() => {
            setOpen(false);
          }} />

          <div className={"profileHeader"}>
            <img className={"imageInProfile"} src={logoimg} alt="logoimg" />
            <div className={"profileTitle"}>{profileData.firstName} {profileData.lastName}</div>
            <div className={"profileInfo"}>{profileData.email}</div>
            <div className={"profileInfo"}>{t("TextChange")} {profileData.accountNumber}</div>
          </div>

          <div className={"profileButton"}>
            {
              success.flag && <div className={"successMessage"}>{success.message}</div>
            }

            {
              component === "button" && <div className={"profileButtonContainer"}>
                <ButtonContainer
                  changeComponent={changeComponent}
                />
              </div>
            }

            {
              component === "changePassword" && <div className={"profileButtonContainer"}>
                <ChangePassword
                  changeComponent={changeComponent}
                  setUpdateProfile={setUpdateProfile}
                  updateProfile={updateProfile}
                  setSuccess={setSuccess}
                />
              </div>
            }

            {
              component === "changeEmail" && <div className={"profileButtonContainer"}>
                <ChangeEmail
                  setSuccess={setSuccess}
                  updateProfile={updateProfile}
                  setUpdateProfile={setUpdateProfile}
                  changeComponent={changeComponent}
                />
              </div>
            }
            {
              component === "changeNumber" && <div className={"profileButtonContainer"}>
                <ChangeNumber
                  changeComponent={changeComponent}
                  setUpdateProfile={setUpdateProfile}
                  updateProfile={updateProfile}
                  setSuccess={setSuccess}
                />
              </div>
            }
            {
              component === "change" && <div className={"profileButtonContainer"}>
                <Change
                  changeComponent={changeComponent}
                />
              </div>
            }
            {
              component === "notification" && <div className={"profileButtonContainer"}>
                <Notification
                  changeComponent={changeComponent}
                  socket={socket}
                  setSuccess={setSuccess}
                />
              </div>
            }

            {
              component === "addAll" && <div className={"profileButtonContainer"}>
                <AddAll changeComponent={changeComponent} />
              </div>
            }

            {
              component === "addOne" && <div className={"profileButtonContainer"}>
                <AddOne
                  changeComponent={changeComponent}
                  setSuccess={setSuccess}
                />
              </div>
            }
          </div>
        </div>
      </Dialog>

    </div>
  );
};

export default UserInfo;
