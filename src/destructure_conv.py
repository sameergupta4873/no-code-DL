import src.processlayer as processlayer

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
        
        elif node['layer'] == 'linear' :
            listofnodes.append(processlayer.linear(node))
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
def generateself(nodeslist) :
    n = len(nodeslist)
    res = ''
    for i in range(n) :
        # res += f"self.node{i+1}({nodes[i]['name']}) =  {nodeslist[i]}\n"
        res += f'''self.node{i+1} =  {nodeslist[i]}
        '''
    return res


#generates the body of forward prop function which defines how the nodes/layers are connected wiht each other
def generateforward(nodeslist,graph) :
    n = len(nodeslist)
    
    res = f'''nodeoutputs = [] 
        '''
    res += '''nodeoutputs.append(x)
        '''

    for index,node in enumerate(graph) :

        inp = '''self.concat('''
        for i in node :
            inp  += f'nodeoutputs[{i}], '
        inp = inp[:-2]
        res += f'''nodeoutputs.append(self.node{index+1}({inp})))
        '''

    return res






def getconvmodel(data,graph,others) :
    nodes = getnodes(data)
    model = f'''
#imports
import torch
import torch.nn as nn
import torchvision
from torch.utils.data import DataLoader
from torchvision import datasets
from torchvision.transforms import ToTensor


#HYPERPARAMETERS

batch_size = {others['batch_size']}
num_classes = {others['num_classes']}
epochs = {others['epochs']}
learning_rate = {others['learning_rate']}


#dataset
training_data = datasets.{others['dataset']}(
    root='data',
    train=True,
    download=True,
    transform=ToTensor()
)

test_data = datasets.{others['dataset']}(
    root='data',
    train=False,
    download=True,
    transform=ToTensor()
)
train_dataset = DataLoader(training_data,batch_size=batch_size)
test_dataset = DataLoader(test_data,batch_size=batch_size)



#model
class MyModel(nn.Module) :
    def __init__(self,num_channels=1,num_classes=10) :
        super(MyModel, self).__init__()
        {generateself(nodes)}
    def forward(self, x) :
        {generateforward(nodes,graph)}
        return nodeoutputs[-1]

    def concat(self, *args) :
        if len(args)==1 : return args[0]
        
        _,_,H_req,W_req = args[0].shape
        
        n_args = [a for a in args]
        for i in range(1,len(args)) :
            n_args[i] = torchvision.transforms.CenterCrop([H_req, W_req])(args[i])
        
        return torch.cat(n_args, axis=1)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


model = MyModel(1,10).to(device)
loss_fn = nn.{others['loss']}Loss()
optimizer = torch.optim.{others['optimizer']}(model.parameters(), lr=learning_rate)

train_losses = []
test_losses = []

def train(dataloader, model, loss_fn, optimizer):
    size = len(dataloader.dataset)
    model.train()
    for batch, (X, y) in enumerate(dataloader):
        X, y = X.to(device), y.to(device)

        # Compute prediction error
        pred = model(X)
        loss = loss_fn(pred, y)


        # Backpropagation
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        if batch % 100 == 0:
            loss, current = loss.item(), batch * len(X)
            train_losses.append(loss)
            print(f"loss: {{loss:>7f}}  [{{current:>5d}}/{{size:>5d}}]")


def test(dataloader, model, loss_fn):
    size = len(dataloader.dataset)
    num_batches = len(dataloader)
    model.eval()
    test_loss, correct = 0, 0
    with torch.no_grad():
        for X, y in dataloader:
            X, y = X.to(device), y.to(device)
            pred = model(X)
            test_loss += loss_fn(pred, y).item()
            correct += (pred.argmax(1) == y).type(torch.float).sum().item()
    test_loss /= num_batches
    correct /= size
    print(f"Test Error: \\n Accuracy: {{(100*correct):>0.1f}}%, Avg loss: {{test_loss:>8f}}\\n")

for t in range(epochs):
    print(f"Epoch {{t+1}}\\n-------------------------------")
    train(train_dataset, model, loss_fn, optimizer)
    test(test_dataset, model, loss_fn)
print("Done!")

torch.save(model, "MyModel.pt")
print("Mode saved as MyModel.pt")
'''
    return model





































