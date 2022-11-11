export function graphQlQuery(query: string, variables: Record<string, any>): Promise<any> {
  const endPoint = 'https://readonlydemo.vendure.io/shop-api';
  return fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    })
  }).then((res) => res.json());
}
