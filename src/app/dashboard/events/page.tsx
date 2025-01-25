"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '@/components/ToastMessage'; // Adjust the path as needed
import Loading from '../../loading'; // Import the Loading component
import Card from '@/components/Card'; // Import the Card component
import { Event } from '@/types'; // Adjust the path to your Event type definition

export default function EventsPage() {
          const [events, setEvents] = useState<Event[]>([]);
          const [loading, setLoading] = useState<boolean>(true);
          const [error, setError] = useState<string | null>(null);
          const router = useRouter();

          // Fetch events from your API
          useEffect(() => {
                    const fetchEvents = async () => {
                              try {
                                        const response = await fetch('http://localhost:3000/api/events/');
                                        if (!response.ok) {
                                                  throw new Error('Failed to fetch events');
                                        }
                                        const data = await response.json();
                                        setEvents(data.events); // Access the `events` array from the response
                              } catch (err) {
                                        setError(err instanceof Error ? err.message : 'An error occurred');
                                        showToast.error('Failed to fetch events');
                              } finally {
                                        setLoading(false);
                              }
                    };

                    fetchEvents();
          }, []);

          // Handle event deletion
          const handleDelete = async (eventId: number) => {
                    try {
                              await fetch(`http://localhost:3000/api/events/${eventId}`, {
                                        method: 'DELETE',
                              });
                              setEvents(events.filter(event => event.id !== eventId));
                              showToast.success('Event deleted successfully');
                    } catch (err) {
                              console.error('Failed to delete event:', err);
                              showToast.error('Failed to delete event');
                    }
          };

          // Handle event editing
          const handleEdit = (event: Event) => {
                    showToast.info('Redirecting to edit event...');
                    router.push(`/dashboard/events/edit/${event.id}`);
          };

          // Handle event viewing
          const handleView = (event: Event) => {
                    showToast.info('Redirecting to view event...');
                    router.push(`/dashboard/events/${event.id}`);
          };

          if (loading) return <Loading />;

          if (error) {
                    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
          }

          return (
                    <div className="min-h-screen bg-gray-100 py-10">
                              <ToastContainer /> {/* Include ToastContainer for rendering toasts */}
                              <div className="container mx-auto px-4">
                                        <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
                                        <button>

                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                  {events.map((event) => (
                                                            <Card
                                                                      key={event.id}
                                                                      event={event}
                                                                      onView={handleView}
                                                                      onEdit={handleEdit}
                                                                      onDelete={handleDelete}
                                                            />
                                                  ))}
                                        </div>
                              </div>
                    </div>
          );
}