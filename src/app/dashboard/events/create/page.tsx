"use client";
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Form from '@/components/Form'; // Adjust the path to your Form component
import api from '../../../../../lib/axios'; // Adjust the path to your API setup
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { showToast } from '@/components/ToastMessage'; // Adjust the path to your toast utility
// import { useUser } from '@/context/UserContext'; // Adjust the path to your UserContext

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
          // const { user } = useUser();
          const [formLoading, setFormLoading] = useState<boolean>(false);

          const onSubmit = async (data: FormData) => {
                    setFormLoading(true);
                    try {
                              // Add the user_id to the form data
                              const eventData = { ...data, };

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
                    {label: 'user_id', type: 'number', required: true},
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
                    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
                              <ToastContainer />
                              <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
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