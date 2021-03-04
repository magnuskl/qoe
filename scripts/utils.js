// Set application state

function setState(_state) {
    switch(_state) {
        case states.START:
            document.getElementById('title').innerHTML = 'INSTRUCTIONS';

            player.hide();
            document.getElementById('start').style.display = '';
            document.getElementById('end').style.display = 'none';
            
            document.getElementById('first').style.display = 'none';
            document.getElementById('previous').style.display = 'none';
            document.getElementById('switch').style.display = 'none';
            document.getElementById('next').style.display = '';
            document.getElementById('last').style.display = 'none';

            break;
        case states.PLAYING:
            var title = 'Pair ' + (pairIdx + 1)
                + ' of ' + pairs.length
                + ' - Variant ' + (varIdx + 1)
                + ' of ' + pairs[0].length
                + ' - Click here to select';
            document.getElementById('title').innerHTML = title;

            document.getElementById('switch').innerHTML = (varIdx ? '\\' : '/');
           
            player.show();
            document.getElementById('start').style.display = 'none';
            document.getElementById('end').style.display = 'none';

            if (sel[pairIdx] == varIdx) {
                document.getElementById('player').style.border
                    = '7px solid #ffd700';
            } else {
                document.getElementById('player').style.border
                    = 'none';
            }
            
            document.getElementById('first').style.display = '';
            document.getElementById('previous').style.display = '';
            document.getElementById('switch').style.display = '';
            document.getElementById('next').style.display = '';
            document.getElementById('last').style.display = '';
            
            break;
        case states.END:
            document.getElementById('title').innerHTML = 'RESULTS';
            
            player.hide();
            document.getElementById('start').style.display = 'none';
            document.getElementById('end').style.display = '';
            
            document.getElementById('first').style.display = 'none';
            document.getElementById('previous').style.display = '';
            document.getElementById('next').style.display = 'none';
            document.getElementById('switch').style.display = 'none';
            document.getElementById('last').style.display = 'none';

            if (sel.indexOf(null) != -1) { // At least one pair not assessed
                document.getElementById('complete').style.display = 'none';
                document.getElementById('incomplete').style.display = '';
            }
            else { // All pairs assessed
                var data = '';
                for (i = 0; i < pairs.length; i++) {
                    data += pairs[i][0] + ','
                         +  pairs[i][1] + ','
                         +  sel[i] + '\n';
                    
                }
                document.getElementById('data').value = data;

                document.getElementById('complete').style.display = '';
                document.getElementById('incomplete').style.display = 'none';
            }
            
            break;
    }
    state = _state;
}

// Generate combinations of array

function combinations(arr, k) {
    var i, j, combs, head, tailcombs;

    if (k > arr.length || k <= 0) {
        return [];
    }

    if (k == arr.length) {
        return [arr];
    }

    if (k == 1) {
        combs = [];
        for (i = 0; i < arr.length; i++) {
            combs.push([arr[i]]);
        }
        return combs;
    }

    combs = [];
    for (i = 0; i < arr.length - k + 1; i++) {
        head = arr.slice(i, i + 1);
        tailcombs = combinations(arr.slice(i + 1), k - 1);
        
        for (j = 0; j < tailcombs.length; j++) {
            combs.push(head.concat(tailcombs[j]));
        }
    }
    return combs;
}

// Shuffle array

function shuffle(arr) {
    var curIdx = arr.length, tmp, rndIdx;

    while (0 !== curIdx) {
        if (Array.isArray(arr[curIdx])) shuffle(arr[curIdx]);

        rndIdx = Math.floor(Math.random() * curIdx);
        curIdx -= 1;

        tmp = arr[curIdx];
        arr[curIdx] = arr[rndIdx];
        arr[rndIdx] = tmp;
    }

    return arr;
}

// Generate UUID

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).
    toString(16)
    );
}


// Parse user agent

function parseUserAgent(userAgent, callback) {
    const xhttp = new XMLHttpRequest();
    const endpoint = 'https://api.whatismybrowser.com/api/v2/user_agent_parse';
    const apiKey = '312a75e595dea88a28907f8d88e0eeb9';
    const body = { 'user_agent' : userAgent };

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.response);
            callback(response.parse.simple_software_string);
        }
    }

    xhttp.open ('POST', endpoint, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader('X-API-KEY', apiKey);
    xhttp.send(JSON.stringify(body));
}

function parseUserAgentHandler(userAgent) {
    document.getElementById('agent').value = userAgent ? userAgent : 'Unknown';
}
