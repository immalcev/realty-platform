// Автоматически заполняем скрытое поле из URL при загрузке страницы
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) document.getElementById('ref_code').value = ref;
};

document.getElementById('leadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = 'Отправка...';
    submitBtn.disabled = true;

    // Собираем данные
    const city = document.getElementById('target_city').value;
    const budget = document.getElementById('budget').value;
    const name = document.getElementById('client_name').value;
    const phone = document.getElementById('client_phone').value;
    const refCode = document.getElementById('ref_code').value || 'Прямой заход';

    // Формируем ОДНУ переменную сообщения
    const textMessage = `🔥 **НОВАЯ ЗАЯВКА С САЙТА MACLER RUSSIA** 🔥\n\n` +
                        `🏢 **Город:** ${city}\n` +
                        `💰 **Бюджет:** ${budget} руб.\n` +
                        `👤 **Имя клиента:** ${name}\n` +
                        `📞 **Контакты:** ${phone}\n` +
                        `🔗 **Источник (реф):** ${refCode}`;

    const BOT_TOKEN = '8962569966:AAFBBG8G64sWxZjoLrR5RWimTWjNtIGPpMA'; 
    const CHAT_ID = '803182963'; 

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: textMessage,
                parse_mode: 'Markdown'
            })
        });

        if (response.ok) {
            alert('Заявка принята! Менеджер свяжется с вами в Telegram.');
            document.getElementById('leadForm').reset();
        } else {
            throw new Error('Ошибка Telegram API');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось отправить заявку. Проверьте соединение.');
    } finally {
        submitBtn.innerText = 'Получить закрытый каталог в Telegram';
        submitBtn.disabled = false;
    }
});
