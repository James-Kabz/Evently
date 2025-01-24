import { Event } from "@/db/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const event = await Event.findAll();
    return NextResponse.json({ event });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error fetching events", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      description,
      start_time,
      end_time,
      image,
      location,
      user_id,
    } = await req.json();

    const event = await Event.create({
          name,
          description,
          start_time,
          end_time,
          image,
          location,
          user_id
    });

    return NextResponse.json({
          message: 'Event Created Successfully',
          event,
    })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error submitting events");
    return NextResponse.json(
      { message: "Failed to submit event", error: errorMessage },
      { status: 500 }
    );
  }
}
