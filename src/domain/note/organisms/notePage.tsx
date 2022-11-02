import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Query from "query-string";
import { useState, useEffect } from "react";
import noteService from "../../../services/noteService";
import TagFilter from "../atoms/tagFilter";
import NoteItem from "../molecules/noteItem";

type Props = {};

const NotePage = (props: Props) => {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  useEffect(() => {
    (async () => {
      await getData(null);
    })();
  }, []);

  useEffect(() => {}, [shouldUpdate]);

  const deleteNote = async (id: any) => {
    await noteService.delete(id);
    await getData(null);
  };

  const getData = async (filter: any) => {
    let result = await noteService.get(Query.stringify(filter));

    setData(result.data);
  };

  const createNote = async (e: any) => {
    await noteService.createNote(e);
    await getData(null);
  };

  if (showLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 50 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ backgroundColor: "#eee", height: "100%" }}>
      <TagFilter
        onSelect={async (e: any) => {
          var q: any = {};
          if (e.name !== "All") {
            q.tag = e.name;
          }
          await getData(q);
          setShouldUpdate(!shouldUpdate);
        }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <NoteItem
          isNew={true}
          onCreate={async (e: any) => {
            await createNote(e);
            setShouldUpdate(!shouldUpdate);
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          flexWrap: "wrap",
          alignContent: "start",
        }}
      >
        {data?.map((x: any, i: number) => {
          return (
            <NoteItem
              key={i}
              title={x.title}
              body={x.body}
              tag={x.tag}
              id={x._id}
              onDelete={async () => {
                await deleteNote(x._id);
              }}
              isNew={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NotePage;
