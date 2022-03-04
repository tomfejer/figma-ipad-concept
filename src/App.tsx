import * as React from "react";
import { render } from "react-dom";
import { Rnd } from "react-rnd";
import "./styles.css";

const style = {} as const;

type State = {
  x: number;
  y: number;
  width: number | string;
  height: number | string;
};

const CustomHandle = (props) => <div className={"CustomHandle"} {...props} />;
const CustomHandleCorner = () => <CustomHandle></CustomHandle>;

export default class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      width: 200,
      height: 200,
      x: 100,
      y: 100
    };
  }

  render() {
    return (
      <div className="MyCanvas">
        <Rnd
          style={style}
          resizeHandleComponent={{ bottomRight: <CustomHandleCorner /> }}
          size={{
            width: this.state.width,
            height: this.state.height
          }}
          position={{
            x: this.state.x,
            y: this.state.y
          }}
          onDragStop={(e, d) => {
            this.setState({ x: d.x, y: d.y });
          }}
          onResize={(e, direction, ref, delta, position) => {
            this.setState({
              width: ref.style.width,
              height: ref.style.height,
              ...position
            });
          }}
        >
          <div className="SelectionDimensions">
            {parseInt(this.state.width)} × {parseInt(this.state.height)}
          </div>
        </Rnd>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
