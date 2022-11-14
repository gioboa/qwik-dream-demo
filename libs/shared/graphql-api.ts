const SESSION_TOKEN_KEY = 'vendure-session-token';
let _sessionToken: string | undefined;

export function setSessionToken(value: string) {
  console.log(`setSessionToken`, value);
  _sessionToken = value;
  window.localStorage.setItem(SESSION_TOKEN_KEY, value);
}

export function graphQlQuery(query: string, variables?: Record<string, any>): Promise<any> {
  const endPoint = 'https://readonlydemo.vendure.io/shop-api';

  const headers: HeadersInit = {
    "Content-Type": "application/json"
  }
  if (!_sessionToken && typeof window !== 'undefined') {
    _sessionToken = window.localStorage.getItem(SESSION_TOKEN_KEY) ?? undefined;
  }
  if (_sessionToken) {
    headers['Authorization'] = `Bearer ${_sessionToken}`;
  }
  return fetch(endPoint, {
    method: "POST",
    headers: new Headers(headers),
    body: JSON.stringify({
      query,
      variables
    })
  })
    .then(async (res) => {
      const sessionToken = res.headers.get('vendure-auth-token');
      if (sessionToken) {
        console.log(`dispatching session token event`, sessionToken);
        document.dispatchEvent(new CustomEvent('sessionTokenReceivedEvent', { detail: { sessionToken } }))
        _sessionToken = sessionToken;
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      return res;
    })
    .then((res) => res.json());
}
