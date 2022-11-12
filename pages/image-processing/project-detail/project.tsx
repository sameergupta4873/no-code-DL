import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './project-detail.module.css'


export default function Projetcs() {
  const router = useRouter();

    const [showInput, setShowInput] = useState(false)
    const [showConvL, setShowConvL] = useState(false)
    const [showConvL2D, setShowConvL2D] = useState(false)
    const [showConvLT2D, setShowConvLT2D] = useState(false)
    const [showActL, setShowActL] = useState(false)
    const [showPadL, setShowPadL] = useState(false)
    const [showPoolMax, setShowPoolMax] = useState(false)
    const [showPoolAvT2D, setShowPoolAvT2D] = useState(false)

    const [layers, setLayers] = useState([
        {
            name : "Input",
            value : "value"
        },
    ])

    const title = ""

    const addHandler = (title: any) => {
        console.log(title)
        setLayers((layers) => [...layers,{name: `${title}`, value:"value"}])
    }

  return (
    <div className={styles.container}>

      <main className={styles.main}>

        <h1 className={styles.title}>
            Project Name
        </h1>


        <div className={styles.grid}>
          <div className={styles.card} >
            <h2 onClick={() => setShowInput(!showInput)}>Input Layer <span className={"text-sm"}>&#9698;</span></h2>
            {showInput && 
            <>
            <div>
                <label htmlFor="image-size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Image Size</label>
                <input type="number" id="image-size" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3" />
            </div>
            <div>
                <label htmlFor="examples" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >No. of Examples</label>
                <input type="number" id="examples" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3" />
            </div>
            <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white py-2 px-4 border border-[#0050f3] -500 hover:border-transparent rounded my-2 px-7 mb-4 ml-40" onClick={() => addHandler("Input")}>
                Add
            </button>
        </>
            }
          </div>
          <div  className={styles.card} >
            <h2 onClick={() => setShowConvL(!showConvL)}>Convolution Layers <span className={"text-sm"}>&#9698;</span></h2>
            {showConvL && 
            <>
                <div  className={styles.card3} >
                    <h3 onClick={() => {setShowConvLT2D(false); setShowConvL2D(true)} }>Convolution 2D <span className={"text-sm"}>&#9698;</span></h3>
                    {showConvL2D && 
                        <div className='grid gap-x-4 md:grid-cols-2'>
                        
                        <div className='my-3'>
                            <label htmlFor="input-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >In Channel</label>
                            <input type="number" id="input-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " />
                        </div>
                        <div className='my-3'>
                            <label htmlFor="output-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Out Channel</label>
                            <input type="number" id="output-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " />
                        </div>
                        <div className='my-0'>
                            <label htmlFor="kernel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Kernel Size</label>
                            <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" />
                        </div>
                        <div className='my-0'>
                            <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Stride</label>
                            <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" />
                        </div>
                        <div className='my-0'>
                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Padding</label>
                            <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" />
                        </div>
                        <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" onClick={() => addHandler("2D Convolution")}>
                            Add
                        </button>
                    </div>
                    }
                </div>
                <div  className={styles.card3} >
                    <h3 onClick={() => {setShowConvLT2D(true); setShowConvL2D(false)} }>Convolution Transpose 2D <span className={"text-sm"}>&#9698;</span></h3>
                    {showConvLT2D && 
                    <div className='grid gap-x-4 md:grid-cols-2'>
                        
                    <div className='my-3'>
                        <label htmlFor="input-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >In Channel</label>
                        <input type="number" id="input-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="output-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Out Channel</label>
                        <input type="number" id="output-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " />
                    </div>
                    <div className='my-0'>
                        <label htmlFor="kernel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Kernel Size</label>
                        <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" />
                    </div>
                    <div className='my-0'>
                        <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Stride</label>
                        <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" />
                    </div>
                    <div className='my-0'>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Padding</label>
                        <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" />
                    </div>
                    <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" onClick={() => addHandler("2D Convolution Transpose")}>
                        Add
                    </button>
                </div>
                    }
                </div>
            </>
            }
          </div>
          <div  className={styles.card} >
            <h2 onClick={() => setShowActL(!showActL)}>Activation Layer <span className={"text-sm"}>&#9698;</span></h2>
            {showActL && 
            <div className='grid gap-x-4 md:grid-cols-2'>
                        
                <div className='my-3'>
                    <label htmlFor="input-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >ReLU</label>
                    <input type="number" id="input-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " />
                </div>
                <div className='my-3'>
                    <label htmlFor="output-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Leaky ReLU</label>
                    <input type="number" id="output-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " />
                </div>
                <div className='my-0'>
                    <label htmlFor="kernel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Signoid</label>
                    <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" />
                </div>
                <div className='my-0'>
                    <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >TanH</label>
                    <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" />
                </div>
                <div className='my-0'>
                    <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Sofmax</label>
                    <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" />
                </div>
                    <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" onClick={() => addHandler("Active")}>
                        Add
                    </button>
                </div>
                }
          </div>
          <div  className={styles.card} >
            <h2 onClick={() => setShowPadL(!showPadL)}>Pooling Layer <span className={"text-sm"}>&#9698;</span></h2>
            {showPadL && 
                <>
                <div  className={styles.card3} >
                    <h3 onClick={() => {setShowPoolAvT2D(false); setShowPoolMax(true)} }>Maxpool 2D <span className={"text-sm"}>&#9698;</span></h3>
                    {showPoolMax && 
                        <div className='grid gap-x-4 md:grid-cols-2'>
                        <div className='my-0'>
                            <label htmlFor="kernel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Kernel Size</label>
                            <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" />
                        </div>
                        <div className='my-0'>
                            <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Stride</label>
                            <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" />
                        </div>
                        <div className='my-0'>
                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Padding</label>
                            <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" />
                        </div>
                        <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" onClick={() => addHandler("MaxPool")}>
                            Add
                        </button>
                    </div>
                    }
                </div>
                <div  className={styles.card3} >
                    <h3 onClick={() => {setShowPoolAvT2D(true); setShowPoolMax(false)} }>AveragePool 2D <span className={"text-sm"}>&#9698;</span></h3>
                    {showPoolAvT2D && 
                    <div className='grid gap-x-4 md:grid-cols-2'>
                    <div className='my-0'>
                        <label htmlFor="kernel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Kernel Size</label>
                        <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" />
                    </div>
                    <div className='my-0'>
                        <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Stride</label>
                        <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" />
                    </div>
                    <div className='my-0'>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Padding</label>
                        <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" />
                    </div>
                    <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" onClick={() => addHandler("AveragePool")}>
                        Add
                    </button>
                </div>
                    }
                </div>
            </>
            }
          </div>
        </div>
        <div className='my-4  p-28'></div>
        
        <div className="absolute bottom-10">
            <div className={styles.card2} >
                <h1 className="text-xl font-bold my-4">Layer Architecture</h1>
                {layers.slice(1).map((item)=>{
                    return(
                        <span>
                            <button className="bg-[#0050f3] hover:bg-[#0050f3] -500 text-white -700 font-semibold hover:text-[#0050f3] py-2 px-6 border border-[#0050f3] -500 hover:bg-transparent rounded my-2">
                                {item.name}
                            </button>
                            <span className="text-3xl">&#8212;</span>
                        </span>
                    )
                })}
            </div>
        </div>
      </main>
    </div>

  )
}