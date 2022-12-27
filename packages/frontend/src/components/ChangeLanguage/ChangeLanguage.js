import './ChangeLanguage.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import enImg from '../../images/en.png';
import ukImg from '../../images/uk.png';
import arrow from '../../images/arrow.svg';

import { Button, List, ListItem, Popover } from '@material-ui/core';

const ChangeLanguage = ({setComponentState}) => {
  const { t ,i18n } = useTranslation();

  const languageMap = {
    en: { label: 'English', img: enImg,  },
    uk: { label: 'Українська', img: ukImg },
  };

  const [menuAnchor, setMenuAnchor] = useState(false);

  const changeLanguage = (item) => {
    i18n?.changeLanguage(item);
    setMenuAnchor(null);
    if (setComponentState){
      setComponentState(t('Home'))
    }

  };
  const selected = localStorage.getItem('i18nextLng') || 'English';

  return (
    <div className={'changeLanguageContainer'}>
      <Button
        onClick={({ currentTarget }) => {
          setMenuAnchor(currentTarget);
        }}
      >
        {window.innerWidth < 980 ? (
          <img
            src={languageMap[selected]?.img}
            alt={'country'}
            style={{ marginRight: '10px' }}
          />
        ) : (
          <span className={'spanText'}>{languageMap[selected]?.label}</span>
        )}
        <img src={arrow} alt={'arrow'} />
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
          <List>
            {Object.keys(languageMap)?.map((item) => (
              <ListItem
                button
                key={item}
                onClick={() => {
                  changeLanguage(item);
                }}
              >
                <img src={languageMap[item].img} alt={item} />
                <span className={'spanText2'}>{languageMap[item].label}</span>
              </ListItem>
            ))}
          </List>
      </Popover>
    </div>
  );
};

export default ChangeLanguage;
