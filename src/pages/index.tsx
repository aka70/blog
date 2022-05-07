import { getSortedArticlesData } from "lib/articles";
import type { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import Date from "../components/date";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const allArticles = getSortedArticlesData();
  return {
    props: {
      allArticles,
    },
  };
};

const Home: NextPage<Props> = ({ allArticles }) => {
  return (
    <>
      <div>hello</div>
      <ul>
        {allArticles.map(({ id, data }) => (
          <li key={id}>
            <Link href={`/articles/${id}`}>
              <a>{data.title}</a>
            </Link>
            <br />
            <small>
              <Date dateString={data.date} />
            </small>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
