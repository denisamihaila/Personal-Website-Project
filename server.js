import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import bodyParser from 'body-parser';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'users.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading users file');
            return;
        }
        res.send(data);
    });
});

app.post('/submit', (req, res) => {
    const { username, email } = req.body;
    res.send(`Form submitted! Username: ${username}, Email: ${email}`);
});

app.use(function(req, res, next) {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});