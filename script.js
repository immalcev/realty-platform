// 1. Укажи сюда РЕАЛЬНЫЙ URL твоего Worker'а (посмотри его в панели Cloudflare)
const WORKER_URL = 'https://macler-backend.immalcev17.workers.dev/'; 

document.getElementById('leadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Получаем ref-код из URL
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref') || 'direct';

    // Собираем данные
    const data = {
        name: document.getElementById('client_name').value, // Убедись, что ID совпадают с HTML
        phone: document.getElementById('client_phone').value,
        time: document.getElementById('timeSlot')?.value || '10:00', 
        ref: refCode
    };

    try {
        console.log("Отправляю:", data); // Смотри это в консоли F12

        const response = await fetch(WORKER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Спасибо! Мы ждем вас в офисе.');
            document.getElementById('leadForm').reset();
        } else {
            throw new Error('Ошибка сервера: ' + response.status);
        }
    } catch (err) {
        console.error("Ошибка:", err);
        alert('Не удалось отправить. Проверь консоль (F12).');
    }
});
