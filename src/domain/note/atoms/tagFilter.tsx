import { Tags } from "../../../utility/const";
import TagItem from "./tagItem";

type Props = { onSelect?: Function };

const TagFilter = (props: Props) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#FFDA00",
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          padding: 0,
        }}
      >
        {Tags.concat({ name: "All", color: "#000" }).map((tag, index) => (
          <TagItem
            key={index}
            onClick={() => {
              props.onSelect && props.onSelect(tag);
            }}
            item={tag}
          />
        ))}
      </div>
    </>
  );
};

export default TagFilter;
