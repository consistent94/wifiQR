const QRCode = require('qrcode');

async function wifiQR({ ssid, password, encryption, hidden }) {
    try {
        const code = `WIFI:S:${ssid};T:${encryption};P:${password};H:${hidden ? 'true' : 'false'};;`;
        const qr = await QRCode.toString(code, { type: 'svg' });
        return qr;
    } catch (err) {
        console.error(err);
        return null; 
    }
}

module.exports = { wifiQR };
