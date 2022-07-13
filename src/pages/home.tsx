import Home from "../domain/home/home";
import Layout from "../layout/layout";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default HomePage;
