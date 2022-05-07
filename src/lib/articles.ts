import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const articlesDirectory = path.join(process.cwd(), "src", "articles");
console.log(articlesDirectory);

export type Articles = {
  id: string;
  content: string;
  data: { title: string; date: string };
  isEmpty: boolean;
  excerpt: string;
  orig: string;
};

export function getSortedArticlesData(): Articles[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult,
    };
  });

  return JSON.parse(
    JSON.stringify(
      allArticlesData.sort((a, b) => {
        if (a.data.date < b.data.date) {
          return 1;
        } else if (a > b) {
          return -1;
        } else {
          return 0;
        }
      })
    )
  );
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(articlesDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getArticleData(id: string) {
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
