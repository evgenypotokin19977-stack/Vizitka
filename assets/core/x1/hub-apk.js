document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("apk-modal");

  const openBtn = document.querySelector(".hub-apk-btn");
  const overlay = modal.querySelector("[data-close]");
  const closeBtn = modal.querySelector(".hub-modal__close");

  const name = document.getElementById("apk-name");
  const contact = document.getElementById("apk-contact");
  const title = document.getElementById("apk-title");
  const purpose = document.getElementById("apk-purpose");
  const comment = document.getElementById("apk-comment");

  const submit = modal.querySelector(".hub-apk-submit");

  openBtn.addEventListener("click", () => {
    modal.classList.add("is-open");
  });

  const closeModal = () => {
    modal.classList.remove("is-open");
  };

  overlay.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);

  submit.addEventListener("click", async () => {
    const nameVal = name.value.trim();
    const contactVal = contact.value.trim();
    const titleVal = title.value.trim();
    const purposeVal = purpose.value.trim();
    const commentVal = comment.value.trim();

    if (!nameVal) {
      alert("Напиши имя или ник");
      return;
    }

    if (!contactVal) {
      alert("Укажи контакт");
      return;
    }

    if (!titleVal) {
      alert("Укажи, какой файл тебе нужен");
      return;
    }

    if (!purposeVal) {
      alert("Опиши цель запроса");
      return;
    }

    const data = {
      name: nameVal,
      contact: contactVal,
      apk: titleVal,
      purpose: purposeVal,
      comment: commentVal,
      source: "JeX1k HUB",
    };

    submit.textContent = "Отправка...";
    submit.disabled = true;

    try {
      const response = await fetch("/.netlify/functions/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        alert(
          errorData?.details ||
          errorData?.error ||
          errorData?.message ||
          `Ошибка сервера: ${response.status}`
        );

        throw new Error("Ошибка сервера");
      }

      submit.textContent = "Отправлено ✅";

      setTimeout(() => {
        closeModal();

        submit.textContent = "Отправить заявку";
        submit.disabled = false;

        name.value = "";
        contact.value = "";
        title.value = "";
        purpose.value = "";
        comment.value = "";
      }, 1200);
    } catch (error) {
      console.error(error);

      submit.textContent = "Ошибка ❌";

      setTimeout(() => {
        submit.textContent = "Отправить заявку";
        submit.disabled = false;
      }, 1500);
    }
  });
});