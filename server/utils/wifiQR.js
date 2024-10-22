const QRCode = require('qrcode');

async function wifiQR({ ssid, password }) {
    try {
        const code = `WIFI:S:${ssid};P:${password};;`;
        const qr = await QRCode.toString(code, { type: 'svg' });
        return qr;
    } catch (err) {
        console.error(err);
        return null; 
    }
}

module.exports = { wifiQR };