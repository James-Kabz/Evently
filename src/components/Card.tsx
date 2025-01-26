// components/Card.tsx
import Image from 'next/image';
import { Event } from '@/types'; // Adjust the path to your Event type definition

interface CardProps {
          event: Event & {
                    eventStatus: string; // Add eventStatus to the event object
                    statusColor: string; // Add statusColor to the event object
          };
          onView: (event: Event) => void;
          onEdit: (event: Event) => void;
          onDelete: (eventId: number) => void;
}

const Card: React.FC<CardProps> = ({ event, onView, onEdit, onDelete }) => {
          // Function to truncate the description to 30 words
          const truncateDescription = (text: string, maxWords: number) => {
                    const words = text.split(' ');
                    if (words.length > maxWords) {
                              return words.slice(0, maxWords).join(' ') + '...'; // Add ellipsis if truncated
                    }
                    return text;
          };

          return (
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow max-w-2xl mx-auto">
                              {/* Event Image */}
                              <Image
                                        src={event.image}
                                        alt={event.name}
                                        width={1024} // Set appropriate width for 5xl size
                                        height={400} // Set appropriate height for 5xl size
                                        className="w-full h-64 object-cover rounded-t-lg mb-4"
                              />

                              {/* Event Name */}
                              <h2 className="text-3xl font-semibold mb-4">{event.name}</h2>

                              {/* Event Description */}
                              <p className="text-gray-700 mb-6 text-lg">
                                        {truncateDescription(event.description, 30)} {/* Limit to 30 words */}
                              </p>

                              {/* Event Time */}
                              <p className="text-gray-600 mb-4 text-lg">
                                        <span className="font-medium">Time:</span> {new Date(event.start_time).toLocaleString()} -{' '}
                                        {new Date(event.end_time).toLocaleString()}
                              </p>

                              {/* Event Location */}
                              <p className="text-gray-600 mb-4 text-lg">
                                        <span className="font-medium">Location:</span> {event.location}
                              </p>

                              {/* Event Organizer */}
                              <p className="text-gray-600 mb-4 text-lg">
                                        <span className="font-medium">Organizer:</span> {event.user?.name || 'Unknown'}
                              </p>

                              {/* Event Status */}
                              <div className="flex items-center mb-6">
                                        <span
                                                  className={`inline-block px-3 py-2 rounded-lg text-lg font-semibold text-white bg-${event.statusColor}-500`}
                                        >
                                                  {event.eventStatus}
                                        </span>
                              </div>

                              {/* Event Created At */}
                              <p className="text-gray-500 text-lg mt-6">
                                        Created on: {new Date(event.createdAt).toLocaleDateString()}
                              </p>

                              {/* Action Buttons */}
                              <div className="flex gap-6 mt-6">
                                        <button
                                                  onClick={() => onView(event)}
                                                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
                                        >
                                                  View
                                        </button>
                                        <button
                                                  onClick={() => onEdit(event)}
                                                  className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-lg"
                                        >
                                                  Edit
                                        </button>
                                        <button
                                                  onClick={() => onDelete(event.id)}
                                                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg"
                                        >
                                                  Delete
                                        </button>
                              </div>
                    </div>
          );
};

export default Card;