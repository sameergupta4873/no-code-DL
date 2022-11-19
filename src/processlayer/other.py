def other(node) :
    layer = node['layer']
    name = node['name']
    args = node['args']
    if layer == 'other' :
        if name == 'batchnorm' :
            num_features = args['num_features']
            eps = args['eps'] if 'eps' in args else 1e-05
            momentum = args['momentum'] if 'momentum' in args else 0.1
            affine = args['affine'] if 'affine' in args else True
            track_running_stats = args['track_running_stats'] if 'track_running_stats' in args else True
            return f'nn.BatchNorm({num_features}, {eps}, {momentum}, {affine}, {track_running_stats})'
        elif name == 'dropout' :
            p = args['p'] if 'p' in args else 0.5
            return f'nn.Dropout({p})'  
        elif name == 'dropout2d' :
            p = args['p'] if 'p' in args else 0.5
            return f'nn.Dropout2d({p})'
        elif name == 'dropout3d' :
            p = args['p'] if 'p' in args else 0.5
            return f'nn.Dropout3d({p})'
        elif name == 'instance_norm' :
            num_features = args['num_features']
            eps = args['eps'] if 'eps' in args else 1e-05
            momentum = args['momentum'] if 'momentum' in args else 0.1
            affine = args['affine'] if 'affine' in args else True
            track_running_stats = args['track_running_stats'] if 'track_running_stats' in args else True
            return f'nn.InstanceNorm({num_features}, {eps}, {momentum}, {affine}, {track_running_stats})'
        elif name == 'layer_norm' :
            normalized_shape = args['normalized_shape']
            eps = args['eps'] if 'eps' in args else 1e-05
            elementwise_affine = args['elementwise_affine'] if 'elementwise_affine' in args else True
            return f'nn.LayerNorm({normalized_shape}, {eps}, {elementwise_affine})'
        elif name == 'local_response_norm' :
            size = args['size']
            alpha = args['alpha'] if 'alpha' in args else 0.0001
            beta = args['beta'] if 'beta' in args else 0.75
            k = args['k'] if 'k' in args else 1
            return f'nn.LocalResponseNorm({size}, {alpha}, {beta}, {k})'
        elif name == 'pixel_shuffle' :
            upscale_factor = args['upscale_factor']
            return f'nn.PixelShuffle({upscale_factor})'
        elif name == 'pixel_unshuffle' :
            upscale_factor = args['upscale_factor']
            return f'nn.PixelUnshuffle({upscale_factor})'
        elif name == 'reflection_pad1d' :
            padding = args['padding']
            return f'nn.ReflectionPad1d({padding})'
        elif name == 'reflection_pad2d' :
            padding = args['padding']
            return f'nn.ReflectionPad2d({padding})'
        elif name == 'replication_pad1d' :
            padding = args['padding']
            return f'nn.ReplicationPad1d({padding})'
        elif name == 'replication_pad2d' :
            padding = args['padding']
            return f'nn.ReplicationPad2d({padding})'
        elif name == 'replication_pad3d' :
            padding = args['padding']
            return f'nn.ReplicationPad3d({padding})'
        elif name == 'zero_pad2d' :
            padding = args['padding']
            return f'nn.ZeroPad2d({padding})'
        elif name == 'zero_pad3d' :
            padding = args['padding']
            return f'nn.ZeroPad3d({padding})'
        elif name == 'upsample' :
            size = args['size']
            scale_factor = args['scale_factor'] if 'scale_factor' in args else None
            mode = args['mode'] if 'mode' in args else 'nearest'
            align_corners = args['align_corners'] if 'align_corners' in args else None
            return f'nn.Upsample({size}, {scale_factor}, {mode}, {align_corners})'
        elif name == 'upsample_nearest2d' :
            size = args['size']
            scale_factor = args['scale_factor'] if 'scale_factor' in args else None
            return f'nn.UpsampleNearest2d({size}, {scale_factor})'
        elif name == 'upsample_bilinear2d' :
            size = args['size']
            scale_factor = args['scale_factor'] if 'scale_factor' in args else None
            align_corners = args['align_corners'] if 'align_corners' in args else None
            return f'nn.UpsampleBilinear2d({size}, {scale_factor}, {align_corners})'
        elif name == 'upsample_trilinear3d' :
            size = args['size']
            scale_factor = args['scale_factor'] if 'scale_factor' in args else None
            align_corners = args['align_corners'] if 'align_corners' in args else None
            return f'nn.UpsampleTrilinear3d({size}, {scale_factor}, {align_corners})'
        # elif name == 'adaptive_avg_pool1d' :
        #     output_size = args['output_size']
        #     return f'nn.AdaptiveAvgPool1d({output_size})'
        # elif name == 'adaptive_avg_pool2d' :
        #     output_size = args['output_size']
        #     return f'nn.AdaptiveAvgPool2d({output_size})'
        # elif name == 'adaptive_avg_pool3d' :
        #     output_size = args['output_size']
        #     return f'nn.AdaptiveAvgPool3d({output_size})'
        # elif name == 'adaptive_max_pool1d' :
        #     output_size = args['output_size']
        #     return f'nn.AdaptiveMaxPool1d({output_size})'
        # elif name == 'adaptive_max_pool2d' :
        #     output_size = args['output_size']
        #     return f'nn.AdaptiveMaxPool2d({output_size})'
        # elif name == 'adaptive_max_pool3d' :
        #     output_size = args['output_size']
        #     return f'nn.AdaptiveMaxPool3d({output_size})'
        # elif name == 'avg_pool1d' :
        #     kernel_size = args['kernel_size']
        #     stride = args['stride'] if 'stride' in args else None
        #     padding = args['padding'] if 'padding' in args else 0
        #     ceil_mode = args['ceil_mode'] if 'ceil_mode' in args else False
        #     count_include_pad = args['count_include_pad'] if 'count_include_pad' in args else True
        #     return f'nn.AvgPool1d({kernel_size}, {stride}, {padding}, {ceil_mode}, {count_include_pad})'
        # elif name == 'avg_pool2d' :
        #     kernel_size = args['kernel_size']
        #     stride = args['stride'] if 'stride' in args else None
        #     padding = args['padding'] if 'padding' in args else 0
        #     ceil_mode = args['ceil_mode'] if 'ceil_mode' in args else False
        #     count_include_pad = args['count_include_pad'] if 'count_include_pad' in args else True
        #     return f'nn.AvgPool2d({kernel_size}, {stride}, {padding}, {ceil_mode}, {count_include_pad})'
        # elif name == 'avg_pool3d' :
        #     kernel_size = args['kernel_size']
        #     stride = args['stride'] if 'stride' in args else None
        #     padding = args['padding'] if 'padding' in args else 0
        #     ceil_mode = args['ceil_mode'] if 'ceil_mode' in args else False
        #     count_include_pad = args['count_include_pad'] if 'count_include_pad' in args else True
        #     return f'nn.AvgPool3d({kernel_size}, {stride}, {padding}, {ceil_mode}, {count_include_pad})'
        # elif name == 'fractional_max_pool2d' :
        #     kernel_size = args['kernel_size']
        #     output_size = args['output_size'] if 'output_size' in args else None
        #     output_ratio = args['output_ratio'] if 'output_ratio' in args else None
        #     return f'nn.FractionalMaxPool2d({kernel_size}, {output_size}, {output_ratio})'
        # elif name == 'fractional_max_pool3d' :
        #     kernel_size = args['kernel_size']
        #     output_size = args['output_size'] if 'output_size' in args else None
        #     output_ratio = args['output_ratio'] if 'output_ratio' in args else None
        #     return f'nn.FractionalMaxPool3d({kernel_size}, {output_size}, {output_ratio})'
        # elif name == 'max_pool1d' :
        #     kernel_size = args['kernel_size']
        #     stride = args['stride'] if 'stride' in args else None
        #     padding = args['padding'] if 'padding' in args else 0
        #     dilation = args['dilation'] if 'dilation' in args else 1
        #     return f'nn.MaxPool1d({kernel_size}, {stride}, {padding}, {dilation})'
        # elif name == 'max_pool2d' :
        #     kernel_size = args['kernel_size']
        #     stride = args['stride'] if 'stride' in args else None
        #     padding = args['padding'] if 'padding' in args else 0
        #     dilation = args['dilation'] if 'dilation' in args else 1
        #     return f'nn.MaxPool2d({kernel_size}, {stride}, {padding}, {dilation})'

        