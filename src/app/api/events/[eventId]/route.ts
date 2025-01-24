import { Event } from "@/db/models/Event";
import { User } from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch an Event by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { eventId } = await params; // Await params here

    const event = await Event.findOne({
      where: { id: eventId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email"],
        },
      ],
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error fetching event", error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT - Update an Event by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { eventId } = await params; // Await params here
    const updatedFields = await req.json();

    const event = await Event.findByPk(eventId);

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const allowedFields = [
      "name",
      "description",
      "start_time",
      "end_time",
      "image",
      "location",
      "user_id",
    ];

    // Only update allowed fields
    const filteredUpdates = Object.fromEntries(
      Object.entries(updatedFields).filter(([key]) =>
        allowedFields.includes(key)
      )
    );

    Object.assign(event, filteredUpdates);

    await event.save();

    return NextResponse.json({
      message: "Event Updated Successfully",
      event,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error updating event", error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Delete an Event by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { eventId } = await params; // Await params here

    const event = await Event.findByPk(eventId);

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    await event.destroy();

    return NextResponse.json({ message: "Event Deleted Successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error deleting event", error: errorMessage },
      { status: 500 }
    );
  }
}
