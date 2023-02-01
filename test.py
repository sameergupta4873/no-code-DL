import requests
import json

url = 'http://127.0.0.1:5000/cnn'

data = {
    'nodes': [
        {
            'id': 1,
            'layer': 'linear',
            'name': 'linear',
            'args': {
                'in_features': 784,
                'out_features': 512,
                'bias': True,

            }
        },
        {
            'id': 2,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 3,
            'layer': 'linear',
            'name': 'linear',
            'args': {
                'in_features': 512,
                'out_features': 256,
                'bias': True,

            }
        },
        {
            'id': 4,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 5,
            'layer': 'linear',
            'name': 'linear',
            'args': {
                'in_features': 256,
                'out_features': 128,
                'bias': True,

            }
        },
        {
            'id': 6,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 7,
            'layer': 'linear',
            'name': 'linear',
            'args': {
                'in_features': 128,
                'out_features': 10,
                'bias': True,

            }
        },

    ],

    'adjList': [
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
    ],

    'others': {
        'batch_size': 64,
        'num_classes': 10,
        'epochs': 15,
        'learning_rate': 0.01,
        'dataset': 'MNIST'
    }

}

data_conv = {
    'nodes': [
        # {
        #     'id': 0,
        #     'layer': 'input',
        #     'name': 'input',
        #     'args': {
        #         'in_channels': 3,
        #     }
        # },
        {
            'id': 1,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 1,
                'out_channels': 10,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'same\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 2,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 3,
            'layer': 'pooling',
            'name': 'maxpool2d',
            'args': {
                'kernel_size': 2,
                'stride': 2,
                'padding': 0,
                'dilation': 1,
                'return_indices': False,
                'ceil_mode': False
            }
        },
        {
            'id': 4,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 10,
                'out_channels': 20,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'same\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 5,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 6,
            'layer': 'pooling',
            'name': 'maxpool2d',
            'args': {
                'kernel_size': 2,
                'stride': 2,
                'padding': 0,
                'dilation': 1,
                'return_indices': False,
                'ceil_mode': False
            }
        },
        {
            'id': 7,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 30,
                'out_channels': 30,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'same\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 8,
            'layer': 'flatten',
            'name': 'flatten',
            'args': {
                'start_dim': 1,
                'end_dim': -1
            }
        },
        {
            'id': 9,
            'layer': 'linear',
            'name': 'linear',
            'args': {
                'in_features': 30*7*7,
                'out_features': 10,
                'bias': True,
            }
        }
    ],
    'adjList': [
        [0],
        [1],
        [2],
        [3],
        [4,1],
        [5],
        [6],
        [7],
        [8],
    ],
    'others': {
        'batch_size': 64,
        'num_classes': 10,
        'epochs': 15,
        'learning_rate': 0.01,
        'dataset': 'MNIST',
        'loss': 'CrossEntropy',
        'optimizer': 'SGD'
    }
}


