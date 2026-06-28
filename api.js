const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

let controller = null;

async function sendToAI(messages, onChunk) {

const apiKey = getApiKey();

if (!apiKey) {
    throw new Error("Please add your OpenRouter API key in Settings.");
}

controller = new AbortController();

const response = await fetch(OPENROUTER_URL, {

    method: "POST",

    signal: controller.signal,

    headers: {

        "Authorization": `Bearer ${apiKey}`,

        "Content-Type": "application/json",

        "HTTP-Referer": window.location.origin,

        "X-Title": "LimitlessAIMobile"

    },

    body: JSON.stringify({

        model: getModel(),

        stream: true,

        messages: messages

    })

});

if (!response.ok) {

    const text = await response.text();

    throw new Error(text);

}

const reader = response.body.getReader();

const decoder = new TextDecoder();

let fullResponse = "";

while (true) {

    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value);

    const lines = chunk.split("\n");

    for (const line of lines) {

        if (!line.startsWith("data: ")) continue;

        const data = line.substring(6);

        if (data === "[DONE]") {

            controller = null;

            return fullResponse;

        }

        try {

            const json = JSON.parse(data);

            const token =
                json.choices?.[0]?.delta?.content;

            if (!token) continue;

            fullResponse += token;

            if (onChunk) {

                onChunk(fullResponse);

            }

        }

        catch (err) {

            // Ignore incomplete streaming chunks

        }

    }

}

controller = null;

return fullResponse;

}

function stopGeneration() {

if (controller) {

    controller.abort();

    controller = null;

}

}
