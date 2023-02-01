def linear(node):
    layer = node['layer']
    name = node['name']
    args = node['args'] if 'args' in node else {}
    if layer == 'linear':
        if name == 'linear':
            in_features = args['in_features'] 
            out_features = args['out_features'] 
            bias = args['bias'] if 'bias' in args else True
            device = args['device'] if 'device' in args else None
            dtype = args['dtype'] if 'dtype' in args else None
            return f'nn.Linear({in_features}, {out_features}, {bias}, {device}, {dtype})'