data_unet = {
    'nodes': [
        {
            'id': 1,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 3,
                'out_channels': 64,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 2,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 3,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 64,
                'out_channels': 64,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 4,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        }, 
        {
            'id': 5,
            'layer': 'pooling',
            'name': 'maxpool2d',
            'args': {
                'kernel_size': 2,
                'stride': 2,
                'padding': 0,
                'dilation': 1,
                'return_indices': False,
                'ceil_mode': False
            }
        },
#BLOCK 2 
        {
            'id': 6,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 64,
                'out_channels': 128,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 7,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 8,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 128,
                'out_channels': 128,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 9,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 10,
            'layer': 'pooling',
            'name': 'maxpool2d',
            'args': {
                'kernel_size': 2,
                'stride': 2,
                'padding': 0,
                'dilation': 1,
                'return_indices': False,
                'ceil_mode': False
            }
        },
#BLOCK 3
        {
            'id': 11,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 128,
                'out_channels': 256,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 12,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 13,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 256,
                'out_channels': 256,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 14,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 15,
            'layer': 'pooling',
            'name': 'maxpool2d',
            'args': {
                'kernel_size': 2,
                'stride': 2,
                'padding': 0,
                'dilation': 1,
                'return_indices': False,
                'ceil_mode': False
            }
        },
#BLOCK 4
        {
            'id': 16,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 256,
                'out_channels': 512,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 17,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 18,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 512,
                'out_channels': 512,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 19,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 20,
            'layer': 'pooling',
            'name': 'maxpool2d',
            'args': {
                'kernel_size': 2,
                'stride': 2,
                'padding': 0,
                'dilation': 1,
                'return_indices': False,
                'ceil_mode': False
            }
        },
#BLOCK 5
        {
            'id': 21,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 512,
                'out_channels': 1024,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 22,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 23,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 1024,
                'out_channels': 1024,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 24,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        #donwsample ends

        #upsample starts

        {
            'id': 25,
            'layer': 'convolution',
            'name': 'conv_transpose2d',
            'args': {
                'in_channels': 1024,
                'out_channels': 512,
                'kernel_size': 2,
                'stride': 2,
                'padding': 0,
                'output_padding': 0,
                'groups': 1,
                'bias': True,
                'dilation': 1,
                'padding_mode': '\'zeros\''
            }
        },
#BLOCK 6
        {
            'id': 26,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 1024,
                'out_channels': 512,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 27,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 28,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 512,
                'out_channels': 512,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 29,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 30,
            'layer': 'convolution',
            'name': 'conv_transpose2d',
            'args': {
                'in_channels': 512,
                'out_channels': 256,
                'kernel_size': 2,
                'stride': 2,
                'padding': 0,
                'output_padding': 0,
                'groups': 1,
                'bias': True,
                'dilation': 1,
                'padding_mode': '\'zeros\''
            }
        },
#BLOCK 7
        {
            'id': 31,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 512,
                'out_channels': 256,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 32,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 33,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 256,
                'out_channels': 256,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 34,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 35,
            'layer': 'convolution',
            'name': 'conv_transpose2d',
            'args': {
                'in_channels': 256,
                'out_channels': 128,
                'kernel_size': 2,
                'stride': 2,
                'padding': 0,
                'output_padding': 0,
                'groups': 1,
                'bias': True,
                'dilation': 1,
                'padding_mode': '\'zeros\''
            }
        },
#BLOCK 8
        {
            'id': 36,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 256,
                'out_channels': 128,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 37,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 38,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 128,
                'out_channels': 128,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 39,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 40,
            'layer': 'convolution',
            'name': 'conv_transpose2d',
            'args': {
                'in_channels': 128,
                'out_channels': 64,
                'kernel_size': 2,
                'stride': 2,
                'padding': 0,
                'output_padding': 0,
                'groups': 1,
                'bias': True,
                'dilation': 1,
                'padding_mode': '\'zeros\''
            }
        },
#BLOCK 9    
        {
            'id': 41,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 128,
                'out_channels': 64,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 42,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 43,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 64,
                'out_channels': 64,
                'kernel_size': 3,
                'stride': 1,
                'padding': '\'valid\'',
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 44,
            'layer': 'activation',
            'name': 'relu',
            'args': {
                'inplace': False
            }
        },
        {
            'id': 45,
            'layer': 'convolution',
            'name': 'conv2d',
            'args': {
                'in_channels': 64,
                'out_channels': 1,
                'kernel_size': 1,
                'stride': 1,
                'padding': 0,
                'dilation': 1,
                'groups': 1,
                'bias': True,
                'padding_mode': '\'zeros\''
            }
        },
        {
            'id': 46,
            'layer': 'activation',
            'name': 'sigmoid',
            'args': {}
        }

    ],

    'adjList': [
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8],
        [9],
        [10],
        [11],
        [12],
        [13],
        [14],
        [15],
        [16],
        [17],
        [18],
        [19],
        [20],
        [21],
        [22],
        [23],
        [24],
        [25, 19],
        [26],
        [27],
        [28],
        [29],
        [30, 14],
        [31],
        [32],
        [33],
        [34],
        [35, 9],
        [36],
        [37],
        [38],
        [39],
        [40, 4],
        [41],
        [42],
        [43],
        [44],
        [45],
    ],

    'others': {
        'batch_size': 64,
        'num_classes': 10,
        'epochs': 15,
        'learning_rate': 0.01,
        'dataset': 'MNIST',
        'loss': 'CrossEntropy',
        'optimizer': 'SGD'
    }


}


#print(json.dumps(data))
payload = {'request' : json.dumps(data_unet)}
res = requests.post(url,data=payload)

print("CODE : \n", res.json()['code'])
#print("INFERENCE : \n",res.json()['inference'])