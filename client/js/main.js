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
        qrContainer.innerHTML = svg; // Insert SVG into the inner container

        // Resize the SVG
        const svgElement = qrContainer.querySelector('svg');
        if (svgElement) {
            svgElement.setAttribute('width', '150');  // Set the width to 150px
            svgElement.setAttribute('height', '150'); // Set the height to 150px
            svgElement.style.width = '100%'; // Ensure it scales within the container
            svgElement.style.height = '100%'; // Ensure it scales within the container
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('qrResult').innerHTML = '<p style="color: red;">Failed to generate QR code</p>';
    });
});
