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
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                              {/* Event Image */}
                              <div className="relative h-64 w-full">
                                        <Image
                                                  src={event.image}
                                                  alt={event.name}
                                                  layout="fill"
                                                  objectFit="cover"
                                                  className="rounded-t-lg"
                                        />
                              </div>

                              {/* Card Content */}
                              <div className="p-6">
                                        {/* Event Name */}
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{event.name}</h2>

                                        {/* Event Description */}
                                        <p className="text-gray-600 mb-6 text-lg line-clamp-3">
                                                  {truncateDescription(event.description, 30)} {/* Limit to 30 words */}
                                        </p>

                                        {/* Event Metadata */}
                                        <div className="space-y-4 mb-6">
                                                  {/* Event Time */}
                                                  <p className="text-gray-600 text-lg">
                                                            <span className="font-semibold">Time:</span> {new Date(event.start_time).toLocaleString()} -{' '}
                                                            {new Date(event.end_time).toLocaleString()}
                                                  </p>

                                                  {/* Event Location */}
                                                  <p className="text-gray-600 text-lg">
                                                            <span className="font-semibold">Location:</span> {event.location}
                                                  </p>

                                                  {/* Event Organizer */}
                                                  <p className="text-gray-600 text-lg">
                                                            <span className="font-semibold">Organizer:</span> {event.user?.name || 'Unknown'}
                                                  </p>
                                        </div>

                                        {/* Event Status */}
                                        <div className="mb-6">
                                                  <span
                                                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white bg-${event.statusColor}-500`}
                                                  >
                                                            {event.eventStatus}
                                                  </span>
                                        </div>

                                        {/* Event Created At */}
                                        <p className="text-gray-500 text-sm mt-4">
                                                  Created on: {new Date(event.createdAt).toLocaleDateString()}
                                        </p>

                                        {/* Action Buttons */}
                                        <div className="flex gap-4 mt-6">
                                                  <button
                                                            onClick={() => onView(event)}
                                                            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                                                  >
                                                            View
                                                  </button>
                                                  <button
                                                            onClick={() => onEdit(event)}
                                                            className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                                                  >
                                                            Edit
                                                  </button>
                                                  <button
                                                            onClick={() => onDelete(event.id)}
                                                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                                                  >
                                                            Delete
                                                  </button>
                                        </div>
                              </div>
                    </div>
          );
};

export default Card;