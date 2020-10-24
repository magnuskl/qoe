// Previous pair

document.getElementById('previous').addEventListener('click', function() {
    switch(state) {
        case states.PLAYING:
            if (pairIdx > 0) {
                x = y = z = t = 0; // Reset camera position and seek time.
                var src = path + pairs[--pairIdx][0] + ext;
                player.src(src);
                setState(states.PLAYING);
            }
            else {
                setState(states.START);
            }
            break;
        case states.END:
            x = y = z = t = 0; // Reset camera position and seek time.
            var src = path + pairs[pairs.length - 1][0] + ext;
            player.src(src);
            setState(states.PLAYING);
            break;
    }
});

// Next pair

document.getElementById('next').addEventListener('click', function() {
    switch(state) {
        case states.START:
            x = y = z = t = 0; // Reset camera position and seek time.
            var src = path + pairs[0][0] + ext;
            player.src(src);
            setState(states.PLAYING);
            break;
        case states.PLAYING:
            if (pairIdx < pairs.length - 1) {
                var src = path + pairs[++pairIdx][0] + ext;
                x = y = z = t = 0; // Reset camera position and seek time.
                player.src(src);
                setState(states.PLAYING);
            } else {
                setState(states.END);
            }
            break;
        }
});

// Switch variant

document.getElementById('switch').addEventListener('click', function() {
    switch(state) {
        case states.PLAYING:
            // Conserve camera position and seek time.
            x = player.vr().camera.position.x;
            y = player.vr().camera.position.y;
            z = player.vr().camera.position.z;
            t = player.currentTime();

            varIdx = varIdx ^ 1;
            var src = path + pairs[pairIdx][varIdx] + ext;
            player.src(src);
            setState(states.PLAYING);

            break;
    }
});

// Select variant

document.getElementById('player').addEventListener('dblclick', function() {
    if (sel[pairIdx] == varIdx) {
        sel[pairIdx] = null;
    } else {
        sel[pairIdx] = varIdx;
    }

    setState(states.PLAYING);
});

// Start playback

player.on('play', function() {
    player.vr().camera.position.setX(x);
    player.vr().camera.position.setY(y);
    player.vr().camera.position.setZ(z);
    player.currentTime(t);
});


// Load window

window.addEventListener('load', function() {
    setState(states.START);
    document.getElementById('exp').value = uuidv4();
});
