import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h3 className='mt-5'>Welcome to BizCard!</h3>
      <Link to={"/all"}>
        <p>Check out all the great business cards!</p>
      </Link>
    </>
  );
}

export default Home;
