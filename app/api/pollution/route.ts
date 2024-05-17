import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const res = await axios.get(url);
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching polluting data: ", (error as Error).message);
    return new Response("Error polluting forecast data", { status: 500 });
  }
}
