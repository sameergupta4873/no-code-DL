import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState, useRef, use } from 'react'
import styles from './project-detail.module.css'
import ReactFlow, { Controls, Background, applyNodeChanges, addEdge, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    {
        id: '0',
        type: 'input',
        data: { label: 'Input Image' },
        position: { x: 0, y: 50 },
        sourcePosition: 'right'
    }
  ];

  const initialEdges = [];

  let id = 1;
  const getId = () => `${id++}`;


export default function Projetcs() {

//######################### REACT FLOW ###############################
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);


  const onDragStart = (event :any , data: any) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('data', JSON.stringify(data));
  };

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = JSON.parse(event.dataTransfer.getData('data'));

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        position,
        data: { label: `${data.label}`, nodeData: data },
        targetPosition: 'left',
        sourcePosition: 'right'
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
    //######################### REACT FLOW END ###############################

  
   //######################### DROP DOWNS ###############################
    const [showInput, setShowInput] = useState(false)
    const [showConvL, setShowConvL] = useState(false)
    const [showConvL2D, setShowConvL2D] = useState(false)
    const [showConvLT2D, setShowConvLT2D] = useState(false)
    const [showActL, setShowActL] = useState(false)
    const [showPadL, setShowPadL] = useState(false)
    const [showPoolMax, setShowPoolMax] = useState(false)
    const [showPoolAvT2D, setShowPoolAvT2D] = useState(false)
   //######################### DROP DOWNS END ###############################


   //######################### CONV2D JSON DATA ###############################
    const [conv2DIn, setConv2DIn] = useState(null);
    const [conv2DOut, setConv2DOut] = useState(null);
    const [conv2DKernel, setConv2DKernel] = useState(null);
    const [conv2DStride, setConv2DStride] = useState(null);
    const [conv2DPadding, setConv2DPadding] = useState(null);

    const conv2Data = {
        label : 'Convolution 2D',
        layer: 'convolution',
        name: 'con2d',
        args: {
            in_channels : conv2DIn,
            out_channels : conv2DOut,
            kernel_size : conv2DKernel,
            stride : conv2DStride,
            padding : conv2DPadding,
            dilation : 1,
            groups : 1,
            bias : 'True',
            padding_mode : 'zeros'
        }
    }
    
    //######################### CONVT2D JSON DATA ###############################
    const [convT2DIn, setConvT2DIn] = useState(null);
    const [convT2DOut, setConvT2DOut] = useState(null);
    const [convT2DKernel, setConvT2DKernel] = useState(null);
    const [convT2DStride, setConvT2DStride] = useState(null);
    const [convT2DPadding, setConvT2DPadding] = useState(null);

    const conv2TData = {
        label : 'Convolution T2D',
        layer: 'convolution',
        name: 'conT2d',
        args: {
            in_channels : convT2DIn,
            out_channels : convT2DOut,
            kernel_size : convT2DKernel,
            stride : convT2DStride,
            padding : convT2DPadding,
            dilation : 1,
            groups : 1,
            bias : 'True',
            padding_mode : 'zeros'
        }
    }

    //######################### Activation JSON DATA ###############################
    const [relu, setRelu] = useState(null);
    const [leakyRelu, setLeakyRelu] = useState(null);
    const [signoid, setSignoid] = useState(null);
    const [TanH, setTanh] = useState(null);
    const [sofmax, setSofmax] = useState(null);

    const activeData = {
        label : 'Activation',
        layer: 'activation',
        args: {
            relu: relu,
            leakyRelu: leakyRelu,
            signoid: signoid,
            tanh: TanH,
            sofmax: sofmax
        }
    }

    //#########################  MaxPool JSON DATA ###############################
    const [maxKernel, setMaxKernel] = useState(null);
    const [maxStride, setMaxStride] = useState(null);
    const [maxPadding, setMaxPadding] = useState(null);

    const maxPool = {
        label : 'MaxPool',
        layer : 'pooling',
        name : 'maxpool2d',
        args : {
            kernel_size : maxKernel,
            stride : maxStride,
            padding : maxPadding,
            dilation : 1,
            return_indices : 'False',
            ceil_mode : 'False'
        }
    }
    

    //#########################  Average JSON DATA ###############################
    const [avgKernel, setAvgKernel] = useState(null);
    const [avgPadding, setAvgPadding] = useState(null);
    const [avgStride, setAvgStride] = useState(null);
    
    const avgPool = {
        label : 'Average Pool',
        layer : 'pooling',
        name : 'avgPool',
        args : {
            kernel_size : avgKernel,
            stride : avgStride,
            padding : avgPadding,
            dilation : 1,
            return_indices : 'False',
            ceil_mode : 'False'
        }
    }

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>
        Project Name
    </h1>
      <main className={styles.main}>



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
                            <input type="number" id="input-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 "  onChange={(e)=>{setConv2DIn(e.target.value)}}/>
                        </div>
                        <div className='my-3'>
                            <label htmlFor="output-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Out Channel</label>
                            <input type="number" id="output-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " onChange={(e)=>{setConv2DOut(e.target.value)}}/>
                        </div>
                        <div className='my-0'>
                            <label htmlFor="kernel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Kernel Size</label>
                            <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e)=>{setConv2DKernel(e.target.value)}}/>
                        </div>
                        <div className='my-0'>
                            <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Stride</label>
                            <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e)=>{setConv2DStride(e.target.value)}}/>
                        </div>
                        <div className='my-0'>
                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Padding</label>
                            <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" onChange={(e)=>{setConv2DPadding(e.target.value)}}/>
                        </div>
                        <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" draggable onDragStart={(event)=>{onDragStart(event, conv2Data)}}>
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
                            <input type="number" id="input-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " onChange={(e)=>{setConvT2DIn(e.target.value)}}/>
                        </div>
                        <div className='my-3'>
                            <label htmlFor="output-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Out Channel</label>
                            <input type="number" id="output-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " onChange={(e)=>{setConvT2DOut(e.target.value)}}/>
                        </div>
                        <div className='my-0'>
                            <label htmlFor="kernel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Kernel Size</label>
                            <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e)=>{setConvT2DKernel(e.target.value)}}/>
                        </div>
                        <div className='my-0'>
                            <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Stride</label>
                            <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e)=>{setConvT2DStride(e.target.value)}}/>
                        </div>
                        <div className='my-0'>
                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Padding</label>
                            <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" onChange={(e)=>{setConvT2DPadding(e.target.value)}}/>
                        </div>
                    <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" draggable onDragStart={(event)=>{onDragStart(event, conv2TData)}}>
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
                    <input type="number" id="input-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " onChange={(e)=>{setRelu(e.target.value)}}/>
                </div>
                <div className='my-3'>
                    <label htmlFor="output-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Leaky ReLU</label>
                    <input type="number" id="output-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " onChange={(e)=>{setLeakyRelu(e.target.value)}}/>
                </div>
                <div className='my-0'>
                    <label htmlFor="kernel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Signoid</label>
                    <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e)=>{setSignoid(e.target.value)}}/>
                </div>
                <div className='my-0'>
                    <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >TanH</label>
                    <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e)=>{setTanh(e.target.value)}}/>
                </div>
                <div className='my-0'>
                    <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Sofmax</label>
                    <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" onChange={(e)=>{setSofmax(e.target.value)}}/>
                </div>
                    <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" draggable onDragStart={(event)=>{onDragStart(event, activeData)}} >
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
                            <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e)=>{setMaxKernel(e.target.value)}}/>
                        </div>
                        <div className='my-0'>
                            <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Stride</label>
                            <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e)=>{setMaxStride(e.target.value)}}/>
                        </div>
                        <div className='my-0'>
                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Padding</label>
                            <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" onChange={(e)=>{setMaxPadding(e.target.value)}}/>
                        </div>
                        <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" draggable onDragStart={(event)=>{onDragStart(event, maxPool)}}>
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
                        <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e)=>{setAvgKernel(e.target.value)}}/>
                    </div>
                    <div className='my-0'>
                        <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Stride</label>
                        <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e)=>{setAvgStride(e.target.value)}}/>
                    </div>
                    <div className='my-0'>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Padding</label>
                        <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" onChange={(e)=>{setAvgPadding(e.target.value)}}/>
                    </div>
                    <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" draggable onDragStart={(event)=>{onDragStart(event, avgPool)}}>
                        Add
                    </button>
                </div>
                    }
                </div>
            </>
            }
          </div>
        </div>
        
        <div className="w-[100%] px-10">
            <div className={styles.canvas} ref={reactFlowWrapper}>
                <ReactFlow 
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onInit={setReactFlowInstance}
                >
                    <Background />
                    <Controls />
                </ReactFlow>
                </div>
            </div>
      </main>
    </div>

  )
}