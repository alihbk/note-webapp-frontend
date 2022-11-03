import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Tags } from "../../../utility/const";
import TagPicker from "../atoms/tagPicker";
type Props = {
  title?: string;
  body?: string;
  tag?: any;
  onUpdate?: Function;
  onCreate?: Function;
  onDelete?: Function;
  isNew: boolean;
};

const NoteItem = (props: Props) => {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  const [tag, settag] = useState(props.tag ? props.tag : Tags[0].name);

  const [style, setStyle] = useState({
    display: "none",
  });

  return (
    <div
      style={{ margin: 15 }}
      onMouseEnter={(e) => {
        setStyle({
          display: "flex",
        });
      }}
      onMouseLeave={(e) => {
        setStyle({
          display: "none",
        });
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 400,
          backgroundColor: Tags.filter((x) => x.name === tag)[0].color,
          ":hover": {
            boxShadow: 20,
            transition: "1s",
          },
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="title ..."
          inputProps={{
            style: {
              width: 380,
              fontWeight: "bold",
            },
          }}
          value={title}
          onChange={(e) => {
            console.log("e", e);
            setTitle(e.target.value);
          }}
        />
        <InputBase
          multiline
          sx={{ ml: 1, flex: 1 }}
          placeholder="take a note ..."
          inputProps={{
            style: {
              width: 380,
            },
          }}
          value={body}
          onChange={(e) => {
            console.log("e", e);
            setBody(e.target.value);
          }}
        />

        <div style={style}>
          <TagPicker
            onSelect={(e: any) => {
              settag(e.name);
            }}
          />
          <IconButton
            onClick={() => {
              if (props.isNew) {
                props.onCreate && props.onCreate({ title, body, tag: tag });
              } else {
                props.onUpdate && props.onUpdate({ title, body, tag: tag });
              }
            }}
          >
            <SaveIcon />
          </IconButton>
          {!props.isNew && (
            <IconButton
              onClick={() => {
                props.onDelete && props.onDelete();
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default NoteItem;
