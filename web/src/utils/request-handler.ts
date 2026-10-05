const BUFFER_GRAPHQL_ENDPOINT = "https://api.buffer.com";

export async function clientSideRequestHandler(body: string) {
  const response = await fetch(BUFFER_GRAPHQL_ENDPOINT, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  return response;
}
