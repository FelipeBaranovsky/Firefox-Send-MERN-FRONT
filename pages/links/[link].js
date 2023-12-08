import Layout from "@/components/Layout";
import axiosClient from "@/config/axios";
import React, {useEffect, useState} from 'react';
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export async function getServerSideProps({params}) {
    const link = params.link;
    try {
        const response = await axiosClient.get(`/api/links/${link}`);
        return {
            props: {
                link: response.data
            }
        }
    } catch (error) {
        return {
            props: {
                link: {},
                error: error.response.data.msg
            }
        }
    }
}

export async function getServerSidePaths() {
    const response = await axiosClient.get('/api/links');
    const paths = response.data.links.map(link => ({
        params: { link: link.url }
    }));
    return {
        paths,
        fallback: false
    }
}

export default ({link,error}) => {
   
    const [isProtected, setIsProtected] = useState(link.password)
    const [password, setPassword] = useState("")
    const router = useRouter()

    useEffect(() => {
      if(error) {
        toast.error(error)
        error = null
        router.push('/')
      }
    }, [])
    
    

    const verifyPass = async e => {
        e.preventDefault();
        const data = {
            password
        }
        
        try {
            const response = await axiosClient.post(`/api/links/${link.link}`, data)
            setIsProtected(response.data.password)
            link.file = response.data.file
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    const download = () => {
        router.push(`${process.env.backendURL}/api/files/${link.file}`)
        router.push('/')
    }

    
    return (
        <Layout>
        {isProtected ? (
            <>
                <p className="text-center">Link protected, please enter password to access content...</p>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <div className='w-full max-w-lg'>
                            <form 
                                className='bg-white rounded shadow-md px-8 pt-6 pb-8 pb-4'
                                onSubmit={e => verifyPass(e)}
                            >
                                <div className='mb-4'>
                                    <label 
                                        className='block text-black text-sm font-bold mb-2'
                                        htmlFor='password'
                                    >Password</label>
                                    <input 
                                        type='password' 
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-name focus:shadow-outline' 
                                        id="password"
                                        placeholder="Link Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold hover:cursor-pointer"
                                    value="Validate password..."
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <>
                <h1 className="text-4xl text-center text-gray-700">Dowload your file:</h1>
                <div className="flex items-center justify-center mt-10">
                    <button onClick={download} className="bg-red-500 hover:bg-red-700 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer">Download here...</button>
                </div>
            </>
        )}
        </Layout>
    )
}