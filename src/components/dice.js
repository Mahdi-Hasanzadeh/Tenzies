import React from "react";

export default function Dice(props) {
  let styles = {
    backgroundColor: props.isHeld ? "green" : null,
    color: props.isHeld ? "white" : null
  };
  return (
    <div
      onClick={props.tenzies ? null : () => {
        props.handleHold(props.id);
      }}
      className="dice"
      style={styles}
    >
      {props.value}
    </div>
  );
}
