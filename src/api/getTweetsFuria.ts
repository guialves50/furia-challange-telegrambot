export async function getTweetsFuria() {
  const url = new URL("https://api.twitter.com/2/tweets/search/recent");
  url.searchParams.append(
    "query",
    "@FURIA #FURIACS"
  );
  url.searchParams.append("max_results", "1");
  url.searchParams.append("tweet.fields", "created_at,author_id,text");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar tweets: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || [];
}