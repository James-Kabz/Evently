"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '../../../../../../lib/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from '@/components/Form';
import { User } from '@/db/models/User';
import { Event } from '@/types';
import { showToast } from '@/components/ToastMessage';
import Loading from "@/app/loading";

interface FormData {
          name: string;
          description: string;
          start_time: string;
          end_time: string;
          image: string;
          location: string;
          user_id: string; // Add user_id to FormData
}

const EditEvent = () => {
          const router = useRouter();
          const { eventId } = useParams(); // Get the `eventId` from the URL
          const [event, setEvent] = useState<Event | null>(null);
          const [users, setUsers] = useState<User[]>([]);
          const [loading, setLoading] = useState<boolean>(true);
          const [end_time, setEventEndTime] = useState<Date | null>(null);
          const [start_time, setEventStartTime] = useState<Date | null>(null);
          const [error, setError] = useState<string | null>(null);
          const [formLoading, setFormLoading] = useState<boolean>(false);

          // Fetch event and users data on mount
          useEffect(() => {
                    if (eventId) {
                              const fetchEvent = async () => {
                                        try {
                                                  const response = await api.get(`/events/${eventId}`);
                                                  const event = response.data.event;
                                                  setEvent(response.data.event); // Correctly access `event` from the response
                                                  setEventStartTime(new Date(event.start_time));
                                                  setEventEndTime(new Date(event.end_time));
                                        } catch (err) {
                                                  console.log(err);
                                                  setError('Failed to fetch event');
                                        } finally {
                                                  setLoading(false);
                                        }
                              };
                              fetchEvent();

                              const fetchUsers = async () => {
                                        try {
                                                  const response = await api.get(`/users`);
                                                  setUsers(response.data.users);
                                        } catch (err) {
                                                  console.log(err);
                                                  setError('Failed to fetch users');
                                        } finally {
                                                  setLoading(false);
                                        }
                              };
                              fetchUsers();
                    }
          }, [eventId]);

          // Handle form submission
          const handleSubmit = async (data: FormData) => {
                    setFormLoading(true);
                    try {
                              await api.put(`/events/${eventId}`, data);
                              showToast.success('Event updated successfully!');

                              // Delay the redirect to allow the toast to display
                              setTimeout(() => {
                                        router.push('/dashboard/events'); // Redirect to the event list
                              }, 2000);
                    } catch (err) {
                              console.log(err);
                              showToast.error('Failed to update event');
                    } finally {
                              setFormLoading(false);
                    }
          };

          if (loading) return <Loading />;
          if (error) return <div className="text-red-500">{error}</div>;

          // Format dates for the date input fields


          const inputs = [
                    {
                              label: "name",
                              type: "text",
                              value: event?.name || '',
                    },
                    {
                              label: "description",
                              type: "text",
                              value: event?.description || '',
                    },
                    {
                              label: "start_time",
                              type: "datetime-local",
                              valueDate: start_time, 
                    },
                    {
                              label: "end_time",
                              type: "datetime-local",
                              valueDate: end_time, // Format the date
                    },
                    {
                              label: "image",
                              type: "text",
                              value: event?.image || '',
                    },
                    {
                              label: "location",
                              type: "text",
                              value: event?.location || '',
                    },
                    {
                              label: "user",
                              type: "select",
                              value: event?.user_id?.toString() || '', // Use user_id as the value
                              options: users.map((user) => ({
                                        label: user.name,
                                        value: user.id.toString(),
                              })),
                    },
          ];

          const extraButtons = [
                    {
                              label: 'Back',
                              type: 'button',
                              onClick: () => router.push('/dashboard/events'),
                    },
          ];

          return (
                    <div className="p-6">
                              <ToastContainer /> {/* Add the ToastContainer to render toast notifications */}
                              <h3 className="text-2xl font-bold mb-4">Edit Event</h3>
                              <Form<FormData>
                                        Input={inputs}
                                        onSubmit={handleSubmit}
                                        loading={formLoading}
                                        addButton={extraButtons}
                              />
                    </div>
          );
};

export default EditEvent;