import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
const Home = () => {
  /**hooks */
  const navigate = useNavigate();
  //states
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  //handlers
  const createNewRoom = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const id: string = uuid();
    setRoomId(id);
    toast.success("Room created");
  };
  const joinRoom = () => {
    if (roomId && username) {
      navigate("/editor/" + roomId, {
        //pass state to the next page
        state: {
          username,
        },
      });
      toast.success("Room joined");
    } else {
      toast.error("Please enter a room id and username");
    }
  };
  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  //jsx
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img src="/code-sync.png" alt="logo" />
        <h4 className="mainLabel">Paste Invitation ROOM ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            JOIN
          </button>
          <span className="createInfo">
            If you don't have an invite then create&nbsp;
            <a onClick={createNewRoom} href="." className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built with love by <a href="https://github.com/Ashu-tosh-Kr">Ashu</a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
