"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "@/components/ToastMessage";
import Loading from "@/app/loading";
import { Event } from "@/types";
import Image from 'next/image';
export default function EventDetailPage() {
          const { eventId } = useParams();
          const [event, setEvent] = useState<Event | null>(null);
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
                              <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
                                        {event?.image && (
                                          <Image src={event.image} alt={event.name} width={1920} height={960} className="w-full h-96 object-cover" />
                                        )}
                                        <div className="p-8">
                                                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{event?.name}</h1>
                                                  <p className="text-gray-700 text-lg mb-6">{event?.description}</p>
                                                  <div className="space-y-4">
                                                            <p className="text-lg"><strong className="text-gray-900">Location:</strong> {event?.location}</p>
                                                            <p className="text-lg"><strong className="text-gray-900">Starts:</strong> {new Date(event?.start_time || "").toLocaleString()}</p>
                                                            <p className="text-lg"><strong className="text-gray-900">Ends:</strong> {new Date(event?.end_time || "").toLocaleString()}</p>
                                                  </div>
                                                  <div className="mt-6 flex justify-between">
                                                            <button
                                                                      onClick={() => router.push("/dashboard/events")}
                                                                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                                                            >
                                                                      Back to Events
                                                            </button>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
}
