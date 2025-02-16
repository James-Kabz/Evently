"use client";

import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Form from '@/components/Form'; // Adjust the path to your Form component
import api from '../../../../../lib/axios'; // Adjust the path to your API setup
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { showToast } from '@/components/ToastMessage'; // Adjust the path to your toast utility
import { User } from '@/db/models/User';

interface FormData {
          name: string;
          description: string;
          start_time: string;
          end_time: string;
          image: string;
          location: string;
          user_id: number;
}

interface TicketTypeFormData {
          name: string;
          price: number;
          complimentary: boolean;
          active: boolean;
          user_id: number;
          event_id: number;
}

const CreateEventPage: React.FC = () => {
          const router = useRouter();
          const [formLoading, setFormLoading] = useState<boolean>(false);
          const [users, setUsers] = useState<User[]>([]);
          const [step, setStep] = useState<number>(1);
          const [eventId, setEventId] = useState<number | null>(null);

          // Fetch users from the API
          useEffect(() => {
                    const fetchUsers = async () => {
                              try {
                                        const response = await api.get('/users'); // Adjust the endpoint to match your API
                                        if (response?.data?.users) {
                                                  setUsers(response.data.users);
                                        } else {
                                                  throw new Error('Invalid response format');
                                        }
                              } catch (error) {
                                        console.error('Failed to fetch users:', error);
                                        showToast.error('Failed to fetch users');
                              }
                    };

                    fetchUsers();
          }, []);

          const onSubmitEvent = async (data: FormData) => {
                    setFormLoading(true);
                    try {
                              const eventData = { ...data };

                              // Submit the event data to the API
                              const response = await api.post('/events', eventData);
                              setEventId(response.data.id); // Assuming the API returns the created event ID
                              showToast.success('Event created successfully!');
                              setStep(2); // Move to the next step
                    } catch (error) {
                              console.error('Failed to create event', error);
                              showToast.error('Failed to create event');
                    } finally {
                              setFormLoading(false);
                    }
          };

          const onSubmitTicketType = async (data: TicketTypeFormData) => {
                    setFormLoading(true);
                    try {
                              const ticketTypeData = { ...data, event_id: eventId };

                              // Submit the ticket type data to the API
                              await api.post('/ticketTypes', ticketTypeData);
                              showToast.success('Ticket type created successfully!');

                              // Redirect to the events page after a short delay
                              setTimeout(() => {
                                        router.push('/dashboard/events');
                              }, 2000);
                    } catch (error) {
                              console.error('Failed to create ticket type', error);
                              showToast.error('Failed to create ticket type');
                    } finally {
                              setFormLoading(false);
                    }
          };

          // Define the form inputs for the event creation step
          const eventInputs = [
                    { label: 'name', type: 'text', required: true },
                    { label: 'description', type: 'text', required: true },
                    { label: 'start_time', type: 'datetime-local', required: true },
                    { label: 'end_time', type: 'datetime-local', required: true },
                    { label: 'image', type: 'text', required: true },
                    { label: 'location', type: 'text', required: true },
                    {
                              label: 'user_id',
                              type: 'select', // Change to 'select' for dropdown
                              options: users.map((user) => ({
                                        label: `${user.name}`,
                                        value: user.id,
                              })),
                    },
          ];

          // Define the form inputs for the ticket type creation step
          const ticketTypeInputs = [
                    { label: 'name', type: 'text', required: true },
                    { label: 'price', type: 'number', required: true },
                    { label: 'complimentary', type: 'checkbox', required: false },
                    { label: 'active', type: 'checkbox', required: false },
          ];

          // Define extra buttons (e.g., "Back" button)
          const extraButtons = [
                    {
                              label: 'Back',
                              type: 'button',
                              onClick: () => (step === 1 ? router.push('/dashboard/events') : setStep(1)),
                    },
          ];

          return (
                    <div className="w-full max-w-md mx-auto bg-white p-4 sm:p-6 rounded-lg shadow">
                              <ToastContainer position="top-right" autoClose={3000} />
                              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
                                        {step === 1 ? 'Create New Event' : 'Add Ticket Type'}
                              </h2>
                              {step === 1 ? (
                                        <Form<FormData>
                                                  Input={eventInputs}
                                                  onSubmit={onSubmitEvent}
                                                  loading={formLoading}
                                                  addButton={extraButtons}
                                        />
                              ) : (
                                        <Form<TicketTypeFormData>
                                                  Input={ticketTypeInputs}
                                                  onSubmit={onSubmitTicketType}
                                                  loading={formLoading}
                                                  addButton={extraButtons}
                                        />
                              )}
                    </div>
          );
};

export default CreateEventPage;