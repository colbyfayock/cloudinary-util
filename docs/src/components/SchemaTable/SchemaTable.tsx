import Link from "next/link";

import { sortByKey } from "../../lib/util";

import Table from "@/components/Table";

interface Configuration {
  anyOf: Array<{ type: string }>;
  default: string;
  description?: string;
  type: string;
}

interface Property {
  name: string;
  required: boolean;
  types: Array<string>;
  defaultValue?: string;
  description?: string;
  link?: {
    label: string;
    url: string;
  };
  path?: string;
}

export const SchemaTable = ({ schema, schemaKey }) => {
  const { properties, required } = schema.definitions[schemaKey];

  const formattedProperties = Object.entries(properties).map(
    ([name, configuration]: [string, Configuration]) => {
      const { type, anyOf, default: defaultValue } = configuration;

      const types = Array.isArray(type) ? type : [type];

      if (anyOf) {
        anyOf
          .filter(({ type }) => !!type)
          .forEach((ao) => {
            types.push(ao.type);
          });
      }

      const description =
        configuration?.description && JSON.parse(configuration.description);
      const { path, text, url } = description || {};

      const property: Property = {
        name,
        path,
        required: required.includes(name),
        types,
        defaultValue,
        description: text,
        link: url && {
          label: "More Info",
          url,
        },
      };

      return property;
    }
  );

  const sortedProperties = sortByKey(formattedProperties, "name");

  return (
    <Table
      columns={[
        {
          id: "property",
          title: "Property",
        },
        {
          id: "types",
          title: "Types",
        },
        {
          id: "required",
          title: "Required",
        },
        {
          id: "default",
          title: "Default",
        },
        {
          id: "description",
          title: "Description",
        },
        {
          id: "more",
        },
      ]}
      data={sortedProperties.map((prop: Property) => {
        return {
          default: prop.defaultValue || "-",
          description: prop.description,
          more: prop.link?.url
            ? () => <a href={prop.link.url}>{prop.link.label}</a>
            : "",
          property: () => {
            if (prop.path) {
              return <Link href={prop.path}>{prop.name}</Link>;
            }
            return prop.name;
          },
          required: prop.required ? "Yes" : "-",
          type:
            prop.types && prop.types.filter((v) => !!v).length > 0
              ? prop.types.join(" | ")
              : "-",
        };
      })}
    />
  );
};

export default SchemaTable;
