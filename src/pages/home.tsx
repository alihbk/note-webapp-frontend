 import NotePage from "../domain/note/notePage";
import Layout from "../layout/layout";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <Layout>
      <NotePage/>
      {/* <Home /> */}
    </Layout>
  );
};

export default HomePage;
