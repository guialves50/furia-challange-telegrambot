export async function getTweetsFuria() {
  const url = "https://api.twitter.com/2/tweets/search/recent";
  const params = new URLSearchParams();

  const query = '(from:FURIA #FURIACS) lang:pt -is:retweet';
  params.append("query", query);
  params.append("tweet.fields", "created_at,author_id,text");

  type Tweet = {
    id: string;
    text: string;
    created_at: string;
  };

  const fullUrl = `${url}?${params.toString()}`;
  const bearerToken = process.env.TWITTER_TOKEN;

  if (!bearerToken) {
    console.error("❌ TWITTER_TOKEN não está definido nas variáveis de ambiente.");
    return [];
  }

  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erro ${response.status}: ${text}`);
    }

    const json = await response.json();
    return json.data as Tweet[] || [];
  } catch (error: any) {
    console.error("Erro ao buscar tweets:", error.message || error);
    return [];
  }
}
