import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";

type Props = {
  data: any;
};

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      {data &&
        data.results.map((char: any) => (
          <>
            <Link key={char.id} href={`/character/${char.id}`}>
              {char.name}
            </Link>
            <br />
          </>
        ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  data: any;
}> = async () => {
  // Fetch data from external API
  const res = await fetch(`https://rickandmortyapi.com/api/character`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
};

export default Home;
