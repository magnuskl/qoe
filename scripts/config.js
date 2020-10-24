let player    = null; // Video.js player object
let vjsConfig = null; // Video.js configuration object

function loadVideoJSConfig() {
    vjsConfig = {
        // Standard video element options
        'autoplay':        true,
        'loop':            true,
        'muted':           true,
        'preload':        'auto',
        'controls':        false,
        'dblclick':        false,
        // Video.js specific options
        'responsive':      true,
        'liveui':          true,
        'fill':            true,
        'sources':         [],
        'plugins': {
            'vr': {
                'projection': '360',
                'motionControls': false,
            }
        },
    };

    player = videojs('player', vjsConfig);
}

loadVideoJSConfig();
