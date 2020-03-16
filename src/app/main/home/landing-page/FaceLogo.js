import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  scanBar: {
    backgroundColor: "#3182ce",
    position: "relative",
    borderRadius: "32rem",
    height: "5px",
    animation: "$scan 1s infinite"
  },

  "@keyframes scan": {
    "0%": {
      opacity: 0.8,
      transform: "translateY(0)"
    },

    "50%": {
      opacity: 1,
      transform: "translateY(12.8rem)"
    },

    "100%": {
      opacity: 0.8,
      transform: "translateY(0)"
    }
  }
}));

const FaceLogo = props => {
  const classes = useStyles();

  return (
    <div {...props}>
      <img
        className="absolute"
        src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMzE4MmNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGQ9Ik05Mi43LDY4LjhjLTEuMiwwLTIuMiwxLTIuMiwyLjJ2OS4yYzAsNS43LTQuNiwxMC4zLTEwLjMsMTAuM2gtMTBjLTEuMiwwLTIuMiwxLTIuMiwyLjJzMSwyLjIsMi4yLDIuMmgxMCAgIGM4LjEsMCwxNC43LTYuNiwxNC43LTE0LjdWNzFDOTQuOSw2OS44LDkzLjksNjguOCw5Mi43LDY4Ljh6Ij48L3BhdGg+PHBhdGggZD0iTTgwLjIsNS4xaC0xMGMtMS4yLDAtMi4yLDEtMi4yLDIuMnMxLDIuMiwyLjIsMi4yaDEwYzUuNywwLDEwLjMsNC42LDEwLjMsMTAuM3YxMC43YzAsMS4yLDEsMi4yLDIuMiwyLjJzMi4yLTEsMi4yLTIuMiAgIFYxOS44Qzk0LjksMTEuNyw4OC4zLDUuMSw4MC4yLDUuMXoiPjwvcGF0aD48cGF0aCBkPSJNNjguOSw0OC45YzEuNSwwLDIuNy0xLjIsMi44LTIuN1YzOWMwLTEuNi0xLjItMi44LTIuOC0yLjhjLTEuNiwwLTIuOCwxLjMtMi44LDIuOHY3LjFDNjYuMSw0Ny43LDY3LjQsNDguOSw2OC45LDQ4Ljl6Ij48L3BhdGg+PHBhdGggZD0iTTYzLjcsNjguM2MtMy42LDMuNi04LjQsNS42LTEzLjMsNS42aC0wLjhjLTUsMC05LjctMi0xMy4zLTUuNmMtMC44LTAuOS0yLjItMC45LTMuMSwwYy0wLjksMC44LTAuOSwyLjIsMCwzLjEgICBjNC41LDQuNSwxMC4zLDYuOSwxNi40LDYuOWgwLjhjNi4xLDAsMTItMi40LDE2LjQtNi45YzAuOS0wLjgsMC45LTIuMiwwLTMuMUM2Niw2Ny40LDY0LjYsNjcuNCw2My43LDY4LjN6Ij48L3BhdGg+PHBhdGggZD0iTTQ0LjUsNjIuMkg0NWM0LjUsMCw4LjEtMy42LDguMS04VjM5YzAtMS4yLTEtMi4yLTIuMi0yLjJzLTIuMiwxLTIuMiwyLjJ2MTUuMWMwLDIuMS0xLjcsMy43LTMuNywzLjdoLTAuNSAgIGMtMS4yLDAtMi4yLDEtMi4yLDIuMlM0My4zLDYyLjIsNDQuNSw2Mi4yeiI+PC9wYXRoPjxwYXRoIGQ9Ik0yOS43LDM2LjJjLTEuNiwwLTIuOCwxLjMtMi44LDIuOHY3LjFjMCwxLjYsMS4zLDIuOCwyLjgsMi44YzEuNiwwLDIuOC0xLjIsMi44LTIuN1YzOUMzMi41LDM3LjQsMzEuMiwzNi4yLDI5LjcsMzYuMnoiPjwvcGF0aD48cGF0aCBkPSJNNy4zLDMyLjdjMS4yLDAsMi4yLTEsMi4yLTIuMlYxOS44YzAtNS43LDQuNi0xMC4zLDEwLjMtMTAuM2gxMGMxLjIsMCwyLjItMSwyLjItMi4ycy0xLTIuMi0yLjItMi4yaC0xMCAgIGMtOC4xLDAtMTQuNyw2LjYtMTQuNywxNC43djEwLjdDNS4xLDMxLjcsNi4xLDMyLjcsNy4zLDMyLjd6Ij48L3BhdGg+PHBhdGggZD0iTTI5LjcsOTAuNWgtMTBjLTUuNywwLTEwLjMtNC42LTEwLjMtMTAuM1Y3MWMwLTEuMi0xLTIuMi0yLjItMi4yUzUsNjkuOCw1LDcxdjkuMmMwLDguMSw2LjYsMTQuNywxNC43LDE0LjdoMTAgICBjMS4zLDAsMi4yLTEsMi4yLTIuMlMzMC45LDkwLjUsMjkuNyw5MC41eiI+PC9wYXRoPjwvZz48L3N2Zz4="
        alt="face logo"
      />
      <div className={classes.scanBar} />
    </div>
  );
};

export default FaceLogo;
