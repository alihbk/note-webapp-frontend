import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

type Props = { item: any; onClick: any };

const TagItem = (props: Props) => {
  return (
    <MenuItem onClick={props.onClick}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            backgroundColor: props.item.color,
            borderRadius: 50,
          }}
        ></div>
        &nbsp;
        <Typography> {props.item.name}</Typography>
      </div>
    </MenuItem>
  );
};

export default TagItem;
