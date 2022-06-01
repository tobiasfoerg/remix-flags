import { json } from "remix";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";

export type LoaderData = {
  html: string;
  navigation: { label: string; to: string }[];
};

export let loader = async () => {
  let docResponse = await fetch(
    "https://github-md.com/jacob-ebey/remix-flags/main/docs/index.md"
  );
  let doc = (await docResponse.json()) as {
    attributes: {
      title: string;
      description: string;
      navigation: { label: string; to: string }[];
    };
    html: string;
  };

  return json<LoaderData>({
    html: doc.html,
    navigation: doc.attributes.navigation,
  });
};

export default function DocsLayout() {
  let data = useLoaderData() as LoaderData;

  return (
    <div className="row">
      <div className="sm-12 md-8 col">
        <div className="paper">
          <Outlet context={data} />
        </div>
      </div>
      <div className="sm-12 md-4 col sidebar">
        <aside className="paper">
          <h3 className="text-center">Documentation</h3>
          <div className="row flex-center">
            {data.navigation.map(({ label, to }) => (
              <NavLink className="sm-12 paper-btn" to={to} end={to === "/docs"}>
                {label}
              </NavLink>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
