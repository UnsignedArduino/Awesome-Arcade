import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "extensions",
        label: "Extensions",
        path: "content/extensions",
        fields: [
          {
            type: "string",
            name: "repo",
            label: "GitHub repo URL",
            isTitle: true,
            required: true,
          },
          {
            type: "boolean",
            name: "isJavascriptOnly",
            label: "Is JavaScript only extension",
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            required: true,
            isBody: true,
          },
          {
            label: "Links",
            name: "links",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                if (item.title && item.url) {
                  return { label: `${item.title} (${item.url})` };
                } else if (item.title && !item.url) {
                  return { label: `${item.title}` };
                } else if (!item.title && item.url) {
                  return { label: `${item.url}` };
                } else {
                  return { label: "Link" };
                }
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "url",
                label: "URL",
              },
            ],
          },
          {
            type: "string",
            name: "forks",
            label: "Forks of this extension",
            list: true,
          },
          {
            type: "string",
            name: "deprecated",
            label: "Deprecating extensions",
            list: true,
          },
          {
            label: "Beta status",
            name: "betaStatus",
            type: "object",
            fields: [
              {
                type: "boolean",
                name: "inBeta",
                label: "In beta",
              },
              {
                type: "string",
                name: "since",
                label: "Since",
              },
              {
                type: "string",
                name: "reason",
                label: "Reason",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
        ],
      },
      {
        name: "tools",
        label: "Tools",
        path: "content/tools",
        fields: [
          {
            type: "string",
            name: "url",
            label: "Tool URL",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "project",
            label: "Author/project",
            required: true,
          },
          {
            type: "boolean",
            name: "isNotWebsite",
            label: "Is not a website",
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            required: true,
            isBody: true,
          },
          {
            label: "Links",
            name: "links",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                if (item.title && item.url) {
                  return { label: `${item.title} (${item.url})` };
                } else if (item.title && !item.url) {
                  return { label: `${item.title}` };
                } else if (!item.title && item.url) {
                  return { label: `${item.url}` };
                } else {
                  return { label: "Link" };
                }
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "url",
                label: "URL",
              },
            ],
          },
          {
            type: "string",
            name: "forks",
            label: "Forks of this extension",
            list: true,
          },
          {
            type: "string",
            name: "deprecated",
            label: "Deprecating extensions",
            list: true,
          },
          {
            label: "Beta status",
            name: "betaStatus",
            type: "object",
            fields: [
              {
                type: "boolean",
                name: "inBeta",
                label: "In beta",
              },
              {
                type: "string",
                name: "since",
                label: "Since",
              },
              {
                type: "string",
                name: "reason",
                label: "Reason",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
        ],
      },
    ],
  },
});
