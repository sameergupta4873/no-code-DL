#no need
def input (node) :
    layer = node['layer']
    args = node['args']
    if layer == 'input' :
        shape = args['in_channels']
        return f'nn.Input({shape})'