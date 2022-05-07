import { GetStaticPaths } from "next";
import Head from "next/head";
import Date from "../../components/date";
import { getAllPostIds, getArticleData } from "../../lib/articles";

type Params = {
  params: {
    id: string;
  };
};

export default function Post({
  articleData,
}: {
  articleData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <>
      <Head>
        <title>{articleData.title}</title>
      </Head>
      <article>
        <h1>{articleData.title}</h1>
        <div>
          <Date dateString={articleData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const articleData = await getArticleData(params.id);
  return {
    props: {
      articleData,
    },
  };
};
