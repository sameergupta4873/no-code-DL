def convolution(node) :
    layer = node['layer']
    name = node['name']
    args = node['args']
    if layer == 'convolution' :
        if name == 'conv2d' :
            in_channels = args['in_channels']
            out_channels = args['out_channels']
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else 1
            padding = args['padding'] if 'padding' in args else 0
            dilation = args['dilation'] if 'dilation' in args else 1
            groups = args['groups'] if 'groups' in args else 1
            bias = args['bias'] if 'bias' in args else True
            padding_mode = args['padding_mode'] if 'padding_mode' in args else '\'zeros\''
            return f'nn.Conv2d({in_channels}, {out_channels}, {kernel_size}, {stride}, {padding}, {dilation}, {groups}, {bias}, {padding_mode})' 


        elif name == 'conv3d' :
            in_channels = args['in_channels']
            out_channels = args['out_channels']
            kernel_size = args['kernel_size'] 
            stride = args['stride'] if 'stride' in args else 1
            padding = args['padding'] if 'padding' in args else 0
            dilation = args['dilation'] if 'dilation' in args else 1
            groups = args['groups'] if 'groups' in args else 1
            bias = args['bias'] if 'bias' in args else True
            padding_mode = args['padding_mode'] if 'padding_mode' in args else 'zeros'
            return f'nn.Conv3d({in_channels}, {out_channels}, {kernel_size}, {stride}, {padding}, {dilation}, {groups}, {bias}, {padding_mode})'


        elif name == 'conv1d' :
            in_channels = args['in_channels']
            out_channels = args['out_channels']
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else 1
            padding = args['padding'] if 'padding' in args else 0
            dilation = args['dilation'] if 'dilation' in args else 1
            groups = args['groups'] if 'groups' in args else 1
            bias = args['bias'] if 'bias' in args else True
            padding_mode = args['padding_mode'] if 'padding_mode' in args else 'zeros'  
            return f'nn.Conv1d({in_channels}, {out_channels}, {kernel_size}, {stride}, {padding}, {dilation}, {groups}, {bias}, {padding_mode})'

            
        elif name == 'conv_transpose2d' :
            in_channels = args['in_channels']
            out_channels = args['out_channels']
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else 1
            padding = args['padding'] if 'padding' in args else 0
            output_padding = args['output_padding'] if 'output_padding' in args else 0
            groups = args['groups'] if 'groups' in args else 1
            bias = args['bias'] if 'bias' in args else True
            dilation = args['dilation'] if 'dilation' in args else 1
            padding_mode = args['padding_mode'] if 'padding_mode' in args else 'zeros'
            return f'nn.ConvTranspose2d({in_channels}, {out_channels}, {kernel_size}, {stride}, {padding}, {output_padding}, {groups}, {bias}, {dilation}, {padding_mode})'

        elif name == 'conv_transpose3d' :
            in_channels = args['in_channels']
            out_channels = args['out_channels']
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else 1
            padding = args['padding'] if 'padding' in args else 0
            output_padding = args['output_padding'] if 'output_padding' in args else 0
            groups = args['groups'] if 'groups' in args else 1
            bias = args['bias'] if 'bias' in args else True
            dilation = args['dilation'] if 'dilation' in args else 1
            padding_mode = args['padding_mode'] if 'padding_mode' in args else 'zeros'
            return f'nn.ConvTranspose3d({in_channels}, {out_channels}, {kernel_size}, {stride}, {padding}, {output_padding}, {groups}, {bias}, {dilation}, {padding_mode})'
        elif name == 'conv_transposed1d' :
            in_channels = args['in_channels']
            out_channels = args['out_channels']
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else 1
            padding = args['padding'] if 'padding' in args else 0
            output_padding = args['output_padding'] if 'output_padding' in args else 0
            groups = args['groups'] if 'groups' in args else 1
            bias = args['bias'] if 'bias' in args else True
            dilation = args['dilation'] if 'dilation' in args else 1
            padding_mode = args['padding_mode'] if 'padding_mode' in args else 'zeros'
            return f'nn.ConvTranspose1d({in_channels}, {out_channels}, {kernel_size}, {stride}, {padding}, {output_padding}, {groups}, {bias}, {dilation}, {padding_mode})'
        
        elif name == 'lazyconv2d' :
            out_channels = args['out_channels']
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else 1
            padding = args['padding'] if 'padding' in args else 0
            dilation = args['dilation'] if 'dilation' in args else 1
            groups = args['groups'] if 'groups' in args else 1
            bias = args['bias'] if 'bias' in args else True
            padding_mode = args['padding_mode'] if 'padding_mode' in args else 'zeros'
            return f'nn.LazyConv2d({out_channels}, {kernel_size}, {stride}, {padding}, {dilation}, {groups}, {bias}, {padding_mode})'

        elif name == 'lazyconv3d' :
            out_channels = args['out_channels']
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else 1
            padding = args['padding'] if 'padding' in args else 0
            dilation = args['dilation'] if 'dilation' in args else 1
            groups = args['groups'] if 'groups' in args else 1
            bias = args['bias'] if 'bias' in args else True
            padding_mode = args['padding_mode'] if 'padding_mode' in args else 'zeros'
            return f'nn.LazyConv3d({out_channels}, {kernel_size}, {stride}, {padding}, {dilation}, {groups}, {bias}, {padding_mode})'
        elif name == 'lazyconv1d' :
            out_channels = args['out_channels']
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else 1
            padding = args['padding'] if 'padding' in args else 0
            dilation = args['dilation'] if 'dilation' in args else 1
            groups = args['groups'] if 'groups' in args else 1
            bias = args['bias'] if 'bias' in args else True
            padding_mode = args['padding_mode'] if 'padding_mode' in args else 'zeros'
            return f'nn.LazyConv1d({out_channels}, {kernel_size}, {stride}, {padding}, {dilation}, {groups}, {bias}, {padding_mode})'
        elif name == 'lazyconvtranspose1d' :
            out_channels = args['out_channels']
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else 1
            padding = args['padding'] if 'padding' in args else 0
            output_padding = args['output_padding'] if 'output_padding' in args else 0
            groups = args['groups'] if 'groups' in args else 1
            bias = args['bias'] if 'bias' in args else True
            dilation = args['dilation'] if 'dilation' in args else 1
            padding_mode = args['padding_mode'] if 'padding_mode' in args else 'zeros'
            return f'nn.LazyConvTranspose1d({out_channels}, {kernel_size}, {stride}, {padding}, {output_padding}, {groups}, {bias}, {dilation}, {padding_mode})'
        elif name == 'lazyconvtranspose2d' :
            out_channels = args['out_channels']
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else 1
            padding = args['padding'] if 'padding' in args else 0
            output_padding = args['output_padding'] if 'output_padding' in args else 0
            groups = args['groups'] if 'groups' in args else 1
            bias = args['bias'] if 'bias' in args else True
            dilation = args['dilation'] if 'dilation' in args else 1
            padding_mode = args['padding_mode'] if 'padding_mode' in args else 'zeros'
            return f'nn.LazyConvTranspose2d({out_channels}, {kernel_size}, {stride}, {padding}, {output_padding}, {groups}, {bias}, {dilation}, {padding_mode})'
        elif name == 'lazyconvtranspose3d' :
            out_channels = args['out_channels']
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else 1
            padding = args['padding'] if 'padding' in args else 0
            output_padding = args['output_padding'] if 'output_padding' in args else 0
            groups = args['groups'] if 'groups' in args else 1
            bias = args['bias'] if 'bias' in args else True
            dilation = args['dilation'] if 'dilation' in args else 1
            padding_mode = args['padding_mode'] if 'padding_mode' in args else 'zeros'
            return f'nn.LazyConvTranspose3d({out_channels}, {kernel_size}, {stride}, {padding}, {output_padding}, {groups}, {bias}, {dilation}, {padding_mode})'
        elif name == 'unfold' :
            kernel_size = args['kernel_size']
            dilation = args['dilation'] if 'dilation' in args else 1
            padding = args['padding'] if 'padding' in args else 0
            stride = args['stride'] if 'stride' in args else 1
            return f'nn.Unfold({kernel_size}, {dilation}, {padding}, {stride})'
        elif name == 'fold' :
            output_size = args['output_size']
            kernel_size = args['kernel_size']
            dilation = args['dilation'] if 'dilation' in args else 1
            padding = args['padding'] if 'padding' in args else 0
            stride = args['stride'] if 'stride' in args else 1
            return f'nn.Fold({output_size}, {kernel_size}, {dilation}, {padding}, {stride})' 