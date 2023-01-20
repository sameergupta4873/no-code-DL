import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const ProjectBar = () => {
  const router = useRouter()
  const [user, setUser] = useState(null);
  useEffect(() => {
    const value = localStorage.getItem('user');
    const user = !!value ? JSON.parse(value) : undefined;
    if(user){
      setUser(user)
      return;
    }
    if (!user) {
        router.push('/auth/login')
        window.location.reload();
    }
}, [])
  return (
    <div className='pt-5 px-10 bg-[#000000] border-b border-stone-800'>
      <div className='flex'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14.25 6a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 11-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 111.06-1.06l2.25 2.25c.141.14.22.331.22.53zm-10.28-.53a.75.75 0 000 1.06l2.25 2.25a.75.75 0 101.06-1.06L8.56 12l1.72-1.72a.75.75 0 10-1.06-1.06l-2.25 2.25z" clip-rule="evenodd" />
        </svg>
        <h4 class="text-md dark:text-white px-1">{user && `${user.email} / project name`}</h4>
      </div>

      <div class="text-sm font-medium text-center text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-700 pt-1">
        <ul class="flex flex-wrap -mb-px">
          <li class="mr-2" onClick={()=>{router.push('project')}}>
            <a class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" aria-current="page">Layer Architecture</a>
          </li>
          <li class="mr-2" onClick={()=>{router.push('?=timeline')}}>
            <a  class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Timeline</a>
          </li>
          <li class="mr-2" onClick={()=>{router.push('?=conversation')}}>
            <a  class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Conversations</a>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default ProjectBar