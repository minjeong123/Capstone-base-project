import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/config";
// import { firestore } from "../services/firebase";

// export default class Chat extends Component {
export default function Chat(props) {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [user, setUser] = useState(currentUser);
  const [friendName, setFriendName] = useState(null);
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState([]);
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [deletionMsgRef, setDeletionMsgRef] = useState(false);
  const [readError, setReadError] = useState(false);
  const [writeError, setWriteError] = useState(false);
  const [loadingChats, setLoadingChats] = useState(false);
  const myRef = useRef();

  async function getA() {
    // this.setState({ readError: null, loadingChats: true });
    setReadError(null);
    setLoadingChats(true);
    const chatArea = myRef.current;
    try {
      const chatid = props.match.params.chatID;
      if (!chatid.split("_").includes(user.uid)) {
        history.push("/chat");
        throw new Error("You shouldn't be here 🤨");
      }

      await sFriendName();
      db.ref(`chats/${chatid}`).on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) {
          return a.timestamp - b.timestamp;
        });
        // this.setState({ chats });
        // this.setState({ loadingChats: false });
        setChats(chats);
        setLoadingChats(false);
        chatArea.scrollBy(0, chatArea.scrollHeight);
      });
    } catch (error) {
      // this.setState({ readError: error.message, loadingChats: false });
      setReadError(error.message);
      setLoadingChats(false);
    }
  }

  useEffect(() => {
    getA();
  }, []);

  // 완성
  function handleChange(event) {
    // this.setState({
    //   content: event.target.value,
    // });
    setContent(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // this.setState({ writeError: null });
    setWriteError(null);
    // const chatArea = this.myRef.current;
    const chatArea = myRef.current;
    if (content) {
      try {
        const chatid = props.match.params.chatID;
        if (!chatid.split("_").includes(user.uid)) {
          history.push("/chat");
          throw new Error("You shouldn't be here 🤨");
        }
        await db.ref(`chats/${chatid}`).push({
          content: content,
          timestamp: Date.now(),
          uid: user.uid,
          uname: user.displayName,
        });
        // this.setState({ content: "" });
        setContent("");
        document.querySelector(".chat-input").focus();
        chatArea.scrollBy(0, chatArea.scrollHeight);
      } catch (error) {
        // this.setState({ writeError: error.message });
        setWriteError(error.message);
      }
    }
  }

  // 완성
  async function sFriendName() {
    const chatID = props.match.params.chatID;
    const x = chatID.split("_");
    const friendID = x[0] === user.uid ? x[1] : x[0];

    await db
      .ref(`users/${friendID}`)
      .once("value")
      .then((snapshot) => {
        setFriendName(snapshot.val().uname);
      });
  }

  // 완성
  function formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = d.toLocaleTimeString().replace(/(.*)\D\d+/, "$1");
    return time;
  }

  return (
    <div style={{ marginTop: "150px" }}>
      {/* loading indicator */}
      {loadingChats ? <div className="spinner"></div> : ""}
      <section className="chat-container">
        <header className="chat-header">
          {/* <Link to="/chat" className="px-2"> */}
          <Link
            to={{
              pathname: "/chat",
              // query: {
              //   userId: props.job.userId,
              // },
            }}
          >
            <i className="fas fa-chevron-left" style={{ fontWeight: 800 }}>
              &lt;&lt;
            </i>
          </Link>
          <div className="chat-header-title">{friendName}</div>
          <div className="chat-settings">
            <Link to="/" className="px-2">
              <i className="fas fa-cog"></i>
            </Link>
          </div>
        </header>
        {readError ? (
          <div className="alert alert-danger py-0 rounded-0" role="alert">
            {readError}
          </div>
        ) : null}

        <main className="chatarea" ref={myRef}>
          {/* chat area */}
          {chats.map((chat) => {
            return (
              <div
                key={chat.timestamp}
                className={
                  "msg " + (user.uid === chat.uid ? "right-msg" : "left-msg")
                }
              >
                <div
                  className="chat-bubble"
                  onDoubleClick={async () => {
                    if (chat.uid !== user.uid) return;
                    const chatid = props.match.params.chatID;
                    // this.setState({ deletePrompt: true });
                    setDeletePrompt(true);
                    const x = await db
                      .ref(`chats/${chatid}`)
                      .orderByChild("timestamp")
                      .equalTo(chat.timestamp)
                      .once("value");
                    setDeletionMsgRef(
                      `chats/${chatid}/${Object.keys(x.val())[0]}}`
                    );
                  }}
                >
                  <div className="msg-text">{chat.content}</div>
                  <div className="chat-info-time noselect text-right">
                    {formatTime(chat.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}
        </main>
        {deletePrompt ? (
          <div
            className="d-flex justify-content-between align-items-center alert alert-danger mb-0 mt-1 rounded-0 py-1 px-2"
            role="alert"
          >
            <span>Do you wish to delete that message?</span>
            <div className="d-flex">
              <button
                type="button"
                className="btn btn-sm py-0 mr-1 btn-outline-danger"
                onClick={() => {
                  db.ref(deletionMsgRef).remove();
                  // this.setState({ deletePrompt: false });
                  setDeletePrompt(false);
                }}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-sm py-0 btn-outline-success"
                onClick={() =>
                  // this.setState({ deletePrompt: false })
                  setDeletePrompt(false)
                }
              >
                No
              </button>
            </div>
          </div>
        ) : null}
        <form onSubmit={handleSubmit} className="chat-inputarea">
          <input
            type="text"
            placeholder="Message..."
            className="chat-input"
            name="content"
            onChange={handleChange}
            value={content}
          ></input>
          <button type="submit" className="chat-sendbtn">
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
