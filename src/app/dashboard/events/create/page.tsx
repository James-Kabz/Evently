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

const CreateEventPage: React.FC = () => {
          const router = useRouter();
          const [formLoading, setFormLoading] = useState<boolean>(false);
          const [users, setUsers] = useState<User[]>([]);

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

          const onSubmit = async (data: FormData) => {
                    setFormLoading(true);
                    try {
                              const eventData = { ...data };

                              // Submit the event data to the API
                              await api.post('/events', eventData);
                              showToast.success('Event created successfully!');

                              // Redirect to the events page after a short delay
                              setTimeout(() => {
                                        router.push('/dashboard/events');
                              }, 2000);
                    } catch (error) {
                              console.error('Failed to create event', error);
                              showToast.error('Failed to create event');
                    } finally {
                              setFormLoading(false);
                    }
          };

          // Define the form inputs
          const inputs = [
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
                              }))
                    },
          ];

          // Define extra buttons (e.g., "Back" button)
          const extraButtons = [
                    {
                              label: 'Back',
                              type: 'button',
                              onClick: () => router.push('/dashboard/events'),
                    },
          ];

          return (
                    <div className="w-full max-w-md mx-auto bg-white p-4 sm:p-6 rounded-lg shadow">
                              <ToastContainer position="top-right" autoClose={3000} />
                              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
                                        Create New Event
                              </h2>
                              <Form<FormData>
                                        Input={inputs}
                                        onSubmit={onSubmit}
                                        loading={formLoading}
                                        addButton={extraButtons}
                              />
                    </div>
          );
};

export default CreateEventPage;
