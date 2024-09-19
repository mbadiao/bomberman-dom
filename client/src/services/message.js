import ChatBubble from "../components/molecules/chat-bubble.js"
import chatMain from "../components/molecules/chat-main.js"

export const displayMsg = (data) => {
    let content = new ChatBubble(
        `https://ui-avatars.com/api/?name=${data.name}&background=123861&color=fff`,
        `${data.name}`,
        `${data.content}`
    )

    chatMain.add(content)
}