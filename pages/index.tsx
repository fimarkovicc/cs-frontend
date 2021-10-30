import { connectToDatabase } from "./../utils/mongodb";
import { GetServerSideProps } from "next";

type Props = {
  data: any;
};

export default function Home({ data }: Props) {
  return (
    <div>
      <h1>Home</h1>
      {data ? "Connected" : "not connected"}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { client } = await connectToDatabase();

  //const isConnected = await client.isConnected();
  return {
    props: {},
  };
};
