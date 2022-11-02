import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton } from "@mui/material";
import TagPicker from "../atoms/TagPicker";
import { Tags } from "../../../utility/const";
import noteService from "../../../services/noteService";
type Props = { title?: string; body?: string; tag?: any; onCreate?: Function };

const NoteItem = (props: Props) => {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  const [tag, settag] = useState(props.tag ? props.tag : Tags[0].name);

  const createNote = async () => {
    await noteService.createNote({ title, body, tag: tag });
    props.onCreate && props.onCreate();
  };

  return (
    <div style={{ margin: 15 }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 400,
          backgroundColor: Tags.filter((x) => x.name === tag)[0].color,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="title ..."
          inputProps={{
            style: {
              width: 380,
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

        <div style={{ display: "flex" }}>
          <TagPicker
            onSelect={(e: any) => {
              settag(e.name);
            }}
          />
          <IconButton
            onClick={async () => {
              await createNote();
            }}
          >
            <SaveIcon />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
};

export default NoteItem;
