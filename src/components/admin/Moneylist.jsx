import React from 'react'
import { GiReceiveMoney } from 'react-icons/gi'
import { TiMediaPlayReverse } from 'react-icons/ti'
import { Link } from 'react-router-dom'
const Moneylist = () => {
  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold mt-5 ml-3 mb-3 text-color">
      <GiReceiveMoney/>
        &nbsp; รายได้
      </h1>

      <div className="flex-btnhead">
        <Link to="/home" className="btn-back">
          <TiMediaPlayReverse />
          &nbsp; กลับ
        </Link>
      </div>
    </div>
  )
}

export default Moneylist