# #print(getconvmodel(data,graph))
# model = f'''
# #imports
# import torch
# import torch.nn as nn
# from torch.utils.data import DataLoader
# from torchvision import datasets
# from torchvision.transforms import ToTensor


# #HYPERPARAMETERS


# test_data = datasets.MNIST(
#     root='data',
#     train=False,
#     download=True,
#     transform=ToTensor()
# )
# train_dataset = DataLoader(training_data,batch_size=batch_size)
# test_dataset = DataLoader(test_data,batch_size=batch_size)



# #model
# class MyModel(nn.Module) :
#     def __init__(self,num_channels=1,num_classes=10) :
#         super(MyModel, self).__init__()
#         {generateself(getnodes(data),data)}
#     def forward(self, x) :
#         {generateforward(getnodes(data),data,graph)}
#         return nodeoutputs[-1]

# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


# model = MyModel(1,10).to(device)
# opt = Adam(model.parameters(), lr=INIT_LR)
# lossFn = nn.NLLLoss()

# train_losses = []
# test_losses = []

# def train(dataloader, model, loss_fn, optimizer):
#     size = len(dataloader.dataset)
#     model.train()
#     for batch, (X, y) in enumerate(dataloader):
#         X, y = X.to(device), y.to(device)

#         # Compute prediction error
#         pred = model(X)
#         loss = loss_fn(pred, y)


#         # Backpropagation
#         optimizer.zero_grad()
#         loss.backward()
#         optimizer.step()

#         if batch % 100 == 0:
#             loss, current = loss.item(), batch * len(X)
#             train_losses.append(loss)
#             print(f"loss: {{loss:>7f}}  [{{current:>5d}}/{{size:>5d}}]")


# def test(dataloader, model, loss_fn):
#     size = len(dataloader.dataset)
#     num_batches = len(dataloader)
#     model.eval()
#     test_loss, correct = 0, 0
#     with torch.no_grad():
#         for X, y in dataloader:
#             X, y = X.to(device), y.to(device)
#             pred = model(X)
#             test_loss += loss_fn(pred, y).item()
#             correct += (pred.argmax(1) == y).type(torch.float).sum().item()
#     test_loss /= num_batches
#     correct /= size
#     print(f"Test Error: \\n Accuracy: {{(100*correct):>0.1f}}%, Avg loss: {{test_loss:>8f}}\\n")

# for t in range(epochs):
#     print(f"Epoch {{t+1}}\\n-------------------------------")
#     train(train_dataset, model, loss_fn, optimizer)
#     test(test_dataset, model, loss_fn)
# print("Done!")

# torch.save(model, "MyModel.pt")
# print("Mode saved as MyModel.pt")


# # for epoch in range(EPOCHS) :
# #     model.train()
# #     totalTrainLoss = 0
# # 	totalValLoss = 0

# # 	trainCorrect = 0
# # 	valCorrect = 0

# # 	for (x, y) in trainDataLoader:

# # 		(x, y) = (x.to(device), y.to(device))

# # 		pred = model(x)
# # 		loss = lossFn(pred, y)

# # 		opt.zero_grad()
# # 		loss.backward()
# # 		opt.step()

# # 		totalTrainLoss += loss
# # 		trainCorrect += (pred.argmax(1) == y).type(torch.float).sum().item()

# # with torch.no_grad():

# #     model.eval()

# #     for (x, y) in valDataLoader:

# #         (x, y) = (x.to(device), y.to(device))

# #         pred = model(x)
# #         totalValLoss += lossFn(pred, y)

# #         valCorrect += (pred.argmax(1) == y).type(
# #             torch.float).sum().item()


# # torch.save(model, args["model"])
# '''