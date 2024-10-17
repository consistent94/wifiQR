document.getElementById('qrForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const ssid = document.getElementById('ssid').value;
    const password = document.getElementById('password').value;

    fetch('/wifi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ssid, password }), 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to generate QR code');
        }
        return response.text(); 
    })
    .then(svg => {
        document.getElementById('qrResult').innerHTML = svg;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('qrResult').innerHTML = '<p style="color: red;">Failed to generate QR code</p>';
    });
});
