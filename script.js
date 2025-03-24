document.getElementById("generateBtn").addEventListener("click", async function() {
    const userInput = document.getElementById("userInput").value;
    const outputDiv = document.getElementById("output");

    if (!userInput.trim()) {
        outputDiv.innerHTML = "Please enter a question.";
        return;
    }

    outputDiv.innerHTML = "Generating response...";

    try {
        const response = await fetch('https://api.deepseek.com/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: userInput })
        });

        const data = await response.json();

        if (response.ok) {
            outputDiv.innerHTML = data.response; // Assuming the API returns a JSON object with a "response" field.
        } else {
            outputDiv.innerHTML = "Error: " + data.message || "An error occurred!";
        }
    } catch (error) {
        outputDiv.innerHTML = "Error: " + error.message;
    }
});
