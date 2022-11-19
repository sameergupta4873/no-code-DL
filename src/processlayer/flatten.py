def flatten(node) :
    layer = node['layer']
    name = node['name']
    args = node['args']
    if layer == 'flatten' :
        start_dim = args['start_dim'] if 'start_dim' in args else 1
        end_dim = args['end_dim'] if 'end_dim' in args else -1
        return f'nn.Flatten({start_dim}, {end_dim})'