import axios from "axios";

const LandingPage = ({ currentUser }) => {
  // console.log(currentUser);
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async () => {
  // const response = await axios.get("/api/users/currentuser");

  // return response.data;

  if (typeof window === "undefined") {
    // on the server
  } else {
    // on the browser
  }

  return {};
};

export default LandingPage;
