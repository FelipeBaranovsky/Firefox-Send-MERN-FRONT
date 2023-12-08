import React, {useContext, useEffect} from 'react'
import Layout from '@/components/Layout'
import authContext from '@/context/auth/authContext'
import appContext from '@/context/app/appContext'
import Link from 'next/link'
import Dropzone from '@/components/Dropzone'
import { toast } from 'react-toastify'

const Index = () => {

  //Extract user
  const AuthContext = useContext(authContext)
  const {userAuthenticated, isAuthenticated} = AuthContext

  //Extract file msg 

  const AppContext = useContext(appContext)
  const {url} = AppContext

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      userAuthenticated()
    }
  }, [])

  return (
      <Layout>
        <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
          {url ? (
            <>
              <p className='text-center text-2xl mt-10'>
                <span className='font-bold text-red-500 text-3xl uppercase'>Tu URL es: </span>{`${process.env.frontendURL}/links/${url}`}
              </p>
              <button 
                type='button' 
                className='mt-10 bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold'
                onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/links/${url}`)}
              >
              Copy Link</button>
            </>
          ):(
            <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10'>
              <Dropzone />
              <div className='md:flex-1 mb-3 mx-2 my-16 lg:mt-0'>
                <h2 className='text-4xl font-sans font-bold text-gray-800 my-4'>
                  A simple and private way to share files
                </h2>
                <p className='text-lg leading-loose mb-5'>
                  <span className='text-red-500 font-bold'>NodeSend</span> allows you to send files (1GB to 2.5GB) securely. When you upload a file, Firefox Send generates a link that you can share with the recipient. For added security, you also have the option to set a password and change the validity date settings. Files are not saved in the cloud.
                </p>
                {!isAuthenticated && 
                  <Link legacyBehavior href={"/createAccount"}>
                    <a className='text-red-500 font-bold text-lg hover:text-red-700'>Create an account to upgrade your benefits</a>
                  </Link>
                }
              </div>
            </div>
          )}
        </div>
      </Layout>
  )
}

export default Index