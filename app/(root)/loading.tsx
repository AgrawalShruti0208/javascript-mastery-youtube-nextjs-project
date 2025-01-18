import React from 'react'

const loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="flex flex-col items-center">
        <div className="loader rounded-full border-4 border-t-white border-pink-300 w-16 h-16 animate-spin"></div>
        <p className="mt-4 text-white text-lg font-semibold">Loading...</p>
      </div>
    </div>
  )
}

export default loading