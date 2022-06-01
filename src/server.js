import express from "express";
import bodyParser from "body-parser";

const articlesInfo = {
  "learn-react": {
    upvotes: 0,
    comments: [],
  },
  "learn-node": {
    upvotes: 0,
    comments: [],
  },
  "my-thoughts-on-resume": {
    upvotes: 0,
    comments: [],
  },
};

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name;
  articlesInfo[articleName].upvotes += 1;

  res
    .status(200)
    .send(
      `${articleName} now has ${articlesInfo[articleName].upvotes} number of upvotes.`
    );
});

app.post("/api/articles/:name/add-comment", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  articlesInfo[articleName].comments.push({
    username,
    text,
  });

  res.status(200).send(articlesInfo[articleName]);
});

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
