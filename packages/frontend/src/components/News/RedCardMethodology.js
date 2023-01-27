import React from 'react'
import './Methodology.css'

const RedCardMethodology  = ({methodology, closeMethodology}) => {

    const images = methodology?.description?.images
    const text = methodology?.description?.text

  return (
      <div className={'redMethodology'}>
          <div className={"methodologyWrapper2"}>
              <div className={"methodologyTime2"}>
                  Методичка №{methodology.number}
              </div>
              <div className={"methodologyTitle2"}>{methodology.title}</div>
              <div className={'methodologyInfo2Container'}>
                  <div className={"methodologyInfo2"}>
                      <div className={'methodologyDescription1'}>
                          {
                             images  && Object.entries(images).filter((image) =>

                                  image[0].split(' ')[1]===(0).toString()).map((i, index) =>
                                  <div key={index} className={'addImage'}>
                                      Картинка {i[1].name}
                                  </div>
                              )
                          }
                          {
                              text && text.map((t, index) =>
                                  <div key={index} className={'description'}>
                                      <div className={'descriptionText'}>{t[`text ${index + 1}`]}</div>

                                      {
                                          images.filter((image)=>
                                              Object.entries(image)[0][0].split(' ')[1]===(index+1).toString()).map((i)=>

                                              <div className={'imTestContainer'}>
                                                  <img className={'imTest'} src={Object.entries(i)[0][1]} alt={'fkfkfkr'}/>
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
                  <button onClick={closeMethodology} className={"closeMethodologyButton"}>Закрити</button>

              </div>
          </div>
      </div>
  )
}
export default RedCardMethodology  ;
