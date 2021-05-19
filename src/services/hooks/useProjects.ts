import { useQuery } from "react-query";
import { api } from "../api";

type Project = {
  id: string;
  name: string;
  description: string;
  responsible: string;
  email: string;
  launchedAt: string;
  createdAt: string;
}

type GetProjectResponse = {
  id?: string;
  totalCount: number;
  projects: Project[];
};


export async function getProjects(page: number): Promise<GetProjectResponse> {
  const { data, headers } = await api.get('/projects', {
    params: {
      page,
    }
  });

  const totalCount = Number(headers['x-total-count']);

  const projects = data.projects.map(project => ({
    id: project.id,
    name: project.name,
    description: project.description,
    user: project.users,
    email: project.email,
    launchedAt: new Date(project.launched_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    createdAt: new Date(project.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }));

  return {
    projects,
    totalCount,
  };
}

export function useProjects(page: number){
  return useQuery(['projects', page], () => getProjects(page), {
    staleTime: 1000 * 60 * 10, // 1000 * 60 * 10 10 minutes // 1000 * 60 * 60 * 12, // 12 hours,
  });
}