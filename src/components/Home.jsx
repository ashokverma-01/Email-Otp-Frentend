import React from "react";

const Home = () => {
  const imgStyle = {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  };
  return (
    <div>
      <div className="img">
        <img
          style={imgStyle}
          src="https://media.istockphoto.com/id/1432248749/photo/a-woman-is-learning-coding-a-male-colleague-helps-her-with-that-codes-are-visible-on-the.jpg?s=2048x2048&w=is&k=20&c=LKP3zc2QFfeBKe2JRdmekgfhxML2oTnp4hKTkf1Y-uE="
        />
      </div>
    </div>
  );
};

export default Home;
