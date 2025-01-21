import { Event } from "@/db/models/Event";
import { User } from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { eventId: string };
}

export async function GET(req: NextRequest, context: Context) {
  try {
    const { eventId } = context.params;
    const event = await Event.findOne({
      where: {
        id: eventId,
      },
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
    return NextResponse.json({
      message: "error fetching event",
      error: errorMessage,
    });
  }
}

// update event
// export async function PUT(req: NextRequest, context: Context) {
//   try {
//     const { eventId } = context.params;
//     const {
//       name,
//       description,
//       start_time,
//       end_time,
//       image,
//       location,
//       user_id,
//     } = await req.json();

//     const event = await Event.findByPk(eventId);

//     if (!event) {
//       return NextResponse.json({ message: "Event not found" });
//     }

//     event.name = name;
//     event.description = description;
//     event.start_time = start_time;
//     event.end_time = end_time;
//     event.image = image;
//     event.location = location;
//     event.user_id = user_id;

//     await event.save();

//     return NextResponse.json({ message: "Event Updated Successfully", event });
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     return NextResponse.json(
//       { message: "Error updating Event", error: errorMessage },
//       { status: 500 }
//     );
//   }
// }


export async function PUT(req: NextRequest, context: Context) {
  try {
    const params = await context.params; // Await params to avoid sync issues
    const { eventId } = params;

    // Parse the incoming JSON data
    const updatedFields = await req.json();

    // Find the existing event by its ID
    const event = await Event.findByPk(eventId);

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Optional: Validate and filter allowed fields
    const allowedFields = [
      "name",
      "description",
      "start_time",
      "end_time",
      "image",
      "location",
      "user_id",
    ];

    const filteredUpdates = {};
    for (const [key, value] of Object.entries(updatedFields)) {
      if (allowedFields.includes(key)) {
        filteredUpdates[key] = value;
      }
    }

    // Update only the allowed fields provided in the request
    Object.assign(event, filteredUpdates);

    // Save the updated event to the database
    await event.save();

    return NextResponse.json({
      message: "Event Updated Successfully",
      event,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error updating Event", error: errorMessage },
      { status: 500 }
    );
  }
}
// delete event

export async function DELETE(req: NextRequest, context: Context) {
  try {
    const params = await context.params; // Await the params
    const { eventId } = params;

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
