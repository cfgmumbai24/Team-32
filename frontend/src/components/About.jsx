import React from 'react'

const About = () => {
  return (

    <div className="m-4 p-4 grid sm:grid-cols-2 gap-4">

{/* <div className="m-3 p-16 rounded-xl relative bg-[rgba(255,255,255,0.5)] shadow-content flex-center flex-col">
        <Image src="/assets/images/home_bg.jpg" fill={true} className="h-full w-full object-cover rounded-xl -z-10" alt="Background Image(Garbage Truck)"/>
        <Image src="/assets/icons/recylink_black.png" width={300} height={300} alt="Recylink Logo" className="pb-4"/>
        <div className="text-3xl md:text-3xl w-4/5 text-black font-medium flex-center flex-col">

        </div>
      </div> */}
      
        <div className="min-h-[200px] p-4 rounded-lg bg-cyan-200 text-center">
        <h1 className="tracking-tight ">Khojshala Program</h1>
            <div className="m-4"> 
            
            The Khojshala program by Margshala Foundation is dedicated to exploring and understanding the unique challenges faced by rural youth in remote Himalayan regions. It aims to uncover hidden potential and opportunities within these communities through extensive field research, data collection, and community engagement. This program plays a vital role in ensuring that the solutions Margshala implements are not only innovative but also rooted in the real needs and aspirations of the local youth.
            </div>
        </div>
        <div className="min-h-[200px] p-4 rounded-lg bg-cyan-400  text-center">
          
          <h1 className="tracking-tight">Swarozgar Fellowship</h1>
          
          <div className="m-4">      
          <p className="py-3">

The Margshala Swarozgar Fellowship fosters youth entrepreneurship in the Himalayan region by providing mentorship, training, and resources to young changemakers. Focused on creating rural livelihoods, the fellowship equips participants with the skills to develop sustainable local enterprises, promoting self-reliance and economic independence. This initiative not only empowers individuals but also contributes to the socio-economic development of their communities, making it a cornerstone of Margshala's mission.</p>
          </div>
          </div>
        </div>
  )
}

export default About