// First slide

document.getElementById('first').addEventListener('click', function() {
    if (state != states.PLAYING) { return; }
    
    setState(states.START);
});

// Previous slide

document.getElementById('previous').addEventListener('click', function() {
    switch(state) {
        case states.PLAYING:
            if (pairIdx > 0) {
                x = y = z = t = 0; // Reset camera position and seek time.
                pairIdx--;
                varIdx = 0;
                var src = path + pairs[pairIdx][varIdx] + ext;
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

// Switch variant

document.getElementById('switch').addEventListener('click', function() {
    if (state != states.PLAYING) { return; }
    
    // Conserve camera position and seek time.
    x = player.vr().camera.position.x;
    y = player.vr().camera.position.y;
    z = player.vr().camera.position.z;
    t = player.currentTime();

    varIdx = varIdx ^ 1;
    var src = path + pairs[pairIdx][varIdx] + ext;
    player.src(src);
    setState(states.PLAYING);
});

// Select variant

document.getElementById('player').addEventListener('dblclick', function() {
    if (state != states.PLAYING) { return; }

    if (sel[pairIdx] == varIdx) {
        sel[pairIdx] = null;
    } else {
        sel[pairIdx] = varIdx;
    }

    setState(states.PLAYING);
});

document.getElementById('title').addEventListener('click', function () {
    if (state != states.PLAYING) { return; }

    if (sel[pairIdx] == varIdx) {
        sel[pairIdx] = null;
    } else {
        sel[pairIdx] = varIdx;
    }

    setState(states.PLAYING);
});

// Next slide

document.getElementById('next').addEventListener('click', function() {
    switch(state) {
        case states.START:
            // x = y = z = t = 0; // Reset camera position and seek time.
            // pairIdx = varIdx = 0;
            var src = path + pairs[pairIdx][varIdx] + ext;
            player.src(src);
            setState(states.PLAYING);
            break;
        case states.PLAYING:
            if (pairIdx < pairs.length - 1) {
                pairIdx++;
                varIdx = 0;
                var src = path + pairs[pairIdx][varIdx] + ext;
                x = y = z = t = 0; // Reset camera position and seek time.
                player.src(src);
                setState(states.PLAYING);
            } else {
                setState(states.END);
            }
            break;
    }
});

// Last slide

document.getElementById('last').addEventListener('click', function() {
    if (state != states.PLAYING) { return; }
    
    setState(states.END);
});


// Submit data

document.getElementById('submit').addEventListener('click', function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('cand').disabled = true;
            document.getElementById('exp').disabled = true;
            document.getElementById('data').disabled = true;
            document.getElementById('submit').disabled = true;
            alert('Success! The data have been submitted.');
        }
    };
    
    var cand = document.getElementById('cand').value;
    var exp  = document.getElementById('exp').value;
    var time = new Date().getTime();
    var data = document.getElementById('data').value;
    var query = '?cand=' + cand
              + '&exp=' + exp
              + '&time=' + time
              + '&data=' + data;
    xhttp.open('GET', './scripts/submit.php' + encodeURI(query), true);
    xhttp.send();
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
