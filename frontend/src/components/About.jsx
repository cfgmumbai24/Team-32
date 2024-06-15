import BusinessIcon from '@mui/icons-material/Business';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { alignProperty } from '@mui/material/styles/cssUtils';
const About = () => {
  return (

    <div>
      <div className="w-full h-screen flex flex-col">
        <div className="flex justify-center">
          <img src={'src/assets/margshala-logo.png'} alt="logo" className="w-40 h-40" />
        </div>
        <br></br>
        <div className="flex-1 text-left p-4">
          <p className="text-lg">Margshala is a pioneering organization dedicated to nurturing young entrepreneurs in Uttarakhand. Our mission is to empower the youth by providing them with the skills, mentorship, and resources they need to transform their innovative ideas into successful businesses.Join us at Margshala and embark on your journey to becoming one of Uttarakhand's most promising young entrepreneurs</p>
          <br></br>
          <br></br>
          <div className='mb-4'>

            <p style={{ fontSize: '24px', color: '#0FA2A0' }} className="text-xl"> <BusinessIcon fontSize="large" />Join us at Margshala and embark on your journey to becoming one of Uttarakhand's most promising young entrepreneurs </p>
          </div>
          <br></br>

          <div className='mb-4'>
            <p className="text-xl" style={{ fontSize: '24px', color: '#06716F' }}> <AccountBalanceIcon fontSize="large" color="seagreen" />Access initial funding to kickstart your business and turn your ideas into reality. </p>
          </div>
          <br></br>
          <div className='mb-4'>
            <p className="text-xl" style={{ fontSize: '24px', color: '#0FA2A0' }}> <CastForEducationIcon fontSize="large" color="seagreen" />Connect with successful local entrepreneurs and professionals who will mentor you through your journey.</p>
          </div>
          <br></br>
          <div className='mb-4'>
            <p className="text-xl" style={{ fontSize: '24px', color: '#06716F' }}> <OndemandVideoIcon fontSize="large" color="seagreen" />Connect with successful local entrepreneurs and professionals who will mentor you through your journey. </p>
          </div>
          <br></br>
        </div>

      </div>

      <div>
        <div className='justify-center'>
        <h1> THE FLAGSHIP PROGRAM </h1>

        </div>
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
      </div>
      <div>

      </div>

    </div>


  )
}

export default About