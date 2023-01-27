import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState, useRef, use, useEffect } from 'react'
import styles from './project-detail.module.css'
import ReactFlow, { Controls, Background, applyNodeChanges, addEdge, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import ProjectBar from '../../../components/ProjectBar'
import Timeline from '../../../components/Timeline'
import axios from 'axios'






export default function Projetcs() {




    const [project, setProject] = useState(null);
    var isSave = false;

    let id = project && project.commits && project.commits.at(-1) ? project.commits.at(-1).Node.length : 1;
    const [initialNodes, setInitialNodes] = useState([
        {
            id: '0',
            type: 'input',
            data: { label: 'Input Image' },
            position: { x: 0, y: 50 },
            sourcePosition: 'right'
        }
    ]);
    //######################### REACT FLOW ###############################
    const [initialEdges, setInitialEdges] = useState([]);
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);


    const onDragStart = (event, data) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('data', JSON.stringify(data));
    };

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const data = JSON.parse(event.dataTransfer.getData('data'));

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: `${id}`,
                // id:'4',
                position,
                data: { label: `${data.label}`, nodeData: data },
                targetPosition: 'left',
                sourcePosition: 'right'
            };
            setNodes((nds) => nds.concat(newNode));
            id++;
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
        label: 'Convolution 2D',
        layer: 'convolution',
        name: 'con2d',
        args: {
            in_channels: conv2DIn,
            out_channels: conv2DOut,
            kernel_size: conv2DKernel,
            stride: conv2DStride,
            padding: conv2DPadding,
            dilation: 1,
            groups: 1,
            bias: 'True',
            padding_mode: 'zeros'
        }
    }

    //######################### CONVT2D JSON DATA ###############################
    const [convT2DIn, setConvT2DIn] = useState(null);
    const [convT2DOut, setConvT2DOut] = useState(null);
    const [convT2DKernel, setConvT2DKernel] = useState(null);
    const [convT2DStride, setConvT2DStride] = useState(null);
    const [convT2DPadding, setConvT2DPadding] = useState(null);

    const conv2TData = {
        label: 'Convolution T2D',
        layer: 'convolution',
        name: 'conT2d',
        args: {
            in_channels: convT2DIn,
            out_channels: convT2DOut,
            kernel_size: convT2DKernel,
            stride: convT2DStride,
            padding: convT2DPadding,
            dilation: 1,
            groups: 1,
            bias: 'True',
            padding_mode: 'zeros'
        }
    }

    //#########################Activation JSON DATA ###############################
    const [relu, setRelu] = useState(null);
    const [leakyRelu, setLeakyRelu] = useState(null);
    const [signoid, setSignoid] = useState(null);
    const [TanH, setTanh] = useState(null);
    const [sofmax, setSofmax] = useState(null);

    const activeData = {
        label: 'Activation',
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
        label: 'MaxPool',
        layer: 'pooling',
        name: 'maxpool2d',
        args: {
            kernel_size: maxKernel,
            stride: maxStride,
            padding: maxPadding,
            dilation: 1,
            return_indices: 'False',
            ceil_mode: 'False'
        }
    }


    //#########################  Average JSON DATA ###############################
    const [avgKernel, setAvgKernel] = useState(null);
    const [avgPadding, setAvgPadding] = useState(null);
    const [avgStride, setAvgStride] = useState(null);

    const avgPool = {
        label: 'Average Pool',
        layer: 'pooling',
        name: 'avgPool',
        args: {
            kernel_size: avgKernel,
            stride: avgStride,
            padding: avgPadding,
            dilation: 1,
            return_indices: 'False',
            ceil_mode: 'False'
        }
    }
    //#########################  //######################### 
    const router = useRouter();
    var project_id = router.query['id']
    const [tab, setTab] = useState('layer');
    const [commitMessage, setCommitMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [team, setTeam] = useState(false);
    const [addTeam, setAddTeam] = useState(false);

    if (typeof window !== "undefined") {
        var project_id_1 = window.location.href.split('=')[1]
        var project_id = project_id_1.split('&')[0]
    }
    const [user, setUser] = useState(null);

    const getImageHandler = async () => {
        try {
            const res = await axios.get(
                `http://localhost:4000/api/v1/images/${project_id}`,
            )
            setProject(res.data);
            setNodes(res.data.commits.at(-1).Node)
            setEdges(res.data.commits.at(-1).edgeData)
            setInitialNodes(res.data.commits.at(-1).Node)
            setInitialEdges(res.data.commits.at(-1).edgeData)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const commitData = {
        commiter: user ? user.name : "user",
        commitMessage: commitMessage,
        Node: nodes,
        edgeData: edges
    }

    const commitHandler = async () => {
        try {
            const res = await axios.post(
                `http://localhost:4000/api/v1/images/commit/${project_id}`,
                commitData,
            )
            setProject(res.data)
            setSuccess(true);
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    const [searchedUsers, setSearchedUsers] = useState(null);
    const [selected, setSelected] = useState(null);
    const searchUsersHandler = async (key) => {
        try {
            const res = await fetch(`http://localhost:4000/api/v1/users/find?search=${key}`)
            const data = await res.json()
            const userData = data
            if (userData) {
                setSearchedUsers(userData)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const addUserHandler = async () => {
        try {
            const res1 = await axios.post(
                `http://localhost:4000/api/v1/images/member/${project._id}`,
                {
                    name: selected.name,
                    access: true
                },
            )
            const res2 = await axios.post(
                `http://localhost:4000/api/v1/users/projects/${selected._id}`,
                {
                    project_id: project._id,
                    category: 'image',
                },
            )
            setSelected(null);
            window.location.reload();
            return ;
        } catch (error) {
            console.log(error)
        }
    }


    // fetch data
    useEffect(() => {
        const value = localStorage.getItem('user');
        const user = !!value ? JSON.parse(value) : undefined;
        setUser(user)
    }, [])

    useEffect(() => {
        if (!project) {
            getImageHandler()
        }
    }, [project])

    return (
        <div>
            {addTeam && <div className='absolute h-[1500px] w-screen bg-black z-100000 opacity-[0.9]'></div>}
            <div className="absolute top-16  w-full left-0">
                <ProjectBar project={project} setTab={setTab} />
            </div>
            {tab && tab === "layer" &&
                <>
                    <div className={styles.container}>
                        <main className={styles.main}>
                            <div className={styles.grid}>
                                <button class="text-black bg-white border-2 border-white hover:bg-black font-medium rounded-lg text-sm w-[150px] m-5 px-4 py-2 text-center inline-flex items-center hover:text-white  mx-5" onClick={() => setTeam(!team)}>
                                    Project Users
                                    <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>

                                {
                                    team &&
                                    <div class=" ml-5 mb-5 rounded-lg shadow w-[300px] bg-black no-scrollbar">
                                        <ul class="max-h-[250px] py-2 overflow-y-auto text-gray-700 dark:text-gray-200 no-scrollbar" aria-labelledby="dropdownUsersButton">
                                            {project && project.members.map((item) => {
                                                
                                                return (
                                                    <li>
                                                        <a class="flex justify-between items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                            <span className='flex'>
                                                                <img class="w-6 h-6 mr-2 rounded-full" src="https://img.myloview.com.br/adesivos/human-icon-user-symbol-profile-sign-vector-illustration-700-216582565.jpg" alt="Jese image" />
                                                                {item.name}
                                                            </span>
                                                            <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-xl mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                                                                {item.access ? 'collabrator' : 'viewer'}
                                                            </span>
                                                        </a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        <button class="flex items-center p-3 text-sm font-medium text-white border-t border-gray-200 rounded-b-lg bg-black  hover:underline w-full" onClick={() => setAddTeam(true)}>
                                            <svg class="w-5 h-5 mr-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
                                            Add new user
                                        </button>
                                    </div>
                                }{
                                    addTeam &&
                                    <div class="fixed my-[5%] mx-auto z-50 w-[700px] p-2 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                                        <div class="relative w-full h-full">
                                            <div class="relative bg-white rounded-lg shadow dark:bg-[#111111]">
                                                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => setAddTeam(false)}>
                                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                    <span class="sr-only">Close modal</span>
                                                </button>
                                                <div class="px-6 py-14 lg:px-8">
                                                    <span className="absolute top-9 right-[45%]">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                        </svg>
                                                    </span>
                                                    <h3 class="mt-5 text-center text-xl font-medium text-white">Add a collaborator to this project</h3>
                                                    <div class="mt-5">
                                                        <form class="flex items-center">
                                                            <label for="simple-search" class="sr-only">Search</label>
                                                            <div class="relative w-full">
                                                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                                                </div>
                                                                <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by username, full name or email" onChange={(e) => searchUsersHandler(e.target.value)} />
                                                            </div>
                                                        </form>


                                                        <div id="dropdownNotification" class="z-20 mt-5  w-full bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
                                                            <div class="divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden">
                                                                {searchedUsers && !selected ? searchedUsers.map((item) => {
                                                                    return (
                                                                        <>
                                                                            {item.email !== user.email && <a class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setSelected(item)}>
                                                                                <div class="flex-shrink-0">
                                                                                    <img src='https://img.myloview.com.br/adesivos/human-icon-user-symbol-profile-sign-vector-illustration-700-216582565.jpg' class="rounded-full w-11 h-11" alt="Jese image" />
                                                                                </div>
                                                                                <div class="w-full pl-3">
                                                                                    <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">{item.name}</span></div>
                                                                                    <div class="text-xs text-blue-600 dark:text-blue-500">{item.email} | invite collaborator</div>
                                                                                </div>
                                                                            </a>}</>)
                                                                }) : selected ? <a class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                                    <div class="flex-shrink-0">
                                                                        <img src='https://img.myloview.com.br/adesivos/human-icon-user-symbol-profile-sign-vector-illustration-700-216582565.jpg' class="rounded-full w-11 h-11" alt="Jese image" />
                                                                    </div>
                                                                    <div class="w-full pl-3">
                                                                        <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400 flex justify-between"><span class="font-semibold text-gray-900 dark:text-white">{selected.name}</span>
                                                                            <span className='mt-5 hover:bg-slate-800 rounded-md p-2' onClick={() => setSelected(null)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                            </svg>
                                                                            </span>
                                                                        </div>
                                                                        <div class="text-xs text-blue-600 dark:text-blue-500">{selected.email} | invite collaborator</div>
                                                                    </div>
                                                                </a> : <></>}
                                                            </div>
                                                        </div>
                                                        <button class="mt-5 w-[100%] text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-[#FFFFFF] dark:hover:bg-[#FFFFFF] dark:focus:ring-[#111111]" onClick={addUserHandler}>{!selected ? `Select a collabrator above` : `Add ${selected.name} as collabrator`}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
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
                                <div className={styles.card} >
                                    <h2 onClick={() => setShowConvL(!showConvL)}>Convolution Layers <span className={"text-sm"}>&#9698;</span></h2>
                                    {showConvL &&
                                        <>
                                            <div className={styles.card3} >
                                                <h3 onClick={() => { setShowConvLT2D(false); setShowConvL2D(true) }}>Convolution 2D <span className={"text-sm"}>&#9698;</span></h3>
                                                {showConvL2D &&
                                                    <div className='grid gap-x-4 md:grid-cols-2'>

                                                        <div className='my-3'>
                                                            <label htmlFor="input-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >In Channel</label>
                                                            <input type="number" id="input-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " onChange={(e) => { setConv2DIn(e.target.value) }} />
                                                        </div>
                                                        <div className='my-3'>
                                                            <label htmlFor="output-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Out Channel</label>
                                                            <input type="number" id="output-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " onChange={(e) => { setConv2DOut(e.target.value) }} />
                                                        </div>
                                                        <div className='my-0'>
                                                            <label htmlFor="kernel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Kernel Size</label>
                                                            <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e) => { setConv2DKernel(e.target.value) }} />
                                                        </div>
                                                        <div className='my-0'>
                                                            <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Stride</label>
                                                            <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e) => { setConv2DStride(e.target.value) }} />
                                                        </div>
                                                        <div className='my-0'>
                                                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Padding</label>
                                                            <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" onChange={(e) => { setConv2DPadding(e.target.value) }} />
                                                        </div>
                                                        <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" draggable onDragStart={(event) => { onDragStart(event, conv2Data) }}>
                                                            Add
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                            <div className={styles.card3} >
                                                <h3 onClick={() => { setShowConvLT2D(true); setShowConvL2D(false) }}>Convolution Transpose 2D <span className={"text-sm"}>&#9698;</span></h3>
                                                {showConvLT2D &&
                                                    <div className='grid gap-x-4 md:grid-cols-2'>

                                                        <div className='my-3'>
                                                            <label htmlFor="input-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >In Channel</label>
                                                            <input type="number" id="input-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " onChange={(e) => { setConvT2DIn(e.target.value) }} />
                                                        </div>
                                                        <div className='my-3'>
                                                            <label htmlFor="output-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Out Channel</label>
                                                            <input type="number" id="output-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " onChange={(e) => { setConvT2DOut(e.target.value) }} />
                                                        </div>
                                                        <div className='my-0'>
                                                            <label htmlFor="kernel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Kernel Size</label>
                                                            <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e) => { setConvT2DKernel(e.target.value) }} />
                                                        </div>
                                                        <div className='my-0'>
                                                            <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Stride</label>
                                                            <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e) => { setConvT2DStride(e.target.value) }} />
                                                        </div>
                                                        <div className='my-0'>
                                                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Padding</label>
                                                            <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" onChange={(e) => { setConvT2DPadding(e.target.value) }} />
                                                        </div>
                                                        <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" draggable onDragStart={(event) => { onDragStart(event, conv2TData) }}>
                                                            Add
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className={styles.card} >
                                    <h2 onClick={() => setShowActL(!showActL)}>Activation Layer <span className={"text-sm"}>&#9698;</span></h2>
                                    {showActL &&
                                        <div className='grid gap-x-4 md:grid-cols-2'>

                                            <div className='my-3'>
                                                <label htmlFor="input-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >ReLU</label>
                                                <input type="number" id="input-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " onChange={(e) => { setRelu(e.target.value) }} />
                                            </div>
                                            <div className='my-3'>
                                                <label htmlFor="output-channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Leaky ReLU</label>
                                                <input type="number" id="output-channel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 " onChange={(e) => { setLeakyRelu(e.target.value) }} />
                                            </div>
                                            <div className='my-0'>
                                                <label htmlFor="kernel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Signoid</label>
                                                <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e) => { setSignoid(e.target.value) }} />
                                            </div>
                                            <div className='my-0'>
                                                <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >TanH</label>
                                                <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e) => { setTanh(e.target.value) }} />
                                            </div>
                                            <div className='my-0'>
                                                <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Sofmax</label>
                                                <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" onChange={(e) => { setSofmax(e.target.value) }} />
                                            </div>
                                            <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" draggable onDragStart={(event) => { onDragStart(event, activeData) }} >
                                                Add
                                            </button>
                                        </div>
                                    }
                                </div>
                                <div className={styles.card} >
                                    <h2 onClick={() => setShowPadL(!showPadL)}>Pooling Layer <span className={"text-sm"}>&#9698;</span></h2>
                                    {showPadL &&
                                        <>
                                            <div className={styles.card3} >
                                                <h3 onClick={() => { setShowPoolAvT2D(false); setShowPoolMax(true) }}>Maxpool 2D <span className={"text-sm"}>&#9698;</span></h3>
                                                {showPoolMax &&
                                                    <div className='grid gap-x-4 md:grid-cols-2'>
                                                        <div className='my-0'>
                                                            <label htmlFor="kernel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Kernel Size</label>
                                                            <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e) => { setMaxKernel(e.target.value) }} />
                                                        </div>
                                                        <div className='my-0'>
                                                            <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Stride</label>
                                                            <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e) => { setMaxStride(e.target.value) }} />
                                                        </div>
                                                        <div className='my-0'>
                                                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Padding</label>
                                                            <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" onChange={(e) => { setMaxPadding(e.target.value) }} />
                                                        </div>
                                                        <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" draggable onDragStart={(event) => { onDragStart(event, maxPool) }}>
                                                            Add
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                            <div className={styles.card3} >
                                                <h3 onClick={() => { setShowPoolAvT2D(true); setShowPoolMax(false) }}>AveragePool 2D <span className={"text-sm"}>&#9698;</span></h3>
                                                {showPoolAvT2D &&
                                                    <div className='grid gap-x-4 md:grid-cols-2'>
                                                        <div className='my-0'>
                                                            <label htmlFor="kernel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Kernel Size</label>
                                                            <input type="number" id="kernel" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e) => { setAvgKernel(e.target.value) }} />
                                                        </div>
                                                        <div className='my-0'>
                                                            <label htmlFor="stride" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Stride</label>
                                                            <input type="number" id="stride" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1" onChange={(e) => { setAvgStride(e.target.value) }} />
                                                        </div>
                                                        <div className='my-0'>
                                                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Padding</label>
                                                            <input type="number" id="small-input" className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0" onChange={(e) => { setAvgPadding(e.target.value) }} />
                                                        </div>
                                                        <button className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4" draggable onDragStart={(event) => { onDragStart(event, avgPool) }}>
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
                                <div className='flex justify-between'>
                                    <div class="mt-[80px] w-[600px] ml-3">
                                        {
                                            commitMessage.length < 7 ?
                                                <input type="text" id="success" class="bg-green-50  px-5 border text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-stone-900" placeholder="Descriptive commit message at least 7 characters" onChange={(e) => setCommitMessage(e.target.value)} /> :
                                                <input type="text" id="success" class="bg-green-50  px-5 border text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-stone-900" placeholder="Descriptive commit message at least 7 characters" onChange={(e) => setCommitMessage(e.target.value)} value={commitMessage} />

                                        }
                                    </div>
                                    <div>
                                        <button type="button" class="mt-20 text-black font-medium rounded-lg text-sm px-4 py-2.5 border  dark:bg-[#FFFFFF] dark:hover:bg-black dark:hover:text-white dark:focus:ring-black" onClick={commitHandler} disabled={commitMessage.length < 7 ? true : false}><div className='flex'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2" >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                                        </svg>
                                            Commit</div></button>
                                        <button type="button" class="mt-20 text-black font-medium rounded-lg text-sm px-5 py-2.5 border ml-5  dark:bg-[#FFFFFF] dark:hover:bg-black dark:hover:text-white dark:focus:ring-black"><div className='flex'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                            Generate Code</div></button>
                                    </div>
                                </div>
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
                    {success &&
                        <div id="toast-success" class="fixed z-100 top-[80px] right-[10px] flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-600 dark:text-green-200">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Check icon</span>
                            </div>
                            <div class="ml-3 text-sm font-normal">Changes Commited Succesfully</div>
                            <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close" onClick={() => {
                                setSuccess(false);
                                setCommitMessage("")
                                window.location.reload()
                            }}>
                                <span class="sr-only">Close</span>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    }
                </>
            }
            {tab && tab === 'timeline' &&
                <div className='pt-52 px-32'>
                    <Timeline project={project} />
                </div>

            }
            {tab && tab === 'conversation' &&
                <p>Hi</p>

            }
        </div>
    )
}