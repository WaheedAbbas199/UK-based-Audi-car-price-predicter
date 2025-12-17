const form = document.getElementById("predictForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 🔄 Clear old result immediately
    resultDiv.innerHTML = "⏳ Predicting...";

    const data = {
        model: document.getElementById("model").value.trim(),
        year: Number(document.getElementById("year").value),
        transmission: document.getElementById("transmission").value,
        mileage: Number(document.getElementById("mileage").value),
        fuelType: document.getElementById("fuelType").value,
        tax: Number(document.getElementById("tax").value),
        mpg: Number(document.getElementById("mpg").value),
        engineSize: Number(document.getElementById("engineSize").value)
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("API Error");
        }

        const result = await response.json();

        // ✅ Always update result
        resultDiv.innerHTML = `💰 Predicted Price: £ ${result.predicted_price}`;

    } catch (error) {
        resultDiv.innerHTML = "❌ Error predicting price";
        console.error(error);
    }
});
