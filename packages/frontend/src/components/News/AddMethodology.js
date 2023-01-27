import React from 'react'
import './Methodology.css'
import plus from "../../images/+.svg";

const AddMethodology  = ({setOpen}) => {
  return (
      <div className={"addMethodology"} onClick={() => {
          setOpen(true);
      }}>
          <img src={plus} alt="plus" style={{ width: '50%' }}/>
      </div>
  )
}
export default AddMethodology  ;
