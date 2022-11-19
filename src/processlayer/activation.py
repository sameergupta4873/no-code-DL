def activation(node) :
    layer = node['layer']
    name = node['name']
    args = node['args'] if 'args' in node else {}
    if layer == 'activation' :
        if name == 'relu' :
            return 'nn.ReLU()'
        elif name == 'sigmoid' :
            return 'nn.Sigmoid()'
        elif name == 'tanh' :
            return 'nn.Tanh()'
        elif name == 'softmax' :
            dim = args['dim'] if 'dim' in args else None
            return f'nn.Softmax({dim})'
        elif name == 'logsoftmax' :
            dim = args['dim'] if 'dim' in args else None
            return f'nn.LogSoftmax({dim})'
        elif name == 'softplus' :
            beta = args['beta'] if 'beta' in args else 1
            threshold = args['threshold'] if 'threshold' in args else 20
            return f'nn.Softplus({beta}, {threshold})'
        elif name == 'softshrink' :
            lambd = args['lambd'] if 'lambd' in args else 0.5
            return f'nn.Softshrink({lambd})'
        elif name == 'softsign' :
            return 'nn.Softsign()'