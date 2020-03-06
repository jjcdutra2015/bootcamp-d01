const express = require('express');

const server = express();

server.use(express.json());

function checkIdProject(req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ erro: 'Project does not exist' })
  }

  return next();
}

function logRequests(req, res, next) {
  console.count("Número de requisições");

  return next();
}

server.use(logRequests);

const projects = [];

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = { id, title, tasks: [] };

  projects.push(project);

  return res.json(project);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkIdProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkIdProject, (req, res) => {
  const { id } = req.params;

  const project = projects.findIndex(p => p.id == id);

  projects.splice(project, 1);

  return res.send();
});

server.post('/projects/:id/tasks', checkIdProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);