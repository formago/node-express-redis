import uuidv4 from 'uuid/v4';
import redis from 'redis';

var client = redis.createClient();

function createTask(id, text) {
    this.identifer = id;
    this.text = text;
}

export function callCheckProcess(){
    setInterval(() => {
        var item = client.zrange('delayed', 0, 0, 'withscores', function (err, res) {
            if (err)
                console.error('There has been an error:', err);
            var currentTime = new Date().getTime();
            if (currentTime > parseInt(res[1])) {
                if (client.zrem('delayed', res[0])) {
                    client.rpush('queue', res[0]);
                }
            }
        });
    }, 1000);

    setInterval(() => {
        client.lpop('queue', function (error, data) {
            if (error) {
                console.error('There has been an error:', error);
            }
            if (data) {
                data = JSON.parse(data);
                console.log(data.text);
            }
            else {
                console.log("There is no task for execution");
            }
        });
    }, 2000);
}

export function sendForExecuting(text, time) {
    var id = uuidv4();
    var task = new createTask(id, text);
    var args = ['delayed', time, JSON.stringify({ 'id': id, 'text': text })];
    client.zadd(args, function (err, response) {
        if (err)
            console.error('There has been an error:', err);
        console.log('added ' + response + ' items.');
    });

}

