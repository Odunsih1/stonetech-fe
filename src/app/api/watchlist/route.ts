// src/app/api/watchlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface WatchlistItem {
  imdbID: string;
  order: number;
}

export async function GET(req: NextRequest) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const docRef = doc(db, "users", user.uid, "watchlist", "movies");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ movies: [] }, { status: 200 });
    }

    const data = docSnap.data();
    return NextResponse.json({ movies: data.movies || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch watchlist" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { movies }: { movies: WatchlistItem[] } = await req.json();
    const docRef = doc(db, "users", user.uid, "watchlist", "movies");
    await setDoc(docRef, { movies }, { merge: true });

    return NextResponse.json({ message: "Watchlist updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update watchlist" }, { status: 500 });
  }
}