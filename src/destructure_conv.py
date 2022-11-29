import processlayer

#dummy data - to be replaced by request
data = [
    # {
    #     'id': 0,
    #     'layer': 'input',
    #     'name': 'input',
    #     'args': {
    #         'in_channels': 3,
    #     }
    # },
    {
        'id' : 1,
        'layer' : 'convolution',
        'name' : 'conv2d',
        'args' : {
            'in_channels' : 3,
            'out_channels' : 10,
            'kernel_size' : 3,
            'stride' : 1,
            'padding' : 0,
            'dilation' : 1,
            'groups' : 1,
            'bias' : True,
            'padding_mode' : 'zeros'
        }
    },
    {
        'id' : 2,
        'layer' : 'activation',
        'name' : 'relu',
        'args' : {
            'inplace' : False
        }
    },
    {
        'id' : 3,
        'layer' : 'pooling',
        'name' : 'maxpool2d',
        'args' : {
            'kernel_size' : 2,
            'stride' : 2,
            'padding' : 0,
            'dilation' : 1,
            'return_indices' : False,
            'ceil_mode' : False
        }
    },
    {
        'id' : 4,
        'layer' : 'convolution',
        'name' : 'conv2d',
        'args' : {
            'in_channels' : 10,
            'out_channels' : 20,
            'kernel_size' : 3,
            'stride' : 1,
            'padding' : 0,
            'dilation' : 1,
            'groups' : 1,
            'bias' : True,
            'padding_mode' : 'zeros'
        }
    },
    {
        'id' : 5,
        'layer' : 'activation',
        'name' : 'relu',
        'args' : {
            'inplace' : False
        }
    },
    {
        'id' : 6,
        'layer' : 'pooling',
        'name' : 'maxpool2d',
        'args' : {
            'kernel_size' : 2,
            'stride' : 2,
            'padding' : 0,
            'dilation' : 1,
            'return_indices' : False,
            'ceil_mode' : False
        }
    },
    {
        'id' : 7,
        'layer' : 'convolution',
        'name' : 'conv2d',
        'args' : {
            'in_channels' : 20,
            'out_channels' : 30,
            'kernel_size' : 3,
            'stride' : 1,
            'padding' : 0,
            'dilation' : 1,
            'groups' : 1,
            'bias' : True,
            'padding_mode' : 'zeros'
        }
    },
    {
        'id' : 8,
        'layer' : 'activation',
        'name' : 'softmax',
        'args' : {
        }
    },
]
graph = [
    [0],
    [1],
    [2],
    [3],
    [4],
    [5],
]



# request = {
#     'nodes' : data,
#     'adjList' : graph
# }


# generates the pytroch function signature for each of the nodes/layers in model
def getnodes(nodes) :


    listofnodes = []
    for node in nodes :
        print(node)
        if node['layer'] == 'input' :
            listofnodes.append(processlayer.input(node))
        elif node['layer'] == 'convolution' :
            listofnodes.append(processlayer.convolution(node))
        elif node['layer'] == 'activation' :
            listofnodes.append(processlayer.activation(node))
        elif node['layer'] == 'pooling' :
            listofnodes.append(processlayer.pooling(node))
        elif node['layer'] == 'flatten' :
            listofnodes.append(processlayer.flatten(node))
        elif node['layer'] == 'other' :
            listofnodes.append(processlayer.other(node))
        

            # case 'linear' :
            #     listofnodes.append(processlayer.linear(node))
            # case 'upsample' :
            #     listofnodes.append(processlayer.upsample(node))
            # case 'reshape' :
            #     listofnodes.append(processlayer.reshape(node))
            # case 'padding' :
            #     listofnodes.append(processlayer.padding(node))
            # case 'concat' :
            #     listofnodes.append(processlayer.concat(node))
        
    return listofnodes


   
#generates the body of the constructor - which contains the definition of each of the nodes
def generateself(nodeslist,nodes) :
    n = len(nodeslist)
    res = '\t'
    for i in range(n) :
        # res += f"self.node{i+1}({nodes[i]['name']}) =  {nodeslist[i]}\n"
        res += f"self.node{i+1} =  {nodeslist[i]}\n"
        res += '\t'
    return res


#generates the body of forward prop function which defines how the nodes/layers are connected wiht each other
def generateforward(nodeslist,nodes,graph) :
    n = len(nodeslist)

    res = '\t'
    
    res += f"nodeoutputs = [] \n\t"
    res += 'nodeoutputs.append(x)'
    res += '\n\t'

    for index,node in enumerate(graph) :

        inp = ''
        for i in node :
            inp  += f'nodesouput[{i}] + '
        inp = inp[:-3]
        res += f"nodeoutputs.append(self.node{index}({inp}))\n\t"

    return res



model = f'''
import torch
from  torch import nn
class MyModel(nn.Module) :
    def __init__(self,num_channels=1,num_classes=10) :
        super(MyModel, self).__init__()
        {generateself(getnodes(data),data)}
    def forward(self, x) :
        {generateforward(getnodes(data),data,graph)}
        return nodesouput[-1]


#this will be coming from user request     
INIT_LR = 1e-3
BATCH_SIZE = 64
EPOCHS = 10

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


model = MyModel(1,10).to(device)
opt = Adam(model.parameters(), lr=INIT_LR)
lossFn = nn.NLLLoss()

for epoch in range(EPOCHS) :
    model.train()
    totalTrainLoss = 0
	totalValLoss = 0

	trainCorrect = 0
	valCorrect = 0

	for (x, y) in trainDataLoader:

		(x, y) = (x.to(device), y.to(device))

		pred = model(x)
		loss = lossFn(pred, y)

		opt.zero_grad()
		loss.backward()
		opt.step()

		totalTrainLoss += loss
		trainCorrect += (pred.argmax(1) == y).type(
			torch.float).sum().item()

with torch.no_grad():

    model.eval()

    for (x, y) in valDataLoader:

        (x, y) = (x.to(device), y.to(device))

        pred = model(x)
        totalValLoss += lossFn(pred, y)

        valCorrect += (pred.argmax(1) == y).type(
            torch.float).sum().item()


torch.save(model, args["model"])
'''



def getconvmodel(data,graph) :
    model = f'''
import torch
from  torch import nn
class MyModel(nn.Module) :
    def __init__(self,num_channels=1,num_classes=10) :
        super(MyModel, self).__init__()
        {generateself(getnodes(data),data)}
    def forward(self, x) :
        {generateforward(getnodes(data),data,graph)}
        return nodesouput[-1]


#this will be coming from user request     
INIT_LR = 1e-3
BATCH_SIZE = 64
EPOCHS = 10

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


model = MyModel(1,10).to(device)
opt = Adam(model.parameters(), lr=INIT_LR)
lossFn = nn.NLLLoss()

for epoch in range(EPOCHS) :
    model.train()
    totalTrainLoss = 0
	totalValLoss = 0

	trainCorrect = 0
	valCorrect = 0

	for (x, y) in trainDataLoader:

		(x, y) = (x.to(device), y.to(device))

		pred = model(x)
		loss = lossFn(pred, y)

		opt.zero_grad()
		loss.backward()
		opt.step()

		totalTrainLoss += loss
		trainCorrect += (pred.argmax(1) == y).type(
			torch.float).sum().item()

with torch.no_grad():

    model.eval()

    for (x, y) in valDataLoader:

        (x, y) = (x.to(device), y.to(device))

        pred = model(x)
        totalValLoss += lossFn(pred, y)

        valCorrect += (pred.argmax(1) == y).type(
            torch.float).sum().item()


torch.save(model, args["model"])
'''
    return model
print(model)