import React from 'react'

const SuspendedScreen = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
        <img src="/images/logo.svg" alt="chatter logo" className='' />
        <p className='mt-2'>Loading ...</p>
    </div>
  )
}

export default SuspendedScreen