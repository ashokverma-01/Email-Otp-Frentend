import React from "react";
import Countdown from "react-countdown";
import { date } from "yup";

const timer = () => {
  return (
    <div>
      <Countdown date={Date.now() + 1 * 60 * 1000} className="timer" />
    </div>
  );
};

export default timer;
