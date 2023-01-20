import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './projects.module.css'


export default function Projetcs() {
  const projectData = [
    {
      name : "Project 1",
      link : "project_id",
    },
    {
      name : "Project 2",
      link : "/project_id",
    },
    {
      name : "Project 3",
      link : "/project_id",
    },
    {
      name : "Project 4",
      link : "/project_id",
    }
  ]

  const router = useRouter();

  const [projects, setProjects] = useState(projectData)
  const [totalProjects, setTotalProjects] = useState(projectData.length+1)

  const addProjectHandler = () => {
    setTotalProjects(totalProjects+1)
    setProjects(projects => [...projects,{
      "name" : `Project ${totalProjects}`,
      "link" : "/project_id"
    }])
    router.push("/standard-networks/project-detail/project")
  }


  return (
    <div className={styles.container}>

      <main className={styles.main}>

        <h1 className={styles.title}>
            Your Projects
        </h1>
        <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white py-2 px-4 border border-[#0050f3] -500 hover:border-transparent rounded m-4" onClick={addProjectHandler}>
          New Project
        </button>
        <div className={styles.grid}>
          {projects.map((item)=>{
            return(
              <Link href="/standard-networks/project-detail/project" className={styles.card} key={item.name}>
                <p>{item.name} &rarr;</p>
              </Link>
            )
          })}
        </div>

      </main>
    </div>

  )
}
