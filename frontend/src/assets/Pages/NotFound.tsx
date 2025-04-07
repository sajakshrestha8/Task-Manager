import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      You have linked to the wrong URL
      <Link to={"/"}>
        <button>Home</button>
      </Link>
    </>
  );
};

export default NotFound;
