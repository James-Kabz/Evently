"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import {
          RiDashboard2Fill,
          RiUserLine,
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
                              <div className="flex h-full min-h-screen bg-background text-foreground">
                                        <ToastContainer />

                                        {/* Sidebar for Mobile */}
                                        {sidebarOpen && (
                                                  <div
                                                            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                                                            onClick={() => setSidebarOpen(false)}
                                                  ></div>
                                        )}

                                        {/* Sidebar */}
                                        <div
                                                  className={`fixed top-0 left-0 h-full w-64 bg-secondary text-foreground z-50 transform transition-transform duration-300 lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                                                            }`}
                                        >
                                                  <div className="flex items-center justify-between p-1 bg-secondary w-full overflow-x-hidden white-space-nowrap">
                                                            <div className="flex justify-center items-center">
                                                                      <Image
                                                                                className="w-[100px] h-[75px]"
                                                                                src={istLogo}
                                                                                alt="ist_logo"
                                                                                width={150}
                                                                                height={150}
                                                                      />
                                                            </div>
                                                            <button
                                                                      className="text-foreground focus:outline-none m-3"
                                                                      onClick={() => setSidebarOpen(false)}
                                                            >
                                                                      <FaTimes size={20} />
                                                            </button>
                                                  </div>

                                                  <nav className="p-4">
                                                            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto overflow-scroll">
                                                                      <ul className="space-y-2">
                                                                                {tabs.map((tab) => (
                                                                                          <li key={tab.name}>
                                                                                                    <button
                                                                                                              onClick={() => handleTabChange(tab.name, 'view')}
                                                                                                              className={`flex items-center w-full p-2 rounded hover:bg-primary hover:text-white ${activeTab === tab.name ? 'bg-primary text-white' : 'bg-secondary text-foreground'} transition-colors`}
                                                                                                    >
                                                                                                              <span>{tab.sideIcon}</span>
                                                                                                              <span className="ml-2">{tab.name}</span>
                                                                                                    </button>
                                                                                          </li>
                                                                                ))}
                                                                                {menuItems.map((tab) => (
                                                                                          <li key={tab.name}>
                                                                                                    <button
                                                                                                              onClick={() => handleTabChange(tab.name, 'view')}
                                                                                                              className={`flex items-center w-full p-2 rounded hover:bg-primary hover:text-white ${activeTab === tab.name ? 'bg-primary text-white' : 'bg-secondary text-foreground'} transition-colors`}
                                                                                                    >
                                                                                                              <span>{tab.sideIcon}</span>
                                                                                                              <span className="ml-2">{tab.name}</span>
                                                                                                    </button>
                                                                                          </li>
                                                                                ))}
                                                                                <li>
                                                                                          <button
                                                                                                    onClick={handleLogout}
                                                                                                    className="flex items-center w-full p-2 rounded hover:bg-error hover:text-white transition-colors"
                                                                                          >
                                                                                                    <FaPowerOff size={20} />
                                                                                                    <span className="ml-2">Logout</span>
                                                                                          </button>
                                                                                </li>
                                                                      </ul>
                                                            </div>
                                                  </nav>
                                        </div>

                                        {/* Main Content */}
                                        <div className="flex flex-col flex-1">
                                                  {/* Header */}
                                                  <header className="flex items-center justify-between bg-secondary text-foreground p-4 lg:hidden">
                                                            <div className="mb-1 d flex justify-center items-center">
                                                                      <Image
                                                                                className="w-[100px] h-[75px]"
                                                                                src={istLogo}
                                                                                alt="ist_logo"
                                                                                width={100}
                                                                                height={100}
                                                                      />
                                                            </div>
                                                            <button
                                                                      className="text-foreground focus:outline-none"
                                                                      onClick={() => setSidebarOpen(true)}
                                                            >
                                                                      <FaBars size={24} />
                                                            </button>
                                                  </header>

                                                  {/* Top Navigation for Large Screens */}
                                                  <nav className="hidden lg:flex justify-between bg-secondary text-foreground p-4 shadow-lg">
                                                            <ul className="flex w-full items-center justify-between">
                                                                      {tabs.map((tab) => (
                                                                                <li key={tab.name}>
                                                                                          <div className="relative group inline-block">
                                                                                                    <button
                                                                                                              onClick={() => handleTabChange(tab.name, 'view')}
                                                                                                              className={`p-2 rounded ${activeTab === tab.name ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'} transition-colors`}
                                                                                                    >
                                                                                                              <div className="flex flex-col items-center">
                                                                                                                        <span className='m-1'>{tab.icon}</span>
                                                                                                                        <span className='m-1'>{tab.name}</span>
                                                                                                              </div>
                                                                                                    </button>
                                                                                          </div>
                                                                                </li>
                                                                      ))}
                                                                      <li>
                                                                                <button
                                                                                          onClick={() => setMenuOpen(!menuOpen)}
                                                                                          className="flex flex-col items-center p-2 rounded hover:bg-primary hover:text-white transition-colors"
                                                                                >
                                                                                          <span><PiUserCircleDuotone size={40} /></span>
                                                                                          <span className="ml-2">My Profile</span>
                                                                                </button>
                                                                                {menuOpen && (
                                                                                          <div className="absolute z-10 mt-2 right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 m-4">
                                                                                                    <div
                                                                                                              className="py-1 flex flex-col justify-around"
                                                                                                              role="menu"
                                                                                                              aria-labelledby="options-menu"
                                                                                                    >
                                                                                                              <label
                                                                                                                        className={`flex flex-row items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer`}
                                                                                                              >
                                                                                                                        <div className="flex items-center">
                                                                                                                                  <span className="m-1"><RiUserLine size={20} /></span>
                                                                                                                                  <span className="m-1">Username</span>
                                                                                                                        </div>
                                                                                                              </label>
                                                                                                              {menuItems.map((options) => (
                                                                                                                        <label
                                                                                                                                  onClick={() => { handleTabChange(options.name, 'view'); setMenuOpen(!menuOpen) }}
                                                                                                                                  key={options.name}
                                                                                                                                  className={`flex flex-row items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer`}
                                                                                                                        >
                                                                                                                                  <div className="flex items-center">
                                                                                                                                            <span className="m-1">{options.icon}</span>
                                                                                                                                            <span className="m-1">{options.name}</span>
                                                                                                                                  </div>
                                                                                                                        </label>
                                                                                                              ))}
                                                                                                              <label
                                                                                                                        onClick={() => { handleLogout(); setMenuOpen(!menuOpen) }}
                                                                                                                        className="flex flex-row items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                                                                              >
                                                                                                                        <div className="flex items-center">
                                                                                                                                  <span className="m-1">
                                                                                                                                            <FaPowerOff size={20} />
                                                                                                                                  </span>
                                                                                                                                  <span className="m-1">Logout</span>
                                                                                                                        </div>
                                                                                                              </label>
                                                                                                    </div>
                                                                                          </div>
                                                                                )}
                                                                      </li>
                                                            </ul>
                                                  </nav>

                                                  {/* Sub-tabs for View/Create */}
                                                  {activeTabDetails && (
                                                            <div className="bg-secondary p-4 flex space-x-2">
                                                                      {activeTabDetails.viewLabel && (
                                                                                <button
                                                                                          onClick={() => handleTabChange(activeTab, 'view')}
                                                                                          className={`p-2 rounded ${currentView === 'view' ? 'bg-primary text-white' : 'bg-background hover:bg-primary hover:text-white'} transition-colors`}
                                                                                >
                                                                                          {activeTabDetails.viewLabel}
                                                                                </button>
                                                                      )}
                                                                      {activeTabDetails.createLabel && (
                                                                                <button
                                                                                          onClick={() => handleTabChange(activeTab, 'create')}
                                                                                          className={`p-2 rounded ${currentView === 'create' ? 'bg-primary text-white' : 'bg-background hover:bg-primary hover:text-white'} transition-colors`}
                                                                                >
                                                                                          {activeTabDetails.createLabel}
                                                                                </button>
                                                                      )}
                                                            </div>
                                                  )}

                                                  {/* Main Content */}
                                                  <main className="flex-grow p-2 bg-background text-foreground">
                                                            {currentView === 'view' && (
                                                                      <div>
                                                                                {children}
                                                                      </div>
                                                            )}

                                                            {currentView === 'create' && (
                                                                      <div>
                                                                                <h2 className="text-xl font-bold">{activeTabDetails?.createLabel}</h2>
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