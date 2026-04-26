exports.handler = async (event) => {
  try {
    // Только POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
    }

    // Переменные из Netlify
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Missing env variables:", { BOT_TOKEN, CHAT_ID });

      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Env variables missing",
        }),
      };
    }

    // Данные с формы
    let data = {};

try {
  data = JSON.parse(event.body);
} catch (e) {
  console.error("JSON parse error:", event.body);
  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Invalid JSON" }),
  };
}

    const email = data.email || "Не указано";
    const apk = data.apk || "Не указано";
    const reason = data.reason || "Не указано";
    const comment = data.comment || "Нет";

    // Сообщение в Telegram
    const text = `
🔥 Новая заявка с сайта

📧 Email: ${email}
📦 APK: ${apk}
❓ Зачем: ${reason}
💬 Комментарий: ${comment}
    `;

    console.log("Sending to Telegram:", text);

    // Отправка в Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
        }),
      }
    );

    // Если ошибка от Telegram
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
      body: JSON.stringify({
        message: "Success",
      }),
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