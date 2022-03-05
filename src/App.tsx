import * as React from "react";

import { render } from "react-dom";
import { Rnd } from "react-rnd";
import "./styles.css";
import FakeToolbar from "./FakeToolbar";
import FakeHeaderLeft from "./FakeHeaderLeft";
import FakeHeaderCenter from "./FakeHeaderCenter";
import FakeHeaderRight from "./FakeHeaderRight";

import { motion } from "framer-motion";
// import { motion } from "framer-motion";

const style = {} as const;

type State = {
  x: number;
  y: number;
  width: number | string;
  height: number | string;
  disabledDrag: boolean;
  value: any;
  selectionActive: boolean;
  dimensionInputActive: boolean;
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
      y: 100,
      disabledDrag: true,
      value: "",
      selectionActive: true,
      dimensionInputActive: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeselection = this.handleDeselection.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleDimensionInputToggle = this.handleDimensionInputToggle.bind(
      this
    );
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });

    console.log("change");
    event.preventDefault();
  }

  handleSubmit(event) {
    this.setState({
      width: this.state.value,
      value: "",
      dimensionInputActive: false
    });
    console.log("submit");
    event.preventDefault();
  }

  handleDeselection(event) {
    this.setState({
      selectionActive: false,
      disabledDrag: true,
      dimensionInputActive: false
    });
    event.preventDefault();
  }

  handleSelection(event) {
    this.setState({
      selectionActive: true,
      disabledDrag: false
    });
    // console.log("Selection");
    event.preventDefault();
  }

  handleDimensionInputToggle() {
    this.setState({
      dimensionInputActive: !this.state.dimensionInputActive
    });
  }

  render() {
    return (
      <div className="MyCanvas">
        <div className="DeselectionArea" onClick={this.handleDeselection} />
        <Rnd
          data-selected={this.state.selectionActive}
          style={style}
          dragHandleClassName="handle"
          resizeHandleComponent={{
            bottomRight: (
              <CustomHandleCorner data-selected={this.state.selectionActive} />
            ),
            bottomLeft: (
              <CustomHandleCorner data-selected={this.state.selectionActive} />
            ),
            topRight: (
              <CustomHandleCorner data-selected={this.state.selectionActive} />
            ),
            topLeft: (
              <CustomHandleCorner data-selected={this.state.selectionActive} />
            ),
            top: (
              <CustomHandleVertical
                data-selected={this.state.selectionActive}
              />
            ),
            bottom: (
              <CustomHandleVertical
                data-selected={this.state.selectionActive}
              />
            ),
            left: (
              <CustomHandleHorizontal
                data-selected={this.state.selectionActive}
              />
            ),
            right: (
              <CustomHandleHorizontal
                data-selected={this.state.selectionActive}
              />
            )
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
          disableDragging={this.state.disabledDrag}
          onClick={this.handleSelection}
          // enableUserSelectHack={true}
        >
          <div className="handleArea handle" />
          <div
            className="SelectionDimensions"
            data-selected={this.state.selectionActive}
          >
            <div
              className="DimensionWrapper"
              data-selected={this.state.dimensionInputActive}
              onClick={this.handleDimensionInputToggle}
            >
              {parseInt(this.state.width)}
              {/* {this.state.width} */}
            </div>
            <span className="DimensionDivider"> × </span>
            <div className="DimensionWrapper">
              {parseInt(this.state.height)}
            </div>
            <div
              className="DimensionInputWrapper"
              data-dimension-input-active={this.state.dimensionInputActive}
            >
              <span className="RecentLabel">Recents</span>
              <div className="RecentsWrapper">
                <div
                  className="RecentItem"
                  onClick={() => {
                    this.setState({
                      width: 320,
                      dimensionInputActive: false
                    });
                  }}
                >
                  320
                </div>
                <div
                  className="RecentItem"
                  onClick={() => {
                    this.setState({
                      width: 1024,
                      dimensionInputActive: false
                    });
                  }}
                >
                  1024
                </div>
                <div
                  className="RecentItem"
                  onClick={() => {
                    this.setState({
                      width: 40,
                      dimensionInputActive: false
                    });
                  }}
                >
                  40
                </div>
                <div
                  className="RecentItem"
                  onClick={() => {
                    this.setState({
                      width: 24,
                      dimensionInputActive: false
                    });
                  }}
                >
                  24
                </div>
              </div>
              <span className="RecentLabel">Width</span>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="name"
                  className="InputField"
                  autoComplete="off"
                  placeholder="Write here"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <input
                  className="InputSubmitButton"
                  type="submit"
                  value="✓"
                  onClick={this.handleSubmit}
                  data-value={this.state.value}
                />
              </form>
            </div>
          </div>

          <div
            className="FrameLabel handle"
            data-selected={this.state.selectionActive}
          >
            Frame
          </div>
        </Rnd>
        <motion.div
          drag
          dragTransition={{
            power: 0
            // min: 0,
            // max: 200,
            // timeConstant: 250,
            // bounceStiffness: 400
            // modifyTarget: 100
          }}
          dragElastic={1}
          // whileDrag={{ scale: 1.}}
          dragConstraints={{ left: 0, right: 0, top: "50vh", bottom: "50vh" }}
        >
          <FakeToolbar className="FakeToolbar" />
        </motion.div>
        <div className="FakeHeader">
          <FakeHeaderLeft className="FakeHeaderLeft" />
          <FakeHeaderCenter className="FakeHeaderCenter" />
          <FakeHeaderRight className="FakeHeaderRight" />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
