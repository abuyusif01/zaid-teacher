import React from "react";
import { useParams } from "react-router-dom";

const Home = () => {
  const { id } = useParams();

  return (
    <div>
      <p>Home: {id}</p>
    </div>
  );
};

export default Home;
