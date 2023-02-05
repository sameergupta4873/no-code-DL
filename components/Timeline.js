import React from 'react'

const Timeline = ({ project }) => {
    return (
        <div>
            {project &&
                <ol class="relative border-l border-gray-200 dark:border-gray-700">
                    {project.commits.slice().reverse().map((commit) => {
                        return (
                            <li class="mb-5 ml-6">
                                <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-[#000000]">
                                    <img class="rounded-full shadow-lg" src="https://img.myloview.com.br/adesivos/human-icon-user-symbol-profile-sign-vector-illustration-700-216582565.jpg" alt="Bonnie image" />
                                </span>
                                <div className='mx-2 mt-1'>{commit.commiter}</div>
                                <div class="items-center p-4 justify-between bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-[#000000] dark:border-stone-800">
                                    <div className='flex flex-col'>
                                        <span className='text-lg'>{commit.commitMessage}</span>
                                        <span className='ml-3 text-stone-500'>commited just now</span>
                                    </div>
                                    <div>
                                        <span className='px-3 pt-2 pb-1 rounded-xl flex justify-between'>
                                            <span className='bg-stone-900  px-3 pt-2 pb-1 rounded-xl flex justify-between'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2" onClick={() => navigator.clipboard.writeText(`${commit._id}`)}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
                                            </svg>
                                            
                                            {commit._id}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            }
        </div>
    )
}

export default Timeline