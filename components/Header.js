import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import authContext from '@/context/auth/authContext'
import appContext from '@/context/app/appContext'
import { useRouter } from 'next/router'

const Header = () => {
     //Extract user
  const AuthContext = useContext(authContext)
  const {userAuthenticated, user, logout} = AuthContext

  const AppContext = useContext(appContext)
  const {cleanState} = AppContext

  const router = useRouter()

  useEffect(() => {
    userAuthenticated()
  }, [])

  const goHome = () => {
    router.push('/')
    cleanState()
  }

  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
        
        <img 
            className='w-64 mb-8 md:mb-0 hover:cursor-pointer' 
            src='/logo.svg'
            onClick={() => goHome()}
        />
  
        <div>
            {
                user ? (
                    <div className='flex items-center'>
                        <p className='2xl:mr-10 md:mr-2 2xl:text-xl md:text-lg uppercase text-red-500 font-bold hover:underline hover:decoration-4 tracking-wider'>{user.name}</p>
                        <button
                            type='button'
                            className='text-black-500 hover:bg-slate-900 hover:text-white px-5 py-3 rounded-lg font-extrabold text-xl uppercase'
                            onClick={() => logout()}
                        >Logout</button>
                    </div>
                ) : (
                    <>
                    <Link legacyBehavior href='/login'>
                        <a className='text-red-500 hover:bg-red-500 hover:text-white px-5 py-3 rounded-lg font-extrabold text-xl uppercase mr-2'>Login</a>
                    </Link>
                    <Link legacyBehavior href='/createAccount'>
                        <a className='text-black-500 hover:bg-slate-900 hover:text-white px-5 py-3 rounded-lg font-extrabold text-xl uppercase'>Register</a>
                    </Link>
                    </>
                )
            }
        </div>
    </header>
  )
}

export default Header