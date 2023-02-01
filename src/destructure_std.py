import src.processlayer as processlayer

#dummy data - to be replaced by request

data = [
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

]

graph = [
    [0],
    [1],
    [2],
    [3],
    [4],
    [5],
    [6],
]

others = {
    'batch_size' : 64,
    'num_classes' : 10,
    'epochs' : 15,
    'learning_rate' : 0.01,
    'dataset' : 'MNIST'
}

def getnode(nodes) :
    listofnodes = []

    for node in nodes :

        if node['layer']=='linear' :

            listofnodes.append(processlayer.linear(node))
        elif node['layer']=='activation':
            listofnodes.append(processlayer.activation(node))
        else :
            listofnodes.append(processlayer.other(node))
    
    return listofnodes




def generateself(nodeslist):
    n = len(nodeslist)
    res = '''
        self.flatten = nn.Flatten()
        '''
    for i in range(n):
        # res += f"self.node{i+1}({nodes[i]['name']}) =  {nodeslist[i]}\n"
        res += f'''self.node{i+1} =  {nodeslist[i]}
        '''
    return res


def generateforward(nodeslist, graph):
    n = len(nodeslist)

    res = '''x = self.flatten(x)
        '''
    res += f'''nodeoutputs = [] 
        '''
    res += '''nodeoutputs.append(x)
        '''

    for index, node in enumerate(graph):

        inp = ''''''
        for i in node:
            inp += f'''nodeoutputs[{i}] + '''
        inp = inp[:-3]
        res += f'''nodeoutputs.append(self.node{index+1}({inp}))
        '''

    return res





def getstdmodel(data,graph,others,commit_id) :
    nodes = getnode(data)
    model = f'''
#imports
import torch
import torch.nn as nn
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


device = "cuda" if torch.cuda.is_available() else "cpu"

model = MyModel().to(device)

loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.SGD(model.parameters(), lr=learning_rate)

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

torch.save(model, "{commit_id}.pt")
print("Mode saved as {commit_id}.pt")

'''
    inference = '''
#MAKE PREDICTIONS
model.eval()
_,(data,target) = next(enumerate(test_dataset))
data = data.to(device)
target = target.to(device)
prediction = model(data)
_,pred = torch.max(prediction,1)
print('Predicted   :', ' '.join(str(p.item()) for p in pred))
print('Ground Truth:', ' '.join(str(t.item()) for t in target))


    '''
    return model,inference



#print(getstdmodel(data,graph,others))