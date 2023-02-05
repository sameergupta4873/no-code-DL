import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../../components/Navbar'
import styles from './projects.module.css'
import { listProductDetails, listProducts } from '../../../actions/productActions'


export default function Projetcs() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin)
  const { Loading, error, userInfo } = userLogin
  const productList = useSelector(state => state.productList)
  const { products } = productList

  const user = userInfo && userInfo.user
  const projectData = products


  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);



  const data = {
    name,
    commits: {
      commiter: user ? user.name : "user",
      commitMessage: `Project Created`,
      Node: [{
        data: {
          label: "Input Image",
          nodeData: {
            args: {
              "ceil_mode": "False",
              "return_indices": "False"
            }
          }
        },
        dragging: false,
        height: 40,
        id: "0",
        position: {
          x: 30,
          y: 109
        },
        positionAbsolute: {
          x: 30,
          y: 109
        },
        selected: false,
        sourcePosition: "right",
        width: 150,

      }]
    },
    members: {
      name: user ? user.name : "",
      isAuthor: true,
      access: true
    },
  }

  const addProjectHandler = async () => {
    try {
      const res1 = await axios.post(
        'http://localhost:4000/api/v1/images/create',
        data,
      )
      console.log(res1.data);
      dispatch(listProductDetails(res1.data))
      const res2 = await axios.post(
        `http://localhost:4000/api/v1/users/projects/${user._id}`,
        {
          "project_id": res1.data._id,
          "category": "image",
          "isAuthor": true
        },
      )
      console.log(res2.data);
      router.push(`/image-processing/project-detail/project?=${res2.data._id}`)
      return;
    } catch (error) {
      console.log(error)
    }
  }

  const clickHandler = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/images/${id}`,
      )
      dispatch(listProductDetails(res));
      console.log(res);
      router.push(`/image-processing/project-detail/project?=${res.data._id}`);
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    dispatch(listProducts(user._id));
  }, [dispatch]);




  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <main className={styles.main}>

          <h1 className={styles.title}>
            Image Processing Projects
          </h1>
          <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white py-2 px-4 border border-[#0050f3] -500 hover:border-transparent rounded m-4" onClick={() => setOpen(!open)}>
            New Project
          </button>



          {open &&
            <div class="fixed my-[10%] mx-auto z-50 w-[470px] p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
              <div class="relative w-full h-full max-w-md md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-[#000000]">
                  <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => setOpen(!open)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                  <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create a New Project</h3>
                    <div class="space-y-6">
                      <div>
                        <label for="owner" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Owner</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-900 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" value={"sameergup@gmail.com"} disabled />
                      </div>
                      <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
                        <input name="password" id="password" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-stone-900 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={(e) => setName(e.target.value)} />
                      </div>
                      <button class="w-full text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#FFFFFF] dark:hover:bg-[#FFFFFF] dark:focus:ring-[#111111]" onClick={addProjectHandler}>Create Project</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          }

          <div className={styles.grid}>
            {projectData && projectData.map((item) => {
              return (
                <button onClick={() => clickHandler(item.project_id)} className={styles.card} key={item.name}>
                  <p>{item.project_id} &rarr;</p>
                </button>
              )
            })}
          </div>

        </main>
      </div>
    </>
  )
}
