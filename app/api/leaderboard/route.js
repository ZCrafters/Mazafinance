// app/api/leaderboard/route.js
import { promises as fs } from "node:fs";
import path from "node:path";

const dataPath = path.join(process.cwd(), "data", "leaderboard.json");

async function readLeaderboard() {
  try {
    const raw = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeLeaderboard(data) {
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    const list = await readLeaderboard();
    console.log("[LEADERBOARD] GET count:", list.length);
    return new Response(JSON.stringify(list), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e) {
    console.error("[LEADERBOARD] GET exception:", e);
    return new Response(JSON.stringify([]), { status: 200 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, score, badges = [], game = "scrabble" } = body || {};

    if (!name || typeof score !== "number") {
      return new Response(JSON.stringify({ error: "name (string) & score (number) required" }), { status: 400 });
    }

    if (process.env.VERCEL) {
      // Vercel read-only – arahkan untuk pakai DB/kv atau hanya localStorage
      console.warn("[LEADERBOARD] POST blocked on Vercel (read-only FS)");
      return new Response(
        JSON.stringify({ error: "Write disabled on Vercel. Use external DB/KV or client localStorage." }),
        { status: 405 }
      );
    }

    const list = await readLeaderboard();
    const entry = { id: crypto.randomUUID(), name, score, badges, game, createdAt: Date.now() };
    list.push(entry);
    list.sort((a, b) => b.score - a.score);

    await writeLeaderboard(list);

    console.log("[LEADERBOARD] POST add:", { name, score });
    return new Response(JSON.stringify(entry), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[LEADERBOARD] POST exception:", e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
