/* eslint-disable */
import { mode } from "@chakra-ui/theme-tools";

const Card = {
  baseStyle: (props) => ({
    p: "20px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    borderRadius: "20px",
    minWidth: "0px",
    wordWrap: "break-word",
    bg: mode("#ffffff", "navy.800")(props),
    backgroundClip: "border-box",
  }),
};

const CardComponent = {
  components: {
    Card,
  },
};

export default CardComponent;