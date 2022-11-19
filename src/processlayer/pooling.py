def pooling(node) :
    layer = node['layer']
    name = node['name']
    args = node['args']
    if layer == 'pooling' :
        if name == 'maxpool2d' :
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else None
            padding = args['padding'] if 'padding' in args else 0
            dilation = args['dilation'] if 'dilation' in args else 1
            return_indices = args['return_indices'] if 'return_indices' in args else False
            ceil_mode = args['ceil_mode'] if 'ceil_mode' in args else False
            return f'nn.MaxPool2d({kernel_size}, {stride}, {padding}, {dilation}, {return_indices}, {ceil_mode})'
        
        elif name == 'maxpool3d' :
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else None
            padding = args['padding'] if 'padding' in args else 0
            dilation = args['dilation'] if 'dilation' in args else 1
            return_indices = args['return_indices'] if 'return_indices' in args else False
            ceil_mode = args['ceil_mode'] if 'ceil_mode' in args else False
            return f'nn.MaxPool3d({kernel_size}, {stride}, {padding}, {dilation}, {return_indices}, {ceil_mode})'
        
        elif name == 'maxpool1d' :
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else None
            padding = args['padding'] if 'padding' in args else 0
            dilation = args['dilation'] if 'dilation' in args else 1
            return_indices = args['return_indices'] if 'return_indices' in args else False
            ceil_mode = args['ceil_mode'] if 'ceil_mode' in args else False
            return f'nn.MaxPool1d({kernel_size}, {stride}, {padding}, {dilation}, {return_indices}, {ceil_mode})'



        elif name == 'maxunpool2d' :
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else None
            padding = args['padding'] if 'padding' in args else 0
            return f'nn.MaxUnpool2d({kernel_size}, {stride}, {padding})'
        elif name == 'maxunpool3d' :
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else None
            padding = args['padding'] if 'padding' in args else 0
            return f'nn.MaxUnpool3d({kernel_size}, {stride}, {padding})'
        elif name == 'maxunpool1d' :
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else None
            padding = args['padding'] if 'padding' in args else 0
            return f'nn.MaxUnpool1d({kernel_size}, {stride}, {padding})'
        




        elif name == 'avgpool2d' :
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else None
            padding = args['padding']
            ceil_mode = args['ceil_mode'] if 'ceil_mode' in args else False
            count_include_pad = args['count_include_pad'] if 'count_include_pad' in args else True
            divisor_override = args['divisor_override'] if 'divisor_override' in args else None
            return f'nn.AvgPool2d({kernel_size}, {stride}, {padding}, {ceil_mode}, {count_include_pad}, {divisor_override})'
        
        elif name == 'avgpool3d' :
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else None
            padding = args['padding']
            ceil_mode = args['ceil_mode'] if 'ceil_mode' in args else False
            count_include_pad = args['count_include_pad'] if 'count_include_pad' in args else True
            divisor_override = args['divisor_override'] if 'divisor_override' in args else None
            return f'nn.AvgPool3d({kernel_size}, {stride}, {padding}, {ceil_mode}, {count_include_pad}, {divisor_override})'
        
        elif name == 'avgpool1d' :
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else None
            padding = args['padding']
            ceil_mode = args['ceil_mode'] if 'ceil_mode' in args else False
            count_include_pad = args['count_include_pad'] if 'count_include_pad' in args else True
            divisor_override = args['divisor_override'] if 'divisor_override' in args else None
            return f'nn.AvgPool1d({kernel_size}, {stride}, {padding}, {ceil_mode}, {count_include_pad}, {divisor_override})'
        


        elif name == 'lppool1d' :
            norm_type = args['norm_type']
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else None
            ceil_mode = args['ceil_mode'] if 'ceil_mode' in args else False
            return f'nn.LPPool1d({norm_type}, {kernel_size}, {stride}, {ceil_mode})'
        elif name == 'lppool2d' :
            norm_type = args['norm_type']
            kernel_size = args['kernel_size']
            stride = args['stride'] if 'stride' in args else None
            ceil_mode = args['ceil_mode'] if 'ceil_mode' in args else False
            return f'nn.LPPool2d({norm_type}, {kernel_size}, {stride}, {ceil_mode})'



        elif name == 'fractionalmaxpool2d' :
            kernel_size = args['kernel_size']
            output_size = args['output_size'] if 'output_size' in args else None
            output_ratio = args['output_ratio'] if 'output_ratio' in args else None
            return_indices = args['return_indices'] if 'return_indices' in args else False
            _random_samples = args['_random_samples'] if '_random_samples' in args else None
            return f'nn.FractionalMaxPool2d({kernel_size}, {output_size}, {output_ratio}, {return_indices}, {_random_samples})'

        elif name == 'fractionalmaxpool3d' :
            kernel_size = args['kernel_size']
            output_size = args['output_size'] if 'output_size' in args else None
            output_ratio = args['output_ratio'] if 'output_ratio' in args else None
            return_indices = args['return_indices'] if 'return_indices' in args else False
            _random_samples = args['_random_samples'] if '_random_samples' in args else None
            return f'nn.FractionalMaxPool3d({kernel_size}, {output_size}, {output_ratio}, {return_indices}, {_random_samples})'
        
        
        
        elif name == 'adaptive_maxpool2d' :
            output_size = args['output_size']
            return f'nn.AdaptiveMaxPool2d({output_size})'
        elif name == 'adaptive_maxpool3d' :
            output_size = args['output_size']
            return f'nn.AdaptiveMaxPool3d({output_size})'
        elif name == 'adaptive_maxpool1d' : 
            output_size = args['output_size']
            return f'nn.AdaptiveMaxPool1d({output_size})'
        
        
        elif name == 'adaptiveavgpool2d' :
            output_size = args['output_size']
            return f'nn.AdaptiveAvgPool2d({output_size})'
        
        elif name == 'adaptiveavgpool3d' :
            output_size = args['output_size']
            return f'nn.AdaptiveAvgPool3d({output_size})'
        
        elif name == 'adaptiveavgpool1d' :
            output_size = args['output_size']
            return f'nn.AdaptiveAvgPool1d({output_size})'
    