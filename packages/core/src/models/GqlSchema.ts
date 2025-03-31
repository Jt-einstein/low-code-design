import { action, define } from '@formily/reactive';
import { domains } from 'low-code-extension';
import { gql } from '@apollo/client';

export type TDomainSchema = {
  allTypes?: any;
  types?: any;
  queryInterfaces?: any;
  mutationInterfaces?: any;
};

export type TGqlSchema = {
  domain: string;
  schema: TDomainSchema;
};

export class GqlSchema {
  /** 最近选择的域 */
  latestDomain: string;
  /** schema列表 */
  schemas: TGqlSchema[] = [];
  /** 是否已初始化 */
  isInited: boolean;

  constructor(props: TGqlSchema[]) {
    this.schemas = props;
    this.makeObservable();
  }

  /** 初始化gql schema */
  async initGqlSchemas(client) {
    /** 获取schema定义 */
    const res = await Promise.all(
      domains.map(({ value }) => getGqlSchema(value, client))
    );
    const gqlSchemas: TGqlSchema[] = res.map((item, index) => {
      const allTypes = item?.data?.__schema?.types || [];
      const types = allTypes.filter(
        (item) => !['Query', 'Mutation'].includes(item?.name)
      );
      const queryInterfaces = ((allTypes || []).filter(
        (item) => item?.name == 'Query'
      ) || [{}])?.[0]?.fields;
      const mutationInterfaces = ((allTypes || []).filter(
        (item) => item?.name == 'Mutation'
      ) || [{}])?.[0]?.fields;

      return {
        domain: domains[index].value,
        schema: {
          allTypes,
          types,
          queryInterfaces,
          mutationInterfaces,
        },
      };
    });
    /** gqlSchema */
    this.schemas = gqlSchemas;
    this.isInited = true;
  }

  async getDomainSchemas(domain, client): Promise<TGqlSchema> {
    if (!this.isInited) {
      await this.initGqlSchemas(client);
    }
    return (
      this.schemas.find((item) => item.domain == domain) || {
        domain,
        schema: {},
      }
    );
  }

  setDomainSchema(domain, schema: TDomainSchema) {
    const index = this.schemas.findIndex((item) => item.domain == domain);
    if (index == -1) {
      this.schemas.push({ domain, schema });
    } else {
      this.schemas[index] = { domain, schema };
    }
  }

  /** 获取最近选择的domain */
  getLatestDomain() {
    return this.latestDomain;
  }

  /** 设置最近选择的domain */
  setLatestDomain() {
    this.latestDomain;
  }

  clear() {
    this.schemas = [];
  }

  makeObservable() {
    define(this, {
      setDomainSchema: action,
      getDomainSchemas: action,
      clear: action,
    });
  }
}

/** 获取schema */
export function getGqlSchema(domain, client) {
  return client.query({
    query: IntrospectionQuery,
    variables: {
      domain,
    },
    fetchPolicy: 'network-only',
  });
}

const IntrospectionQuery = gql`
  query IntrospectionQuery {
    __schema {
      queryType {
        name
      }
      mutationType {
        name
      }
      subscriptionType {
        name
      }
      types {
        ...FullType
      }
      directives {
        name
        description

        locations
        args {
          ...InputValue
        }
      }
    }
  }

  fragment FullType on __Type {
    kind
    name
    description

    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }

  fragment InputValue on __InputValue {
    name
    description
    type {
      ...TypeRef
    }
    defaultValue
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
