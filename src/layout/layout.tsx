import { Link } from "react-router-dom";
type Props = { children: any };

const Layout = (props: Props) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/history">history</Link>
        </li>
      </ul>
      {props.children}
    </nav>
  );
};

export default Layout;
