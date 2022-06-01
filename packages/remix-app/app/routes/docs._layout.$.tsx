import { json } from "remix";
import { useLoaderData } from "@remix-run/react";

import type { LoaderFunction } from "~/types";

type LoaderData = {
  html: string;
};

export let loader: LoaderFunction = async ({ params }) => {
  let docResponse = await fetch(
    `https://github-md.com/jacob-ebey/remix-flags/main/docs/${params["*"]}.md`
  );
  let doc = (await docResponse.json()) as {
    attributes: {
      title: string;
      description: string;
    };
    html: string;
  };

  return json<LoaderData>({
    html: doc.html,
  });
};

export default function DocsCatchAll() {
  let { html } = useLoaderData() as LoaderData;

  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
