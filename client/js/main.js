const exportBtn = document.getElementById('exportBtn');

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
        const qrContainer = document.getElementById('qrCodeContainer');
        qrContainer.innerHTML = svg; 

        // Resize the SVG
        const svgElement = qrContainer.querySelector('svg');
        if (svgElement) {
            svgElement.setAttribute('width', '150');  
            svgElement.setAttribute('height', '150'); 
            svgElement.style.width = '100%'; 
            svgElement.style.height = '100%'; 
        }

        exportBtn.classList.remove('hidden');  
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('qrResult').innerHTML = '<p style="color: red;">Failed to generate QR code</p>';
    });
});

exportBtn.addEventListener('click', function() {
    const svg = qrCodeContainer.querySelector('svg');
    if (svg) {
        const serializer = new XMLSerializer();
        const svgData = serializer.serializeToString(svg);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        // Create a link to download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'wifi-qr-code.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        alert('No QR code to export');
    }
});
