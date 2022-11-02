import { Tags } from "../../../utility/const";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

type Props = { onSelect: Function };

const TagPicker = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        sx={{ p: "10px" }}
        aria-label="directions"
        onClick={handleClick}
      >
        <ColorLensIcon />
      </IconButton>

      <Menu
        sx={{ padding: 0 }}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          disablePadding: true,
        }}
        PaperProps={{
          elevation: 0,

          sx: {
            backgroundColor: "#fff",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "#fff",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            padding: 0,
          }}
        >
          {Tags.map((item, index) => (
            <MenuItem
              onClick={() => {
                props.onSelect(item);
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: item.color,
                    borderRadius: 8,
                  }}
                ></div>
                &nbsp;
                <Typography> {item.name}</Typography>
              </div>
            </MenuItem>
          ))}
        </div>
      </Menu>
    </>
  );
};

export default TagPicker;
