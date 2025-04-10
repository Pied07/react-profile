import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function Loading() {
  return (
    <div className='loading'><FontAwesomeIcon className='loading-icon' icon={faSpinner} />  Loading...</div>
  )
}

export default Loading