"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import {
          RiDashboard2Fill,
} from "react-icons/ri";
import {
          FaUsers,
          FaGraduationCap,
          FaWpforms,
          FaPowerOff,
          FaBars,
          FaTimes,
} from "react-icons/fa";
import { PiBellSimpleDuotone, PiUserCircleDuotone, PiUserCircleGearDuotone } from "react-icons/pi";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading';
import istLogo from '../../../public/assets/image/tickfy.jpg';
import Image from 'next/image';
import { showToast } from '@/components/ToastMessage';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

type EventsTicketsDashboardLayoutProps = {
          children: React.ReactNode;
};

const EventsTicketsDashboardLayout: React.FC<EventsTicketsDashboardLayoutProps> = ({ children }) => {
          const path = usePathname();
          const router = useRouter();
          const [activeTab, setActiveTab] = useState<string>('');
          const [currentView, setCurrentView] = useState<string>('');
          const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
          const [menuOpen, setMenuOpen] = useState<boolean>(false);
          const [currentPath, setCurrentPath] = useState<string>('');

          const handleLogout = async () => {
                    try {
                              localStorage.clear();
                              const callbackUrl =
                                        process.env.NODE_ENV === 'production'
                                                  ? 'https://feedback.isteducation.com/login'
                                                  : 'http://localhost:3000/login';
                              signOut({ callbackUrl });
                    } catch (error) {
                              console.log(error);
                              showToast.error('Failed to logout');
                    }
          };

          useEffect(() => {
                    const savedTab = localStorage.getItem("activeTab");
                    const savedView = localStorage.getItem("currentView");
                    const savedPath = localStorage.getItem("currentPath");

                    if (savedTab && savedView && savedPath) {
                              setActiveTab(savedTab);
                              setCurrentView(savedView);
                              router.push(savedPath);
                    } else {
                              const defaultTab = "Dashboard";
                              const defaultView = "view";
                              const defaultPath = "/dashboard";

                              setActiveTab(defaultTab);
                              setCurrentView(defaultView);

                              localStorage.setItem("activeTab", defaultTab);
                              localStorage.setItem("currentView", defaultView);
                              localStorage.setItem("currentPath", defaultPath);
                    }
          }, [router]);

          useEffect(() => {
                    setCurrentPath(path);
                    if (activeTab && currentView && currentPath) {
                              localStorage.setItem("activeTab", activeTab);
                              localStorage.setItem("currentView", currentView);
                              localStorage.setItem("currentPath", currentPath);
                    }
          }, [activeTab, currentView, currentPath, path]);

          const tabs = [
                    {
                              name: 'Dashboard',
                              viewLabel: 'Dashboard',
                              icon: <RiDashboard2Fill size={'40px'} />,
                              sideIcon: <RiDashboard2Fill size={'30px'} />,
                              viewLink: '/dashboard',
                    },
                    {
                              name: 'Events',
                              viewLabel: 'View Events',
                              createLabel: 'Create Event',
                              viewLink: '/dashboard/events',
                              icon: <FaUsers size={'40px'} />,
                              sideIcon: <FaUsers size={'30px'} />,
                              createLink: '/dashboard/events/create',
                    },
                    {
                              name: 'Ticket Types',
                              viewLabel: 'View Ticket Types',
                              createLabel: 'Create Ticket Type',
                              viewLink: '/dashboard/ticket-types',
                              icon: <FaGraduationCap size={'40px'} />,
                              sideIcon: <FaGraduationCap size={'30px'} />,
                              createLink: '/dashboard/ticket-types/create',
                    },
                    {
                              name: 'Tickets',
                              viewLabel: 'View Tickets',
                              createLabel: 'Create Ticket',
                              viewLink: '/dashboard/tickets',
                              icon: <FaWpforms size={'40px'} />,
                              sideIcon: <FaWpforms size={'30px'} />,
                              createLink: '/dashboard/tickets/create',
                    },
                    {
                              name: 'My Profile',
                              viewLabel: 'Manage Profile',
                              viewLink: `/dashboard/user-profile`,
                              icon: <PiUserCircleGearDuotone size={'20px'} />,
                              sideIcon: <PiUserCircleGearDuotone size={'30px'} />,
                    },
                    {
                              name: 'Notification',
                              viewLabel: 'Notification',
                              viewLink: `/dashboard/notifications`,
                              icon: <PiBellSimpleDuotone size={'20px'} />,
                              sideIcon: <PiBellSimpleDuotone size={'30px'} />,
                    },
          ];

          const menuItems = [
                    {
                              name: 'My Profile',
                              viewLabel: 'Manage Profile',
                              viewLink: `/dashboard/user-profile`,
                              icon: <PiUserCircleGearDuotone size={'20px'} />,
                              sideIcon: <PiUserCircleGearDuotone size={'30px'} />,
                    },
                    {
                              name: 'Notification',
                              viewLabel: 'Notification',
                              viewLink: `/dashboard/notifications`,
                              icon: <PiBellSimpleDuotone size={'20px'} />,
                              sideIcon: <PiBellSimpleDuotone size={'30px'} />,
                    },
          ];

          const activeTabDetails = tabs.find((tab) => tab.name === activeTab);

          const handleTabChange = (tabName: string, view: string) => {
                    const tab = tabs.find((t) => t.name === tabName);
                    if (tab) {
                              setActiveTab(tab.name);
                              setCurrentView(view);
                              const newPath: string | undefined = view === 'view' ? tab.viewLink : tab.createLink;
                              if (newPath) {
                                        router.push(newPath);
                                        setSidebarOpen(false);
                              }
                    }
          };

          return (
                    <Suspense fallback={<Loading />}>
                              <div className="flex h-full min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
                                        <ToastContainer />

                                        {/* Sidebar Overlay */}
                                        {sidebarOpen && (
                                                  <div
                                                            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                                                            onClick={() => setSidebarOpen(false)}
                                                  ></div>
                                        )}

                                        {/* Sidebar */}
                                        <div
                                                  className={`fixed top-0 left-0 h-full w-72 bg-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                                        >
                                                  <div className="flex items-center justify-between p-4 bg-gray-900 shadow-lg">
                                                            <Image
                                                                      className="w-[120px] h-[90px]"
                                                                      src={istLogo}
                                                                      alt="ist_logo"
                                                                      width={150}
                                                                      height={150}
                                                            />
                                                            <button className="text-white focus:outline-none" onClick={() => setSidebarOpen(false)}>
                                                                      <FaTimes size={24} />
                                                            </button>
                                                  </div>
                                                  <nav className="p-6 space-y-4 overflow-y-auto">
                                                            <ul className="space-y-3">
                                                                      {tabs.map((tab) => (
                                                                                <li key={tab.name}>
                                                                                          <button
                                                                                                    onClick={() => handleTabChange(tab.name, 'view')}
                                                                                                    className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ease-in-out ${activeTab === tab.name ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-blue-600 hover:text-white'}`}
                                                                                          >
                                                                                                    <span className="mr-3">{tab.sideIcon}</span>
                                                                                                    <span>{tab.name}</span>
                                                                                          </button>
                                                                                </li>
                                                                      ))}
                                                                      {menuItems.map((menu) => (
                                                                                <li key={menu.name}>
                                                                                          <button
                                                                                                    onClick={() => handleTabChange(menu.name, 'view')}
                                                                                                    className="flex items-center w-full p-3 rounded-lg bg-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out"
                                                                                          >
                                                                                                    <span className="mr-3">{menu.sideIcon}</span>
                                                                                                    <span>{menu.name}</span>
                                                                                          </button>
                                                                                </li>
                                                                      ))}
                                                                      <li>
                                                                                <button
                                                                                          onClick={handleLogout}
                                                                                          className="flex items-center w-full p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out"
                                                                                >
                                                                                          <FaPowerOff size={20} className="mr-3" />
                                                                                          <span>Logout</span>
                                                                                </button>
                                                                      </li>
                                                            </ul>
                                                  </nav>
                                        </div>

                                        {/* Main Content */}
                                        <div className="flex flex-col flex-1">
                                                  {/* Header */}
                                                  <header className="flex items-center justify-between bg-gray-900 text-white p-5 shadow-md lg:hidden">
                                                            <Image className="w-[120px] h-[90px]" src={istLogo} alt="ist_logo" width={120} height={90} />
                                                            <button className="text-white focus:outline-none" onClick={() => setSidebarOpen(true)}>
                                                                      <FaBars size={28} />
                                                            </button>
                                                  </header>

                                                  {/* Navigation */}
                                                  <nav className="hidden lg:flex justify-between bg-gray-900 text-white p-5 shadow-md">
                                                            <ul className="flex w-full items-center justify-between">
                                                                      {tabs.map((tab) => (
                                                                                <li key={tab.name}>
                                                                                          <button
                                                                                                    onClick={() => handleTabChange(tab.name, 'view')}
                                                                                                    className={`p-3 rounded-lg text-lg transition-all duration-300 ease-in-out ${activeTab === tab.name ? 'bg-blue-500' : 'hover:bg-blue-600'}`}
                                                                                          >
                                                                                                    {tab.icon}
                                                                                                    <span className="ml-2">{tab.name}</span>
                                                                                          </button>
                                                                                </li>
                                                                      ))}
                                                                      <li>
                                                                                <button
                                                                                          onClick={() => setMenuOpen(!menuOpen)}
                                                                                          className="flex flex-col items-center p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out"
                                                                                >
                                                                                          <PiUserCircleDuotone size={40} />
                                                                                          <span>My Profile</span>
                                                                                </button>
                                                                      </li>
                                                            </ul>
                                                  </nav>

                                                  {/* Sub-tabs */}
                                                  {activeTabDetails && (
                                                            <div className="bg-gray-800 p-5 flex space-x-4 shadow-md">
                                                                      {activeTabDetails.viewLabel && (
                                                                                <button
                                                                                          onClick={() => handleTabChange(activeTab, 'view')}
                                                                                          className={`p-3 rounded-lg transition-all duration-300 ease-in-out ${currentView === 'view' ? 'bg-blue-500 text-white' : 'hover:bg-blue-600'}`}
                                                                                >
                                                                                          {activeTabDetails.viewLabel}
                                                                                </button>
                                                                      )}
                                                                      {activeTabDetails.createLabel && (
                                                                                <button
                                                                                          onClick={() => handleTabChange(activeTab, 'create')}
                                                                                          className={`p-3 rounded-lg transition-all duration-300 ease-in-out ${currentView === 'create' ? 'bg-blue-500 text-white' : 'hover:bg-blue-600'}`}
                                                                                >
                                                                                          {activeTabDetails.createLabel}
                                                                                </button>
                                                                      )}
                                                            </div>
                                                  )}

                                                  {/* Main Content */}
                                                  <main className="flex-grow p-6 bg-gray-900 text-white">
                                                            {currentView === 'view' && <div>{children}</div>}
                                                            {currentView === 'create' && (
                                                                      <div>
                                                                                <h2 className="text-2xl font-bold mb-4">{activeTabDetails?.createLabel}</h2>
                                                                                {children}
                                                                      </div>
                                                            )}
                                                  </main>
                                        </div>
                              </div>
                    </Suspense>

          );
};

export default EventsTicketsDashboardLayout;