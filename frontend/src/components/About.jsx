import React from 'react'

const About = () => {
  return (

    <div className="m-4 grid sm:grid-cols-2 gap-4">
        <div className="min-h-[200px] rounded-lg bg-blue-600 text-center">
            <div className="m-4"> 
              
            </div>
        </div>
        <div className="min-h-[200px] rounded-lg bg-yellow-400 text-left px-5 py-2">
          <div className="flex items-center gap-4 ">
          <h1 className="tracking-tight ">About</h1>
          <div className="bg-green-600 h-[2px] w-6 justify-center px-12"></div>
          </div>
          <p className="py-4 text-lg font-semibold">Your Support is Really
          Powerful.</p>
          <p className="py-3">The secret to happiness lies in helping others. Never
underestimate the difference YOU can make in the
lives of the poor, the abused and the helpless.</p>
          <button className="font-medium rounded-none py-1 bg-green-500">Read More</button>
          </div>
        </div>
  )
}

export default About
