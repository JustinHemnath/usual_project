import { Button, Input } from "@heroui/react";
import { useCallback, useState, type SyntheticEvent } from "react";
import { CHAT_APP_EVENTS } from "~/constants/main.constants";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import type { TConversation, TMessage } from "~/stores/chatapp.store";
import { chatBottomScroller } from "~/utils/chatApp.utils";

const SendMessage = ({ socket, userDetails, conversations, setConversations, currentConversation }: any) => {
  const [message, setMessage] = useState("");

  function handleMessageChange(e: any) {
    const value = e.target.value;
    setMessage(value);
  }

  const handleSendMessage = useCallback(
    (e: any) => {
      e.preventDefault();
      const messageToSend: TMessage = {
        sender: userDetails.email,
        receiver: currentConversation.otherPersonEmail,
        sender_name: userDetails.userName,
        receiver_name: currentConversation.otherPersonName,
        message,
        id: uuidv4(),
        sent_at: moment().format(),
      };

      // send message to server using socket emit
      socket.emit(CHAT_APP_EVENTS.TO_SERVER, messageToSend);

      // insert newly sent message into local conversations store
      const targetConvoIndex = conversations.findIndex((convo: TConversation) => convo.otherPersonEmail === messageToSend.receiver);
      let newConversations: TConversation[] = [...conversations];

      if (targetConvoIndex === -1) {
      } else {
        let targetConvo: TConversation = newConversations[targetConvoIndex];
        targetConvo.messages.push(messageToSend);
        targetConvo = {
          ...targetConvo,
          lastMessage: messageToSend,
        };
        newConversations.splice(targetConvoIndex, 1, targetConvo);
      }

      setConversations(newConversations);
      setMessage("");

      console.log("Emitted message");
      chatBottomScroller();
    },
    [message, currentConversation, conversations]
  );

  return (
    <form onSubmit={handleSendMessage} className="flex flex-[15%] items-center gap-2">
      <Input
        key={"inside"}
        description={"inside"}
        label="Message"
        labelPlacement={"inside"}
        type="text"
        onChange={handleMessageChange}
        value={message}
      />
      <Button className="bg-white text-[funkyText] mb-10" onPress={handleSendMessage}>
        Send
      </Button>
    </form>
  );
};

export default SendMessage;
