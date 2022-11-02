import NotePage from "../domain/note/organisms/notePage";
import Layout from "../layout/layout";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <Layout>
      <NotePage />
    </Layout>
  );
};

export default HomePage;
