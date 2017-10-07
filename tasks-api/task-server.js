import express from 'express';
import bodyParser from 'body-parser';
import { callCheckProcess, sendForExecuting } from './task-generator';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/echoAtTime', (req, res, next) => {
    sendForExecuting(req.param("text"), req.param("time"));
    res.end();
}).post('/echoAtTime', (req, res, next) => {
    sendForExecuting(req.param("text"), req.param("time"));
    res.end();
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
    callCheckProcess();
});