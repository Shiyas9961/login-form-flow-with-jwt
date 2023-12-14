import React from 'react'
import { useNavigate } from 'react-router-dom'

const UnAuthorized = () => {

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }
  return (
    <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button onClick={handleBack}>Go Back</button>
            </div>
        </section>
  )
}

export default UnAuthorized