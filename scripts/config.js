let player    = null; // Video.js player object
let vjsConfig = null; // Video.js configuration object

function loadVideoJSConfig() {
    vjsConfig = {
        // Standard video element options
        'playsinline': true,
        'autoplay':    true,
        'loop':        true,
        'muted':       true,
        'preload':     'auto',
        'controls':    true,
        'dblclick':    false,
        // Video.js specific options
        'fill':       true,
        'sources':    [],
        'plugins': {
             'vr': {
                 'projection':     '360',
                 'motionControls': false,
             }
        },
    };

    player = videojs('player', vjsConfig);
}

loadVideoJSConfig();
