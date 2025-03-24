document.getElementById("generateBtn").addEventListener("click", async function () {
    const userInput = document.getElementById("userInput").value;
    const chatOutput = document.getElementById("chatOutput");

    if (!userInput.trim()) {
        return; // Ignore empty input
    }

    // Append user's message to the chat
    appendMessage("user", userInput);
    document.getElementById("userInput").value = "";  // Clear the input

    // Call the API to generate the response
    try {
        const response = await fetch('https://api.your-ai-service.com/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add additional headers such as Authorization if needed
            },
            body: JSON.stringify({ query: userInput }) 
        });

        const data = await response.json();

        if (response.ok) {
            appendMessage("ai", data.response);
        } else {
            appendMessage("ai", "Error: " + (data.error || "An error occurred!"));
        }
    } catch (error) {
        appendMessage("ai", "Error: " + error.message);
    }
});

// Function to append messages to the chat
function appendMessage(sender, message) {
    const chatOutput = document.getElementById("chatOutput");
    
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    const chatMessageDiv = document.createElement("div");
    chatMessageDiv.classList.add("chat-message");
    chatMessageDiv.textContent = message;

    messageDiv.appendChild(chatMessageDiv);
    chatOutput.appendChild(messageDiv);
    
    // Scroll to the bottom of the chat
    chatOutput.scrollTop = chatOutput.scrollHeight;
}
