const express = require('express');
const { wifiQR } = require('./utils/wifiQR'); 

const app = express();
const port = 3000;

app.use(express.json());

app.post('/wifi', async (req, res) => {
    const { ssid, password, encryption = 'WPA', hidden } = req.body;
    const svg = await wifiQR({ ssid, password, encryption, hidden });

    if (!svg) {
        return res.status(500).send('Something went wrong');
    }

    res.writeHead(200, { 'Content-Type': 'image/svg+xml', 'Content-Length': svg.length });
    res.end(svg);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
