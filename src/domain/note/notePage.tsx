import React, { useState, useEffect } from "react";
import noteService from "../../services/noteService";
import NoteItem from "./molecules/noteItem";

type Props = {};

const NotePage = (props: Props) => {
  const [data, setData] = useState([]);
  const [shouldUpdate, setshouldUpdate] = useState(false);
  useEffect(() => {
    (async () => {
      let ress = await noteService.get();
      setData(ress.data);
    })();
  }, []);

  return (
    <div style={{ backgroundColor: "#eee", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <NoteItem
          onCreate={() => {
            setshouldUpdate(!shouldUpdate);
          }}
        />
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {data.map((x: any, i) => {
          return <NoteItem title={x.title} body={x.body} tag={x.tag} />;
        })}
      </div>
    </div>
  );
};

export default NotePage;
