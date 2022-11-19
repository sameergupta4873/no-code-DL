import requests

url = 'http://127.0.0.1:5000/cnn'


data ={'la yer1': 'conv 3 16 5', 'layer2': 'relu', 'layer3': 'pool 2', 'layer4': 'conv 16 64 3', 'layer5': 'relu', 'layer6': 'pool 3', 'layer7': 'conv 64 32 5', 'layer8': 'pool 5', 'layer9': 'tanh', 'layer10': 'conv 32 8 4', 'layer11': 'relu', 'layer12': 'pool 2', 'layer13': 'conv 8 3 3'}   

res = requests.post(url,data=data)

print(res.json())