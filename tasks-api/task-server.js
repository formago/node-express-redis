import express from 'express';
import bodyParser from 'body-parser';
import { callCheckProcess, sendForExecuting } from './task-generator';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/echoAtTime', (req, res) => {
    try {
        var timeSeconds = parseInt(req.param("time"));
        if (!(timeSeconds < new Date().getTime()))
            sendForExecuting(req.param("text"), timeSeconds);
        res.end();
    }
    catch (error) {
        console.log(error);
        res.end();
    }
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
    callCheckProcess();
});