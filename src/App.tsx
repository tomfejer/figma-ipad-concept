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

// const CustomHandle = (props) => <div className={"CustomHandle"} {...props} />;
const CustomHandleCorner = (props) => (
  <div className={"CustomHandle"} {...props} />
);

const CustomHandleVertical = (props) => (
  <div className={"CustomHandleVertical"} {...props} />
);

const CustomHandleHorizontal = (props) => (
  <div className={"CustomHandleHorizontal"} {...props} />
);

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
          resizeHandleComponent={{
            bottomRight: <CustomHandleCorner />,
            bottomLeft: <CustomHandleCorner />,
            topRight: <CustomHandleCorner />,
            topLeft: <CustomHandleCorner />,
            top: <CustomHandleVertical />,
            bottom: <CustomHandleVertical />,
            left: <CustomHandleHorizontal />,
            right: <CustomHandleHorizontal />
          }}
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
            <div className="DimensionWrapper">
              {parseInt(this.state.width)}{" "}
            </div>
            <span className="DimensionDivider"> × </span>
            <div className="DimensionWrapper">
              {parseInt(this.state.height)}{" "}
            </div>
          </div>
          <div className="FrameLabel">Frame</div>
        </Rnd>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
