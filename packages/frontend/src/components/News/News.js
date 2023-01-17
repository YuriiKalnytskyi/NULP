import './News.css';
import plus from '../../images/+.svg';
import { useState } from 'react';
import DeleteNewsOrTeaching from '../pop-ap/DeleteNewsOrTeaching';
import { useTranslation } from 'react-i18next';

const News = ({ allNews, setOpen, socket }) => {
  const { t } = useTranslation();
  const role = localStorage.getItem('role');

  const [redNew, setRedNew] = useState({ flag: false, news: {} });
  const [deleteValue, setDeleteValue] = useState({ flag: false, value: {} });

  const redNews = (news) => {
    setRedNew((prev) => {
      prev.flag = true;
      prev.news = news;
      return { ...prev };
    });
  };

  const closeNews = () => {
    setRedNew((prev) => {
      prev.flag = false;
      prev.news = {};
      return { ...prev };
    });
  };

  const deleteNews = () => {
    setDeleteValue((prev) => {
      prev.flag = true;
      prev.value = redNew.news;
      return { ...prev };
    });
  };

  return (
    <div className={'NewsContainer'}>
      {deleteValue.flag && (
        <DeleteNewsOrTeaching
          setOpen={setDeleteValue}
          open={deleteValue}
          value={deleteValue.value}
          socket={socket}
          component={'news'}
        />
      )}
      {redNew.flag && (
        <div
          style={window.innerWidth > 600 ? { width: '70%' } : { width: '100%' }}
          className={'redNews'}
        >
          <div className={'NewsWrapper2'}>
            <div className={'newsTime2'}>
              {redNew.news.date.split('T')[0].split('-').join('.')}
              <span style={{ marginLeft: '7px' }}>
                {redNew.news.date.split('T')[1].split(':')[0]}:
                {redNew.news.date.split('T')[1].split(':')[1]}
              </span>
            </div>
            <div className={'newsTitle2'}>{redNew.news.title}</div>
            <div className={'newsInfo2Container'}>
              <div className={'newsInfo2'}>{redNew.news.description}</div>
            </div>

            <div className={'newsButton2'}>
              <button onClick={closeNews} className={'readNewsButton'}>
                Закрити
              </button>
              {role === 'admin' && (
                <button onClick={deleteNews} className={'readNewsButton'}>
                  Видалити
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {!redNew.flag ? (
        <div
          style={window.innerWidth > 600 ? { height: '87%' } : { height: '77%' }}
          className={redNew.flag ? 'NewsContainerSkrol2' : 'NewsContainerSkrol'}
        >
          {role === 'admin' && window.innerWidth > 600 && (
            <div
              className={'addNews'}
              onClick={() => {
                setOpen(true);
              }}
            >
              <img src={plus} alt="plus" />
            </div>
          )}
          {allNews.map((news, index) => (
            <div
              key={index}
              className={'NewsWrapper'}
              style={window.innerWidth > 600 ? { width: '550px' } : { width: '94%' }}
            >
              <div className={'newsTime'}>
                {news.date.split('T')[0].split('-').join('.')}
                <span style={{ marginLeft: '7px' }}>
                  {news.date.split('T')[1].split(':')[0]}:{news.date.split('T')[1].split(':')[1]}
                </span>
              </div>
              <div className={'newsTitle'}>{news.title}</div>
              <div className={'newsInfo'}>
                {redNew.flag ? news.description.substr(0, 200) : news.description.substr(0, 300)}
                ...
              </div>
              <div className={'newsButton'}>
                <button
                  onClick={() => {
                    redNews(news);
                  }}
                  className={'readNewsButton'}
                >
                  {t('Text')}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        window.innerWidth > 600 && (
          <div className={redNew.flag ? 'NewsContainerSkrol2' : 'NewsContainerSkrol'}>
            {role === 'admin' && window.innerWidth > 600 && (
              <div
                className={'addNews'}
                onClick={() => {
                  setOpen(true);
                }}
              >
                <img src={plus} alt="plus" />
              </div>
            )}
            {allNews.map((news, index) => (
              <div
                key={index}
                className={'NewsWrapper'}
                style={window.innerWidth > 600 ? { width: '550px' } : { width: '94%' }}
              >
                <div className={'newsTime'}>
                  {news.date.split('T')[0].split('-').join('.')}
                  <span style={{ marginLeft: '7px' }}>
                    {news.date.split('T')[1].split(':')[0]}:{news.date.split('T')[1].split(':')[1]}
                  </span>
                </div>
                <div className={'newsTitle'}>{news.title}</div>
                <div className={'newsInfo'}>
                  {redNew.flag ? news.description.substr(0, 200) : news.description.substr(0, 300)}
                  ...
                </div>
                <div className={'newsButton'}>
                  <button
                    onClick={() => {
                      redNews(news);
                    }}
                    className={'readNewsButton'}
                  >
                    {t('Text')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
export default News;
