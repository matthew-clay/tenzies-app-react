import "./Die.css";

function Die(props) {
  // console.log("props =>", props);
  const dieStyle = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff",
  };

  return (
    <div className="die-face" style={dieStyle} onClick={props.holdDice}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}

export default Die;
