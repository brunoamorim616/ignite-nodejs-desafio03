const express = require("express");

const { v4: uuid, validate } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const idIsValid = validate(id);

  if (!idIsValid) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (!repositoryIndex) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const repository = { ...repositories[repositoryIndex], title, url, techs };

  repository.title = title;

  repository.url = url;

  repository.techs = techs;

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const idIsValid = validate(id);

  if (!idIsValid) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (!repositoryIndex) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const idIsValid = validate(id);

  if (!idIsValid) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (!repositoryIndex) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex];

  return response.status(201).json(likes);
});

module.exports = app;
