export async function POST(req) {
  try {
    const { model = "deepseek-chat", temperature = 0.7, messages = [] } = await req.json();
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) return new Response(JSON.stringify({ error: "DEEPSEEK_API_KEY belum di-set" }), { status: 400 });

    const r = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        temperature,
        messages: [
          { role: "system", content: "You are a helpful finance assistant in Indonesian." },
          ...messages
        ]
      })
    });
    if (!r.ok) {
      const t = await r.text();
      return new Response(JSON.stringify({ error: t || "DeepSeek error" }), { status: 500 });
    }
    const json = await r.json();
    const content = json?.choices?.[0]?.message?.content || "";
    return Response.json({ message: { role: "assistant", content } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
