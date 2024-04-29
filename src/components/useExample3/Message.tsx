import { use, useState, Suspense } from 'react';

// Simulate fetching a message
function fetchMessage(): Promise<string> {
  return new Promise((resolve) => setTimeout(resolve, 1000, '⚛️'));
}


type MessageOutputProps = {
  messagePromise: Promise<string>
}
// MessageOutput component
const MessageOutput:React.FC<MessageOutputProps> = ({ messagePromise }) => {
  const messageContent = use(messagePromise);
  return <p className='text-xl'>Here is the message: {messageContent}</p>;
};


type Props = MessageOutputProps;
// MessageContainer component
const MessageContainer:React.FC<Props> = ({ messagePromise }) => {
  return (
    <Suspense fallback={<p className='text-xl'>⌛Downloading message...</p>}>
      <MessageOutput messagePromise={messagePromise} />
    </Suspense>
  );
};

// Message component
const Message = () => {
  const [messagePromise, setMessagePromise] = useState<Promise<string> | null>(null);

  const [show, setShow] = useState(false);

  function download() {
    setMessagePromise(fetchMessage());
    setShow(true);
  }

  if (show) {
    return <MessageContainer messagePromise={messagePromise as Promise<string>} />;
  } else {
    return (
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={download}
      >
        Download message
      </button>
    );
  }
};

export { Message as UseExample3 };
