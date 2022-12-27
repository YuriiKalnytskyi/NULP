import './PreReloader.css';
import logoImage from '../../images/logo_new.png';
import noise from '../../images/noise.png';

const PreReloader = () => {
  return (
    <div className={'loaderContainer'}>
      <div className={'loaderFone'} />
      <img src={noise} alt={'noise'} className={'noiseMain'} />
      <img className={'logoLoader'} src={logoImage} alt='logoImageLoader' />
      <div className={'loaderWrapper'}>

      </div>
    </div>
  );
};

export default PreReloader;
