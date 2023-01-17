import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Character = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { query } = useRouter();
  return (
    <div>
      <Head>
        <title>{data.name}</title>
      </Head>
      <h1>
        {data.name} {data.location.name}
      </h1>
      <Image
        src={`${data.image}`}
        width={200}
        height={200}
        alt={`${"data.name"}`}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  data: any;
}> = async (context) => {
  // Fetch data from external API

  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${context.query.id}`
  );
  const data = await res.json();
  console.log(data.image);

  // Pass data to the page via props
  return { props: { data } };
};

export default Character;
