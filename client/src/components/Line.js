import React from "react";
import moment from "moment";
import "./Line.css";

const Line = ({ line }) => {
  return (
    <div className="line">
      <div className="line-created-at">{moment(line.createdAt).fromNow()}</div>
      <div className=" line-title">{line.title}</div>
      <div className={line.type + " line-type"}>{"[" + line.type + "]"}</div>
      <div className="line-content">{line.content}</div>
    </div>
  );
};

export default Line;
