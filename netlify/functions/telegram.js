exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");

    const { name, contact, apk, purpose, comment, source } = data;

    if (!name || !contact || !apk || !purpose) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Не все обязательные поля заполнены" }),
      };
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Telegram config missing" }),
      };
    }

    const text = `
🔥 Новая APK-заявка

📍 Источник: ${source || "JeX1k HUB"}
👤 Имя / ник: ${name}
📩 Контакт: ${contact}
📦 APK / файл: ${apk}

🎯 Зачем нужен:
${purpose}

💬 Комментарий:
${comment || "—"}
`;

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    if (!response.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Telegram send error" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Заявка отправлена" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error" }),
    };
  }
};