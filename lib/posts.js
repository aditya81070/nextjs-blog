import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.resolve(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // remove .md to get id
    const id = fileName.replace(/\.md$/, "");
    // read markdown as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
