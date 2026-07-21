const button = document.getElementById("loginButton");
const input = document.getElementById("keyInput");
const statusText = document.getElementById("status");

button.addEventListener("click", async () => {

    const key = input.value.trim();

    if (!key) {
        statusText.style.color = "#ff6b6b";
        statusText.innerText = "Digite uma chave.";
        return;
    }

    statusText.style.color = "white";
    statusText.innerText = "Verificando...";

    try {

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                key: key
            })
        });

        const data = await response.json();

        if (data.status === "admin") {

            statusText.style.color = "#00ff99";
            statusText.innerText = "Acesso liberado.";

            setTimeout(() => {
                window.location.href = "/admin.html";
            }, 1000);

        } else if (data.status === "success") {

            statusText.style.color = "#00ff99";
            statusText.innerText = "Chave válida.";

            setTimeout(() => {
                window.location.href = "/parabens.html";
            }, 1000);

        } else {

            statusText.style.color = "#ff5555";
            statusText.innerText = "Chave inválida.";

        }

    } catch (e) {

        statusText.style.color = "#ff5555";
        statusText.innerText = "Erro ao conectar ao servidor.";

    }

});
