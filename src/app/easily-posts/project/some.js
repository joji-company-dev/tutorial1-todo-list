export default Post = async () => {
  const Response = await fetch("/api/posts");
  const posts = await Response.json();
  const firstPostId = posts[0].id;

  const postResponse = await fetch(`/api/posts/${firstPostId}`);
  const firstPostLog = await postResponse.json();
  console.log(firstPostLog);
};

Post();

setTimeout(() => {
  console.log("hi");
}, 1000);

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

async function fn() {
  const a = 1;

  await delay(1000);

  // ...
}
