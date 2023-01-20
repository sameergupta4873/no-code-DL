import React from 'react'

const Timeline = () => {
    return (
        <div>

            <ol class="relative border-l border-gray-200 dark:border-gray-700">
                <li class="mb-10 ml-6">
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-[#000000]">
                        <img class="rounded-full shadow-lg" src="https://img.myloview.com.br/adesivos/human-icon-user-symbol-profile-sign-vector-illustration-700-216582565.jpg" alt="Bonnie image" />
                    </span>
                    <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-[#000000] dark:border-stone-800">
                        <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">just now</time>
                        <div class="text-sm font-normal text-gray-500 dark:text-gray-300">Bonnie moved <a href="#" class="font-semibold text-blue-600 dark:text-blue-500 hover:underline">Jese Leos</a> to <span class="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">Funny Group</span></div>
                    </div>
                </li>
                <li class="mb-10 ml-6">
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <img class="rounded-full shadow-lg" src="https://img.myloview.com.br/adesivos/human-icon-user-symbol-profile-sign-vector-illustration-700-216582565.jpg" alt="Thomas Lean image" />
                    </span>
                    <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-[#000000] dark:border-stone-800">
                        <div class="items-center justify-between mb-3 sm:flex">
                            <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">2 hours ago</time>
                            <div class="text-sm font-normal text-gray-500 lex dark:text-gray-300">Thomas Lean commented on  <a href="#" class="font-semibold text-gray-900 dark:text-white hover:underline">Flowbite Pro</a></div>
                        </div>
                    </div>
                </li>
                <li class="ml-6">
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <img class="rounded-full shadow-lg" src="https://img.myloview.com.br/adesivos/human-icon-user-symbol-profile-sign-vector-illustration-700-216582565.jpg" alt="Jese Leos image" />
                    </span>
                    <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-[#000000] dark:border-stone-800">
                        <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">1 day ago</time>
                        <div class="text-sm font-normal text-gray-500 lex dark:text-gray-300">Jese Leos has changed <a href="#" class="font-semibold text-blue-600 dark:text-blue-500 hover:underline">Pricing page</a> task status to  <span class="font-semibold text-gray-900 dark:text-white">Finished</span></div>
                    </div>
                </li>
            </ol>

        </div>
    )
}

export default Timeline