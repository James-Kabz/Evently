// components/Card.tsx
import Image from 'next/image';
import { Event } from '@/types'; // Adjust the path to your Event type definition

interface CardProps {
          event: Event;
          onView: (event: Event) => void;
          onEdit: (event: Event) => void;
          onDelete: (eventId: number) => void;
}

const Card: React.FC<CardProps> = ({ event, onView, onEdit, onDelete }) => {
          return (
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                              {/* Event Image */}
                              <Image
                                        src={event.image}
                                        alt={event.name}
                                        width={600} // Set appropriate width
                                        height={300} // Set appropriate height
                                        className="w-full h-48 object-cover rounded-t-lg mb-4"
                              />

                              {/* Event Name */}
                              <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>

                              {/* Event Description */}
                              <p className="text-gray-700 mb-4">{event.description}</p>

                              {/* Event Time */}
                              <p className="text-gray-600 mb-2">
                                        <span className="font-medium">Time:</span>  {new Date(event.start_time).toLocaleDateString()} -  {new Date(event.end_time).toLocaleDateString()}
                              </p>

                              {/* Event Location */}
                              <p className="text-gray-600 mb-2">
                                        <span className="font-medium">Location:</span> {event.location}
                              </p>

                              {/* Event Organizer */}
                              <p className="text-gray-600">
                                        <span className="font-medium">Organizer:</span> {event.user?.name || 'Unknown'}
                              </p>

                              {/* Event Created At */}
                              <p className="text-gray-500 text-sm mt-4">
                                        Created on: {new Date(event.createdAt).toLocaleDateString()}
                              </p>

                              {/* Action Buttons */}
                              <div className="flex gap-4 mt-4">
                                        <button
                                                  onClick={() => onView(event)}
                                                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                                  View
                                        </button>
                                        <button
                                                  onClick={() => onEdit(event)}
                                                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                                  Edit
                                        </button>
                                        <button
                                                  onClick={() => onDelete(event.id)}
                                                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                                  Delete
                                        </button>
                              </div>
                    </div>
          );
};

export default Card;