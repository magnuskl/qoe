// Global constants and variables

const path = './assets/dive/'; // Path to source files
const ext = '.mp4'; // Source file suffix
// Source file prefix
const src = ['480-23', '480-34', '720-23', '720-34', '1080-23', '1080-34'];

const states = { // Web application states
    START:   'start',
    PLAYING: 'playing',
    END:     'end'
}

var x = 0, y = 0, z = 0, t = 0; // Current camera position and seek time
var state   = states.START;  // Current application state
var pairIdx = 0;  // Current pair index (into pairs array)
var varIdx = 0;  // Current variant index (0 or 1)
var pairs = shuffle(combinations(src, 2)); // Randomized array of pairs
var sel   = []; // Selected variant from each pair
for(i = 0; i < pairs.length; i++) { sel[i] = null; };
