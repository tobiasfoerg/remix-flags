import { json } from "remix";
import { Link, useLoaderData } from "@remix-run/react";

import type { LoaderFunction } from "~/types";
import { requireUserId } from "~/utils";

type LoaderData = {
  projects: { id: string; name: string }[];
};

export let loader: LoaderFunction = async ({ context: { db, session } }) => {
  let userId = requireUserId(session, "/dashboard");

  let projects = await db.getProjectsByUserId(userId);

  return json<LoaderData>({ projects });
};

export default function ProjectsDashboard() {
  let { projects } = useLoaderData() as LoaderData;

  return (
    <main>
      <h1>Projects</h1>
      <p>
        <Link className="paper-btn" to="projects/new">
          New Project
        </Link>
      </p>

      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(({ id, name }) => (
              <tr key={id}>
                <td>
                  <Link to={`project/${id}`}>{name}</Link>
                </td>
                <td>
                  <Link to={`project/${id}`}>{id}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
