// ===============================
// LimitlessAIMobile Chat (Part 1)
// ===============================

let currentChat = loadCurrentChat();

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("prompt");
const sendButton = document.getElementById("send");
const typingIndicator = document.getElementById("typingIndicator");
const historyDiv = document.getElementById("chatHistory");
const newChatButton = document.getElementById("newChat");

function scrollBottom() {
messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function timeString() {
return new Date().toLocaleTimeString([], {
hour: "2-digit",
minute: "2-digit"
});
}

function createBubble(role, text) {

const bubble = document.createElement("div");

bubble.className =
    "message " +
    (role === "user" ? "user" : "ai");

const body = document.createElement("div");

body.textContent = text;

bubble.appendChild(body);

const stamp = document.createElement("div");

stamp.className = "timestamp";

stamp.textContent = timeString();

bubble.appendChild(stamp);

messagesDiv.appendChild(bubble);

scrollBottom();

return body;

}

function renderChat() {

messagesDiv.innerHTML = "";

for (const msg of currentChat) {

    createBubble(
        msg.role,
        msg.content
    );

}

}

function refreshHistory() {

historyDiv.innerHTML = "";

const chats = loadChats();

chats.forEach((chat, index) => {

    const item =
        document.createElement("button");

    item.textContent =
        chat.title ||
        "Conversation " + (index + 1);

    item.style.width = "100%";

    item.style.marginBottom = "10px";

    item.style.padding = "12px";

    item.style.borderRadius = "12px";

    item.style.border = "none";

    item.style.background = "#1f2937";

    item.style.color = "white";

    item.onclick = () => {

        currentChat = chat.messages;

        saveCurrentChat(currentChat);

        renderChat();

    };

    historyDiv.appendChild(item);

});

}

function saveConversation() {

let chats = loadChats();

const title = currentChat.length
    ? currentChat[0].content.substring(0, 30)
    : "New Chat";

chats.unshift({

    title,

    messages: currentChat

});

if (chats.length > 25) {

    chats.pop();

}

saveChats(chats);

refreshHistory();

}

newChatButton.onclick = () => {

if (currentChat.length) {

    saveConversation();

}

currentChat = [];

saveCurrentChat(currentChat);

renderChat();

};

renderChat();

refreshHistory();

// ===============================
// LimitlessAIMobile Chat (Part 2)
// ===============================

async function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    input.value = "";

    currentChat.push({
        role: "user",
        content: text
    });

    createBubble("user", text);

    typingIndicator.classList.remove("hidden");

    const aiBubble = createBubble("ai", "");

    try {

        const messages = currentChat.map(msg => ({
            role: msg.role,
            content: msg.content
        }));

        const response = await sendToAI(
            messages,
            (streamText) => {

                aiBubble.textContent = streamText;

                scrollBottom();

            }
        );

        typingIndicator.classList.add("hidden");

        currentChat.push({
            role: "assistant",
            content: response
        });

        saveCurrentChat(currentChat);

    }

    catch (err) {

        typingIndicator.classList.add("hidden");

        aiBubble.textContent =
            "⚠ " + err.message;

    }

}

sendButton.addEventListener(
    "click",
    sendMessage
);

input.addEventListener(
    "keydown",
    function(e){

        if(e.key==="Enter" && !e.shiftKey){

            e.preventDefault();

            sendMessage();

        }

    }
);
