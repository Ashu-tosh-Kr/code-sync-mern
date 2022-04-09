import Avatar, { genConfig } from "react-nice-avatar";
const config = genConfig();
const Client = ({ username }: { username: string }) => {
  return (
    <div className="client">
      <Avatar style={{ width: "3rem", height: "3rem" }} {...config} />
      <span className="userName">{username}</span>
    </div>
  );
};

export default Client;
