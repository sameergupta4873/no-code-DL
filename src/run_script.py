import subprocess

def run():
    _ = subprocess.Popen(['python3', 'script.py'])

def run_script(code, commit_id) : 
    with open('script.py', 'w') as f:
        f . write(code)

    #the model should be saved on user_moels directory on server
    lines = open('script.py', 'r').readlines()
    lines[-2] = f"model.save('user_models/{commit_id}')\n"
    open('script.py', 'w').writelines(lines)
    run()


# import os
# import asyncio

# async def run() :
#      proc = await asyncio.create_subprocess_shell(
#         'python3 script.py',
#         stdout=asyncio.subprocess.PIPE,
#         stderr=asyncio.subprocess.PIPE)

#      stdout, stderr = await proc.communicate()
#      print(stdout)
#      print(stderr)


# def run_script(code):
#     # code = {
#     #     "code": "\n#imports\nimport torch\nimport torch.nn as nn\nfrom torch.utils.data import DataLoader\nfrom torchvision import datasets\nfrom torchvision.transforms import ToTensor\n\n\n#HYPERPARAMETERS\n\nbatch_size = 64\nnum_classes = 10\nepochs = 15\nlearning_rate = 0.01\n\n\n#dataset\ntraining_data = datasets.MNIST(\n    root='data',\n    train=True,\n    download=True,\n    transform=ToTensor()\n)\n\ntest_data = datasets.MNIST(\n    root='data',\n    train=False,\n    download=True,\n    transform=ToTensor()\n)\ntrain_dataset = DataLoader(training_data,batch_size=batch_size)\ntest_dataset = DataLoader(test_data,batch_size=batch_size)\n\n\n#model\nclass MyModel(nn.Module) :\n    def __init__(self,num_channels=1,num_classes=10) :\n        super(MyModel, self).__init__()\n        \n        self.flatten = nn.Flatten()\n        self.node1 =  nn.Linear(784, 512, True, None, None)\n        self.node2 =  nn.ReLU()\n        self.node3 =  nn.Linear(512, 256, True, None, None)\n        self.node4 =  nn.ReLU()\n        self.node5 =  nn.Linear(256, 128, True, None, None)\n        self.node6 =  nn.ReLU()\n        self.node7 =  nn.Linear(128, 10, True, None, None)\n        \n    def forward(self, x) :\n        x = self.flatten(x)\n        nodeoutputs = [] \n        nodeoutputs.append(x)\n        nodeoutputs.append(self.node1(nodeoutputs[0]))\n        nodeoutputs.append(self.node2(nodeoutputs[1]))\n        nodeoutputs.append(self.node3(nodeoutputs[2]))\n        nodeoutputs.append(self.node4(nodeoutputs[3]))\n        nodeoutputs.append(self.node5(nodeoutputs[4]))\n        nodeoutputs.append(self.node6(nodeoutputs[5]))\n        nodeoutputs.append(self.node7(nodeoutputs[6]))\n        \n        return nodeoutputs[-1]\n\n\ndevice = \"cuda\" if torch.cuda.is_available() else \"cpu\"\n\nmodel = MyModel().to(device)\n\nloss_fn = nn.CrossEntropyLoss()\noptimizer = torch.optim.SGD(model.parameters(), lr=learning_rate)\n\ntrain_losses = []\ntest_losses = []\ndef train(dataloader, model, loss_fn, optimizer):\n    size = len(dataloader.dataset)\n    model.train()\n    for batch, (X, y) in enumerate(dataloader):\n        X, y = X.to(device), y.to(device)\n\n        # Compute prediction error\n        pred = model(X)\n        loss = loss_fn(pred, y)\n\n\n        # Backpropagation\n        optimizer.zero_grad()\n        loss.backward()\n        optimizer.step()\n\n        if batch % 100 == 0:\n            loss, current = loss.item(), batch * len(X)\n            train_losses.append(loss)\n            print(f\"loss: {loss:>7f}  [{current:>5d}/{size:>5d}]\")\n\n\ndef test(dataloader, model, loss_fn):\n    size = len(dataloader.dataset)\n    num_batches = len(dataloader)\n    model.eval()\n    test_loss, correct = 0, 0\n    with torch.no_grad():\n        for X, y in dataloader:\n            X, y = X.to(device), y.to(device)\n            pred = model(X)\n            test_loss += loss_fn(pred, y).item()\n            correct += (pred.argmax(1) == y).type(torch.float).sum().item()\n    test_loss /= num_batches\n    correct /= size\n    print(f\"Test Error: \\n Accuracy: {(100*correct):>0.1f}%, Avg loss: {test_loss:>8f}\\n\")\n\nfor t in range(epochs):\n    print(f\"Epoch {t+1}\\n-------------------------------\")\n    train(train_dataset, model, loss_fn, optimizer)\n    test(test_dataset, model, loss_fn)\nprint(\"Done!\")\n\ntorch.save(model, \"MyModel.pt\")\nprint(\"Mode saved as MyModel.pt\")\n\n",
#     #     "inference": "\n#MAKE PREDICTIONS\nmodel.eval()\n_,(data,target) = next(enumerate(test_dataset))\ndata = data.to(device)\ntarget = target.to(device)\nprediction = model(data)\n_,pred = torch.max(prediction,1)\nprint('Predicted   :', ' '.join(str(p.item()) for p in pred))\nprint('Ground Truth:', ' '.join(str(t.item()) for t in target))\n\n\n    "
#     # }
#     with open('script.py', 'w') as f:
#         f . write(code)
#     #os.system('conda activate flask')
#     print("fsfas")
#     #asyncio.run(run())
#     os.system('python3 script.py & ')
#     print("done")
#     return