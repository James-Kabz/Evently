"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "@/components/ToastMessage";
import Loading from "@/app/loading";
import { Event, TicketType } from "@/types";
import EventDetails from "@/components/EventDetails";

export default function EventDetailPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();

        setEvent(data.event);
        setTicketTypes(data.event.ticketTypes || []);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        showToast.error("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center text-xl font-semibold">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <ToastContainer />
      {event && (
        <EventDetails event={event} ticketTypes={ticketTypes} onBack={() => router.push("/dashboard/events")} />
      )}
    </div>
  );
}
