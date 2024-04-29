import { useOptimistic, useState, useRef } from 'react';


type Message = {
  text: string;
  sending?: boolean;
}

type MessageFormProps = {
  sendMessage: (formData: FormData) => Promise<void>
  addOptimisticMessage: (message: string) => void
}
const MessageForm: React.FC<MessageFormProps> = ({ addOptimisticMessage, sendMessage }) => {
  // Create a reference to the form
  const formRef = useRef<HTMLFormElement | null>(null);

  // This function is called when the form is submitted
  const formAction = async (formData: FormData) => {
    addOptimisticMessage(formData.get('message') as string);

    // Clear the form
    formRef?.current?.reset();

    await sendMessage(formData);
  };

  return (
    <form action={formAction} ref={formRef} className='flex items-center mb-5'>
      <input
        type='text'
        name='message'
        placeholder='Hello!'
        className='border border-gray-300 rounded py-1 px-2 mr-2 focus:outline-none focus:border-blue-500'
      />
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline'
      >
        Send
      </button>
    </form>
  );
};


type ThreadProps = {
  messages: Message[],
  sendMessage: (formData: FormData) => Promise<void>
}
const Thread: React.FC<ThreadProps> = ({ messages, sendMessage }) => {
  // The useOptimistic hook is used to add an optimistic message to the list of messages
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], string>(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true,
      },
    ]
  );

  return (
    <div>
      <MessageForm
        addOptimisticMessage={addOptimisticMessage}
        sendMessage={sendMessage}
      />
      {optimisticMessages.map((message, index) => (
        <div key={index} className='flex items-center'>
          <span>{message.text}</span>
          {message.sending && (
            <small className='ml-1 text-gray-500'>(Sending...)</small>
          )}
        </div>
      ))}
    </div>
  );
};

const deliverMessage = async (message: string) => {
  // Simulate a delay
  await new Promise((res) => setTimeout(res, 1000));
  return message;
};

const MessageBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  async function sendMessage(formData: FormData) {
    const sentMessage = await deliverMessage(formData.get('message') as string);

    setMessages((messages) => [...messages, { text: sentMessage }]);
  }

  return <Thread messages={messages} sendMessage={sendMessage} />;
};

export { MessageBox as UseOptimisticExample };
