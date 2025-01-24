import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import React from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const getStaticProps = (async () => {
  // Fetch data from external API
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const todo: Todo = await res.json();
  // Pass data to the page via props
  return { props: { todo: todo } };
}) satisfies GetStaticProps<{ todo: Todo }>;

export default function TestPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <div>TestPage {JSON.stringify(props)}</div>;
}
