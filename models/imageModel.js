const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    commits: [
        {
            commiter:{
                type: String
            },
            commitMessage: {
                type: String,
            },
            Node:[{
                data:{
                    label: {
                        type: String
                    },
                    nodeData:{
                        args:{
                            bias:{
                                type: String
                            },
                            dilation:{
                                type: Number
                            },
                            groups:{
                                type: Number
                            },
                            in_channels:{
                                type: Number
                            },
                            kernel_size:{
                                type: Number
                            },
                            out_channels:{
                                type: Number
                            },
                            padding:{
                                type: Number
                            },
                            padding_mode:{
                                type: String
                            },
                            stride:{
                                type: Number
                            },
                            leakyRelu:{
                                type: Number
                            },
                            relu:{
                                type: Number
                            },
                            signoid:{
                                type: Number
                            },
                            sofmax: {
                                type: Number
                            },
                            tanh: {
                                type: Number
                            },
                            ceil_mode: {
                                type: String,
                                default: "False"
                            },
                            dilation: {
                                type: Number
                            },
                            padding: {
                                type: Number
                            },
                            dilation: {
                                type: Number
                            },
                            return_indices: {
                                type: String,
                                default: "False"
                            },
                            stride: {
                                type: Number
                            }
                        },
                        label:{
                            type: String
                        },
                        layer:{
                            type: String
                        },
                        name:{
                            type: String
                        }
                    }
                },
                dragging:{
                    type: Boolean,
                    default: false
                },
                height:{
                    type: Number,
                    default: 40
                },
                id: {
                    type: String
                },
                position: {
                    x:{
                        type: Number
                    },
                    y:{
                        type: Number
                    }
                },
                positionAbsolute: {
                    x:{
                        type: Number
                    },
                    y:{
                        type: Number
                    }
                },
                selected:{
                    type: Boolean,
                    default: false
                },
                sourcePosition:{
                    type: String,
                    default: 'right'
                },
                targetPosition:{
                    type: String
                },
                width:{
                    type: Number,
                    default: 150
                }
            }],
            edgeData:[{
                source: {
                    type: String,
                },
                sourceHandles: {
                    type: String,
                },
                target: {
                    type: String
                },
                targetHandles: {
                    type: String
                },
                id : {
                    type: String
                }
            }]
        }
    ],
    members: [
        {
            name: {
                type: String,
            },
            isAuthor: {
                type: Boolean,
                default: false
            },
            access: {
                type: Boolean,
                default: false
            }
        }
    ],
    conversation: [
        {
            subject:{
                type: String,
                // required: true
            },
            message: {
                type: String,
                // required: true
            },
            author: {
                type: String,
                // required: true
            },
        }
    ]

},{timestamps: true}
);

const Image = mongoose.model('Image',imageSchema)

module.exports = Image