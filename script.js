const urlParams = new URLSearchParams(window.location.search);
const refCode = urlParams.get('ref') || 'direct';

document.getElementById('leadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        ref: refCode,
        time: document.getElementById('timeSlot').value
    };

    await fetch('https://your-worker.workers.dev/api/lead', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    alert('Спасибо! Мы ждем вас в офисе.');
});
