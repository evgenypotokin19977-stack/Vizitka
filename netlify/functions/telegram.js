exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Missing env variables");
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Env variables missing" }),
      };
    }

    let data = {};

    try {
      data = JSON.parse(event.body || "{}");
    } catch (error) {
      console.error("JSON parse error:", event.body);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid JSON" }),
      };
    }

    const name = data.name || "Не указано";
    const contact = data.contact || "Не указано";
    const apk = data.apk || "Не указано";
    const purpose = data.purpose || "Не указано";
    const comment = data.comment || "Нет";
    const source = data.source || "JeX1k HUB";

    const text = `
🔥 Новая APK-заявка

📍 Источник: ${source}
👤 Имя / ник: ${name}
📩 Контакт: ${contact}
📦 APK / файл: ${apk}

🎯 Зачем нужен:
${purpose}

💬 Комментарий:
${comment}
`;

    console.log("Sending to Telegram");

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Telegram API error:", errorText);

      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Telegram send error",
          details: errorText,
        }),
      };
    }

    console.log("Message sent successfully");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success" }),
    };
  } catch (error) {
    console.error("Function crash:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Server error",
        error: error.message,
      }),
    };
  }
};