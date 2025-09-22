import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useLiveTimer from "../utils/hooks/useLiveTimer";

function MessageItem({ msg }) {
  const seconds = useLiveTimer(msg?.timestamp);

  if (msg?.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[70%] bg-[#dddddd80] rounded-lg">
          {msg.image && (
            <img
              src={msg.image}
              alt="uploaded"
              className="w-[25vw] h-auto mx-auto rounded-md m-2"
            />
          )}
          <h1 className="py-2 px-4">{msg.content}</h1>
        </div>
      </div>
    );
  }

  if (msg?.loading) {
    return (
      <div className="flex justify-start">
        <div className="rounded-lg">
          <img
            src="https://static.wixstatic.com/media/68315b_30dbad1140034a3da3c59278654e1655~mv2.gif"
            className="w-[3vw] ml-4"
            alt="loading"
          />
          <p className="text-xs text-gray-500 ml-4">{seconds}s</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] bg-[#eeeeee80] rounded-lg">
        <div className="py-2 px-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {msg.content}
          </ReactMarkdown>
        </div>
        {seconds===NaN && <p className="text-xs text-gray-500 px-4 pb-1">Response in {seconds || 0}s</p>}
      </div>
    </div>
  );
}

export default MessageItem;
