import { Dialog } from '@material-ui/core';
import './PopApStail.css';
import { useTranslation } from 'react-i18next';

const PaymentPage2 = ({ open, setOpen, paymentUrl }) => {
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={'paymentContainer'}>
        <div onClick={handleClose} className={'closePay'}>
          x
        </div>
        <div className={'textPayment'}>{t('Text_payment')}</div>

        <div className={'paymentContainerBtn'}>
          <a href={paymentUrl} target="_blank">
            <button className={'btnPayment'}>{t('Payment')}</button>
          </a>

          {/*<div className={"text"}>{t("Already_paid")}*/}

          {/*  <Link to={"/login"} style={{ textDecoration: "none" }}><span*/}
          {/*  style={{ marginLeft: "3px", color: "red", textDecoration: "none" }}>{t("Log_in")}</span>*/}
          {/*  </Link>*/}
          {/*</div>*/}
        </div>
      </div>
    </Dialog>
  );
};

export default PaymentPage2;
