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
      <nav className="bg-gray-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href={"/"}>
                    <a className="text-gray-900 hover:text-white">Home</a>
                  </Link>
                  <Link href={"/articles"}>
                    <a className="text-gray-900 hover:text-white">Articles</a>
                  </Link>
                  <Link href={"/profile"}>
                    <a className="text-gray-900 hover:text-white">Profile</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="ml-auto hidden space-x-4 text-sm:md:block"></div>
          </div>
        </div>
      </nav>
      <div className="flex-grow bg-gray-300">
        <div className="mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-5xl">
          <ul className="grid gap-6 md:grid-cols-2 md:gap-8">
            <li className="transition ease-in-out duration-200 group list-none rounded-lg bg-gray-800 hover:gb-gray-700">
              <a className="flex h-full flex-col justify-between px-6 py-4">
                <div className="flex items-center space x-3"></div>
                <h2 className="mt-10 text-2xl font-bold text-gray-200">test</h2>
                <div className="mt-10"></div>
              </a>
            </li>
            <li className="transition ease-in-out duration-200 group list-none rounded-lg bg-gray-800 hover:gb-gray-700">
              <a className="flex h-full flex-col justify-between px-6 py-4">
                <div className="flex items-center space x-3"></div>
                <h2 className="mt-10 text-2xl font-bold text-gray-200">
                  test2
                </h2>
                <div className="mt-10"></div>
              </a>
            </li>
            {allArticles.map(({ id, data }) => (
              <li
                key={id}
                className="transition ease-in-out duration-200 group list-none rounded-lg bg-gray-800 hover:gb-gray-700"
              >
                <Link href={`/articles/${id}`}>
                  <a className="flex h-full flex-col justify-between px-6 py-4">
                    <h2 className="mt-10 text-2xl font-bold text-gray-200">
                      {data.title}
                    </h2>
                    <small className="text-white">
                      <Date dateString={data.date} />
                    </small>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
