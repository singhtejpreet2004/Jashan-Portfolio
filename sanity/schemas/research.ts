import { defineType, defineField } from "sanity";

export default defineType({
  name: "research",
  title: "Research",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "In Progress", value: "in-progress" },
        ],
      },
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
    }),
  ],
});
