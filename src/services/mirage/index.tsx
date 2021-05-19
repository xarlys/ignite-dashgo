import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

type Project = {
  name: string;
  description: string;
  responsible: string;
  email: string;
  launched_at: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
      project: Model.extend<Partial<Project>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User${i + 1}`;
        },        
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
      project: Factory.extend({
        name(i: number) {
          return `Nome do Residencial/Projeto ${i + 1}`;
        },
        description() {
          return faker.lorem.text().toLowerCase();
        },
        responsible(i: number) {
          return `User${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        launchedAT() {
          return faker.date.recent(10);
        },
        createdAt() {
          return faker.date.recent(10);
        },
      })
    },

    seeds(server) {
      server.createList('user', 200);
      server.createList('project', 30);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750; // delay 750ms

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users
          .sort((a, b) => a.created_at - b.created_at)
          .slice(pageStart, pageEnd);

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        );
      });

      this.get('/users/:id');
      this.post('/users');


      //Projects
      this.get('/projects', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('project').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const projects = this.serialize(schema.all('project'))
          .projects
          .sort((a, b) => a.created_at - b.created_at)
          .slice(pageStart, pageEnd);

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { projects }
        );
      });

      this.get('/projects/:id');
      this.post('/projects');


      // Altera o namespace para vazio para não dar conflito com a API Root do Next
      this.namespace = '';
      // Faz com que se a chamada não for encontrada no mirage seja passada para os API Root do Next
      this.passthrough();
    }
  });

  return server;
}