const BUFFER_GRAPHQL_ENDPOINT = "https://api.buffer.com";

export async function clientSideRequestHandler(body: any) {
  const _response = await fetch(BUFFER_GRAPHQL_ENDPOINT, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
}
