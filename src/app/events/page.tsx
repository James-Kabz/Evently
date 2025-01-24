"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface User {
          id: number;
          email: string;
}

interface Event {
          id: number;
          name: string;
          description: string;
          start_time: string;
          end_time: string;
          image: string;
          location: string;
          user_id: number;
          createdAt: string;
          updatedAt: string;
          user: User;
}

export default function EventsPage() {
          const [events, setEvents] = useState<Event[]>([]);
          const [loading, setLoading] = useState<boolean>(true);
          const [error, setError] = useState<string | null>(null);

          useEffect(() => {
                    const fetchEvents = async () => {
                              try {
                                        const response = await fetch('http://localhost:3000/api/events/');
                                        if (!response.ok) {
                                                  throw new Error('Failed to fetch events');
                                        }
                                        const data = await response.json();
                                        setEvents(data);
                              } catch (err) {
                                        setError(err instanceof Error ? err.message : 'An error occurred');
                              } finally {
                                        setLoading(false);
                              }
                    };

                    fetchEvents();
          }, []);

          if (loading) {
                    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
          }

          if (error) {
                    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
          }

          return (
                    <div className="min-h-screen bg-gray-100 py-10">
                              <div className="max-w-4xl mx-auto px-4">
                                        <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
                                        <div className="space-y-6">
                                                  {events.map((event) => (
                                                            <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
                                                                      {/* Event Image */}
                                                                      <Image
                                                                                src={event.image}
                                                                                alt={event.name}
                                                                                className="w-full h-48 object-cover rounded-t-lg mb-4"
                                                                      />

                                                                      {/* Event Name */}
                                                                      <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>

                                                                      {/* Event Description */}
                                                                      <p className="text-gray-700 mb-4">{event.description}</p>

                                                                      {/* Event Time */}
                                                                      <p className="text-gray-600 mb-2">
                                                                                <span className="font-medium">Time:</span> {event.start_time} - {event.end_time}
                                                                      </p>

                                                                      {/* Event Location */}
                                                                      <p className="text-gray-600 mb-2">
                                                                                <span className="font-medium">Location:</span> {event.location}
                                                                      </p>

                                                                      {/* Event Organizer */}
                                                                      <p className="text-gray-600">
                                                                                <span className="font-medium">Organizer:</span> {event.user.email}
                                                                      </p>

                                                                      {/* Event Created At */}
                                                                      <p className="text-gray-500 text-sm mt-4">
                                                                                Created on: {new Date(event.createdAt).toLocaleDateString()}
                                                                      </p>
                                                            </div>
                                                  ))}
                                        </div>
                              </div>
                    </div>
          );
}