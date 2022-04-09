const Home = () => {
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img src="/code-sync.png" alt="logo" />
        <h4 className="mainLabel">Paste Invitation ROOM ID</h4>
        <div className="inputGroup">
          <input type="text" className="inputBox" placeholder="Room ID" />
          <input type="text" className="inputBox" placeholder="Username" />
          <button className="btn joinBtn">JOIN</button>
          <span className="createInfo">
            If you don't have an invite then create&nbsp;
            <a href="." className="createNewBtn">
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
