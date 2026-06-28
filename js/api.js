// ===============================
// LimitlessAIMobile OpenRouter API
// ===============================

const OPENROUTER_URL =
    "https://openrouter.ai/api/v1/chat/completions";

let controller = null;

async function sendToAI(messages, onChunk) {

    const apiKey = getApiKey();

    if (!apiKey) {
        throw new Error("No OpenRouter API key saved.");
    }

    controller = new AbortController();

    const response = await fetch(OPENROUTER_URL, {

        method: "POST",

        signal: controller.signal,

        headers: {

            "Authorization": `Bearer ${apiKey}`,

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            model: getModel(),

            stream: true,

            messages

        })

    });

    if (!response.ok) {

        const text = await response.text();

        throw new Error(text);

    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    let full = "";

    while (true) {

        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);

        const lines = chunk.split("\n");

        for (const line of lines) {

            if (!line.startsWith("data: ")) continue;

            const data = line.substring(6);

            if (data === "[DONE]") {

                return full;

            }

            try {

                const json = JSON.parse(data);

                const token =
                    json.choices?.[0]?.delta?.content;

                if (!token) continue;

                full += token;

                if (onChunk) {

                    onChunk(full);

                }

            }

            catch {

            }

        }

    }

    return full;

}

function stopGeneration() {

    if (controller) {

        controller.abort();

        controller = null;

    }

}
