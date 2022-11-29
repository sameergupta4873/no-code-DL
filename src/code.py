#this was the initial shitty version - totally outdated now.

pre = '''
class Model(Module) :
    def __init__(self,num_channel=3,oc=10) :
        pass

    def forward(self,x) :
        
'''

function_signature  = {
    'conv' : 'torch.nn.Conv2d',
    'relu' : 'torch.nn.ReLU',
    'pool' : 'torch.nn.MaxPool2d',
    'tanh' : 'torch.nn.Tanh'
}


# def getcode(data) :
#     mid = '\t'
#     for k,v in data.items() :
#         v= v.split(' ')
#         if v[0] =='conv' :
#             mid+=(f"code for conv -> filter size :{ v[1] } \t no. of filters -> {v[2]} \n \t")
#         elif v[0] =='relu' :
#             mid+='code for relu \n \t'
#         elif v[0]=='pool' :
#             mid+='code for pooling \n \t'
    
    
#     return pre+mid


def get_args(layer,args) :
    if layer=='conv' :
        return f'({args[0]}, {args[1]}, {args[2]})'
    if layer=='relu' :
        return '()'
    if layer=='tanh' :
        return '()'
    if layer=='pool' :
        return f'({args[0]})'

def getcode(data) :
    mid='\t'
    for k,v in data.items() :
        v = v.split(' ')
        func_sig = function_signature[v[0]]
        args = get_args(v[0],v[1:])

        mid+='x = '+func_sig+args+'(x)\n \t'
    mid+='output = torch.nn.logSoftmax(x)\n\t'
    mid+='\n\treturn output\n'
    
    return pre+mid