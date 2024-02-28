import './App.css';
import './normal.css'
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function App() {


  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([ 
]);

const [loading, setLoading] = useState(false); 

function clearChats() {
  setChatLog([]);
}

  async function handleSubmit(e) {

    e.preventDefault();

    const chatLogNew = [...chatLog, {user: "me", message: `${input}`}];

    setInput("");  
    setChatLog(chatLogNew);
    const messages  = chatLogNew.map((message)=>message.message).join("\n")
    setLoading(true);
    setChatLog([...chatLogNew, {user: "gpt", message: "Hold on..."}]);
    const response = await fetch("http://54.253.188.42:8000/gemini_only_text",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        prompt: messages
      })
    });
    const data = await response.json();
    setChatLog([...chatLogNew, {user: "gpt", message: `${data.reply}`}]);
    setLoading(false);
    console.log(data.reply);
  }


  return (
    <div className="App">
      <saside className = "sidemenu">
        <h1>Chat GPT</h1>
        <div className='side-menu-button' onClick={clearChats}>
          <span>
            +
          </span>
          New Chat
        </div>
      </saside>
      <section className = "chatbox">
      {chatLog.length === 0 ? (
          <div className="empty-chat">Hey there 👋👋 !! How do I assist you today 😁😁 </div>
        ) : (
          <div className="chat-log">
            {chatLog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>
        )}
        <div className = "chat-input-holder">
          <form onSubmit = {handleSubmit}>
          <input 
           rows='1'
           placeholder =  {loading ? "Working on it hold one...": "Type your message here..."} 
           value={input}
           onChange={(e)=> setInput(e.target.value)}
           className = "chat-input-textarea">
            
            </input>
          </form>
        </div>
      </section>  
    </div>
  );
}

const ChatMessage = ({message}) => {
  return  <div className = {`chat-message ${message.user === "gpt" && "chatgpt"}`}>
  <div className = "chat-message-center">
  <div className = {`avatar ${message.user === "gpt" && "chatgpt"}`}>
    {
      message.user === "gpt" ? ( <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="white" d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91a6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9a6.046 6.046 0 0 0 .743 7.097a5.98 5.98 0 0 0 .51 4.911a6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206a5.99 5.99 0 0 0 3.997-2.9a6.056 6.056 0 0 0-.747-7.073M13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081l4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494M3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085l4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646M2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.354l-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667m2.01-3.023l-.141-.085l-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5l2.607 1.5v2.999l-2.597 1.5l-2.607-1.5Z"/></svg>):
      (<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#242938" rx="60"/><path fill="#00d8ff" d="M128.001 146.951c10.304 0 18.656-8.353 18.656-18.656c0-10.303-8.352-18.656-18.656-18.656c-10.303 0-18.656 8.353-18.656 18.656c0 10.303 8.353 18.656 18.656 18.656"/><path stroke="#00d8ff" stroke-width="8.91" d="M128.002 90.363c25.048 0 48.317 3.594 65.862 9.635C215.003 107.275 228 118.306 228 128.295c0 10.409-13.774 22.128-36.475 29.649c-17.162 5.686-39.746 8.654-63.523 8.654c-24.378 0-47.463-2.786-64.819-8.717C41.225 150.376 28 138.506 28 128.295c0-9.908 12.41-20.854 33.252-28.12c17.61-6.14 41.453-9.812 66.746-9.812z" clip-rule="evenodd"/><path stroke="#00d8ff" stroke-width="8.91" d="M94.981 109.438c12.514-21.698 27.251-40.06 41.249-52.24c16.864-14.677 32.914-20.425 41.566-15.436c9.017 5.2 12.288 22.988 7.463 46.41c-3.645 17.707-12.359 38.753-24.238 59.351c-12.179 21.118-26.124 39.724-39.931 51.792c-17.471 15.272-34.362 20.799-43.207 15.698c-8.583-4.946-11.865-21.167-7.747-42.852c3.479-18.323 12.21-40.812 24.841-62.723z" clip-rule="evenodd"/><path stroke="#00d8ff" stroke-width="8.91" d="M95.012 147.578c-12.549-21.674-21.093-43.616-24.659-61.826c-4.293-21.941-1.258-38.716 7.387-43.72c9.009-5.216 26.052.834 43.934 16.712c13.52 12.004 27.403 30.061 39.316 50.639c12.214 21.098 21.368 42.473 24.929 60.461c4.506 22.764.859 40.157-7.978 45.272c-8.574 4.964-24.265-.291-40.996-14.689c-14.136-12.164-29.26-30.959-41.933-52.849Z" clip-rule="evenodd"/></g></svg>)
    }
    </div>
    <div className = "message">
    {message.user === "gpt" ? (
            <ReactMarkdown>{message.message}</ReactMarkdown>
          ) : (
            message.message
          )}
  </div>
  </div>
  </div>
};

export default App;
