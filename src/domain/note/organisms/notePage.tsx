import { Box } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Query from "query-string";
import { forwardRef, useEffect, useState } from "react";
import noteService from "../../../services/noteService";
import TagFilter from "../atoms/tagFilter";
import NoteItem from "../molecules/noteItem";

type Props = {};

const NotePage = (props: Props) => {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<any>(null);

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, [filter]);

  useEffect(() => {}, [data]);

  const createNote = async (e: any) => {
    try {
      setShowLoading(true);
      let result = await noteService.post(e);
      if (result.status === 201) {
        await getData();
        handleSetAlert("success", "record was created successfully");
      }
    } catch (e) {
      handleSetAlert("error", e.message);
    } finally {
      setShowLoading(false);
    }
  };

  const updateNote = async (e: any, id: any) => {
    try {
      setShowLoading(true);
      let result = await noteService.patch(e, id);
      if (result.status === 200) {
        await getData();
        handleSetAlert("success", "record was updated successfully");
      }
    } catch (e) {
      handleSetAlert("error", e.message);
    } finally {
      setShowLoading(false);
    }
  };

  const deleteNote = async (id: any) => {
    try {
      setShowLoading(true);
      let result = await noteService.delete(id);
      if (result.status === 204) {
        await getData();
        handleSetAlert("success", "record was deleted successfully");
      }
    } catch (e) {
      handleSetAlert("error", e.message);
    } finally {
      setShowLoading(false);
    }
  };

  const getData = async () => {
    try {
      setShowLoading(true);
      let result = await noteService.get(Query.stringify(filter));
      if (result.status === 200) {
        setData(result.data);
      }
    } catch (e) {
      handleSetAlert("error", e.message);
    } finally {
      setShowLoading(false);
    }
  };

  // #region alert
  const [openAlert, setOpenAlert] = useState(false);

  interface IError {
    type: any;
    message: string;
  }
  const [error, setError] = useState<IError>({ type: "", message: "" });

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSetAlert = (type: string, message: string) => {
    setError({ type: type, message: message });
    setOpenAlert(true);
  };

  const handleCloseAlert = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  let renderAlert = () => {
    return (
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={error.type}
          sx={{ width: "100%" }}
        >
          {error.message}
        </Alert>
      </Snackbar>
    );
  };
  // #endregion

  if (showLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 50 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ backgroundColor: "#eee", height: "100%" }}>
      {renderAlert()}
      <TagFilter
        onSelect={async (e: any) => {
          var q: any = {};
          if (e.name !== "All") {
            q.tag = e.name;
          }
          setFilter(q);
        }}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <NoteItem
          isNew={true}
          onCreate={async (e: any) => {
            await createNote(e);
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
              onDelete={async () => {
                await deleteNote(x._id);
              }}
              onUpdate={async (e: any) => {
                await updateNote(e, x._id);
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
