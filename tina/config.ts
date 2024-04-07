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
        name: "authors",
        label: "Authors",
        path: "content/authors",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "link",
            label: "Link",
            required: true,
          },
          {
            type: "rich-text",
            name: "bio",
            label: "Bio",
            required: true,
            isBody: true,
          },
          {
            type: "string",
            name: "avatarURL",
            label: "Avatar URL",
          },
        ],
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
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
            type: "reference",
            collections: ["authors"],
            required: true,
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
            console.log(values);
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
