import { defineType, defineField } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "object",
      fields: [
        defineField({ name: "degree", title: "Degree", type: "string" }),
        defineField({ name: "institution", title: "Institution", type: "string" }),
        defineField({ name: "period", title: "Period", type: "string" }),
      ],
    }),
  ],
});
