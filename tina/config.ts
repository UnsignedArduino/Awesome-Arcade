import { defineConfig, Form, TinaCMS } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

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
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            label: "Author",
            name: "author",
            type: "string",
            required: true,
          },
          {
            type: "image",
            label: "Hero image",
            name: "heroImage",
          },
          {
            label: "Description",
            name: "description",
            type: "string",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "datetime",
            name: "createdAt",
            label: "Created at",
            ui: {
              timeFormat: "HH:mm",
            },
          },
          {
            type: "datetime",
            name: "lastUpdated",
            label: "Last updated",
            ui: {
              timeFormat: "HH:mm",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "MakeCodeArcadeBlockDoc",
                label: "MakeCode Arcade Block Documentation",
                fields: [
                  {
                    name: "blocksJS",
                    label: "Blocks (JS)",
                    type: "string",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    name: "javascript",
                    label: "JavaScript",
                    type: "string",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    name: "python",
                    label: "Python",
                    type: "string",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
              {
                name: "MakeCodeArcadeProjectCode",
                label: "MakeCode Arcade Project Code",
                fields: [
                  {
                    name: "id",
                    label: "Project ID",
                    type: "string",
                  },
                ],
              },
              {
                name: "MakeCodeArcadeProjectEditor",
                label: "MakeCode Arcade Project Editor",
                fields: [
                  {
                    name: "id",
                    label: "Project ID",
                    type: "string",
                  },
                ],
              },
              {
                name: "MakeCodeArcadeProjectSimulator",
                label: "MakeCode Arcade Project Simulator",
                fields: [
                  {
                    name: "id",
                    label: "Project ID",
                    type: "string",
                  },
                ],
              },
            ],
          },
        ],
        ui: {
          router: ({ document }) => {
            return `/blog/${document._sys.filename}`;
          },
          beforeSubmit: async ({
            form,
            values,
          }: {
            form: Form;
            cms: TinaCMS;
            values: Record<string, any>;
          }) => {
            const now = new Date().toISOString();
            if (form.crudType === "create") {
              values.createdAt = now;
              values.lastUpdated = null;
            } else {
              values.lastUpdated = now;
            }
            return values;
          },
        },
      },
    ],
  },
});
