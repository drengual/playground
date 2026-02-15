import React, { useState, useMemo } from "react";
import {
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  Phone,
  Mail,
  Filter,
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Bell,
  LogOut,
  X,
  CalendarDays,
  Stethoscope,
  ChevronLeft,
  MoreVertical,
  MapPin,
  Clock3,
} from "lucide-react";

interface Appointment {
  id: string;
  name: string;
  service: string;
  phone: string;
  email: string;
  time: string;
  date: string;
  status: string;
  notes: string;
}

const App = () => {
  const [activeTab, setActiveTab] = useState("appointments"); // 'appointments', 'schedule', 'settings'
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [viewType, setViewType] = useState("daily"); // For Schedule tab: 'daily' or 'weekly'

  // Mock Data for Appointments
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      name: "Juan Dela Cruz",
      service: "Teeth Cleaning",
      phone: "0917 123 4567",
      email: "juan@example.com",
      time: "10:30 AM",
      date: "Oct 24, 2024",
      status: "pending",
      notes: "First time patient. Complaining of sensitivity.",
    },
    {
      id: "2",
      name: "Maria Santos",
      service: "Braces Consultation",
      phone: "0918 999 8877",
      email: "msantos@email.ph",
      time: "02:00 PM",
      date: "Oct 24, 2024",
      status: "confirmed",
      notes: "Monthly adjustment.",
    },
    {
      id: "3",
      name: "Kevin Lee",
      service: "Extraction",
      phone: "0922 444 5566",
      email: "klee.dev@gmail.com",
      time: "09:15 AM",
      date: "Oct 25, 2024",
      status: "pending",
      notes: "Impacted wisdom tooth.",
    },
    {
      id: "4",
      name: "Anna Reyes",
      service: "General Checkup",
      phone: "0915 000 1122",
      email: "anna.reyes@work.com",
      time: "11:00 AM",
      date: "Oct 24, 2024",
      status: "cancelled",
      notes: "Rescheduled via phone call.",
    },
    {
      id: "5",
      name: "Roberto Gomez",
      service: "Veneers",
      phone: "0919 333 2211",
      email: "rob.g@gmail.com",
      time: "04:30 PM",
      date: "Oct 26, 2024",
      status: "completed",
      notes: "Final fitting.",
    },
  ]);

  // Derived Stats
  const stats = {
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      const matchesSearch = a.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === "all" || a.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterStatus, appointments]);

  const updateStatus = (id: string, newStatus: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)),
    );
    setSelectedAppointment(null);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <CheckCircle2 className="text-white w-5 h-5" />
            </div>
            <span className="font-black tracking-tight text-lg uppercase">
              BrightSmile
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "appointments"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            <Calendar size={18} /> Appointments
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "schedule"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            <LayoutDashboard size={18} /> Schedule View
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === "settings"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">
              FD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">Front Desk</p>
              <p className="text-[10px] text-slate-500">Online</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors text-sm font-bold">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-lg font-black text-slate-800 uppercase tracking-tight">
            {activeTab === "appointments"
              ? "Appointment Manager"
              : activeTab === "schedule"
                ? "Clinic Schedule"
                : "Clinic Settings"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-500">
              <Clock3 size={14} />{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* VIEW AREA */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* COMBINED DASHBOARD & APPOINTMENTS */}
          {activeTab === "appointments" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Quick Stats Banner */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Total
                  </p>
                  <p className="text-2xl font-black">{appointments.length}</p>
                </div>
                <div className="bg-amber-50 p-5 rounded-3xl border border-amber-100 shadow-sm">
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">
                    Pending
                  </p>
                  <p className="text-2xl font-black text-amber-700">
                    {stats.pending}
                  </p>
                </div>
                <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 shadow-sm">
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">
                    Confirmed
                  </p>
                  <p className="text-2xl font-black text-blue-700">
                    {stats.confirmed}
                  </p>
                </div>
                <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-100 shadow-sm">
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">
                    Completed
                  </p>
                  <p className="text-2xl font-black text-emerald-700">
                    {stats.completed}
                  </p>
                </div>
              </div>

              {/* Table Section */}
              <div className="bg-white rounded-4xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                    {[
                      "all",
                      "pending",
                      "confirmed",
                      "completed",
                      "cancelled",
                    ].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                          filterStatus === status
                            ? "bg-slate-900 text-white shadow-lg"
                            : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                  <div className="relative flex-1 max-w-sm">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search patient name..."
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none ring-1 ring-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 transition-all outline-none text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Patient
                        </th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Service
                        </th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Schedule
                        </th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                          Status
                        </th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((req) => (
                          <tr
                            key={req.id}
                            className="hover:bg-slate-50/50 transition-colors group"
                          >
                            <td className="px-6 py-4">
                              <div className="font-bold text-slate-900">
                                {req.name}
                              </div>
                              <div className="text-[11px] text-slate-400">
                                {req.phone}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-xs font-semibold text-slate-600">
                                {req.service}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-slate-700">
                                {req.date}
                              </div>
                              <div className="text-[11px] text-slate-400 uppercase">
                                {req.time}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${
                                  req.status === "confirmed"
                                    ? "bg-blue-100 text-blue-700"
                                    : req.status === "pending"
                                      ? "bg-amber-100 text-amber-700"
                                      : req.status === "completed"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {req.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => setSelectedAppointment(req)}
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                              >
                                <ChevronRight size={18} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-20 text-center">
                            <div className="flex flex-col items-center opacity-20">
                              <Search size={48} className="mb-2" />
                              <p className="font-bold">No appointments found</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SCHEDULE OVERVIEW */}
          {activeTab === "schedule" && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex bg-white p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setViewType("daily")}
                    className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${viewType === "daily" ? "bg-slate-900 text-white" : "text-slate-500"}`}
                  >
                    Daily View
                  </button>
                  <button
                    onClick={() => setViewType("weekly")}
                    className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${viewType === "weekly" ? "bg-slate-900 text-white" : "text-slate-500"}`}
                  >
                    Weekly View
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                  <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
                    <ChevronLeft size={16} />
                  </button>
                  <span>October 24, 2024</span>
                  <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {viewType === "daily" ? (
                <div className="space-y-4">
                  {[
                    "09:00 AM",
                    "10:00 AM",
                    "11:00 AM",
                    "12:00 PM",
                    "01:00 PM",
                    "02:00 PM",
                    "03:00 PM",
                    "04:00 PM",
                  ].map((slotTime) => {
                    const appointment = appointments.find(
                      (a) =>
                        a.time.includes(slotTime.split(":")[0]) &&
                        a.status !== "cancelled",
                    );
                    return (
                      <div key={slotTime} className="flex gap-6 group">
                        <div className="w-20 pt-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {slotTime}
                        </div>
                        <div className="flex-1 min-h-20 border-l-2 border-slate-100 relative pb-4 pl-8 group-last:border-transparent">
                          <div className="absolute -left-1.25 top-2 w-2 h-2 rounded-full bg-slate-200 ring-4 ring-slate-50"></div>
                          {appointment ? (
                            <div
                              className={`p-4 rounded-2xl border ${
                                appointment.status === "confirmed"
                                  ? "bg-blue-50 border-blue-100"
                                  : "bg-white border-slate-200"
                              } shadow-sm max-w-xl transition-all hover:shadow-md cursor-pointer`}
                              onClick={() =>
                                setSelectedAppointment(appointment)
                              }
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-bold text-slate-900">
                                    {appointment.name}
                                  </h4>
                                  <p className="text-xs text-slate-500">
                                    {appointment.service}
                                  </p>
                                </div>
                                <span
                                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                                    appointment.status === "confirmed"
                                      ? "bg-blue-600 text-white"
                                      : "bg-slate-100 text-slate-500"
                                  }`}
                                >
                                  {appointment.status}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full border border-dashed border-slate-200 rounded-2xl flex items-center px-4 text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                              Empty Slot
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-4xl border border-slate-200 overflow-hidden">
                  <div className="grid grid-cols-6 border-b border-slate-100 bg-slate-50/50">
                    {[
                      "Mon 21",
                      "Tue 22",
                      "Wed 23",
                      "Thu 24",
                      "Fri 25",
                      "Sat 26",
                    ].map((day) => (
                      <div
                        key={day}
                        className="p-4 text-center border-r border-slate-100 last:border-none"
                      >
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {day.split(" ")[0]}
                        </p>
                        <p className="text-lg font-black text-slate-900">
                          {day.split(" ")[1]}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-6 divide-x divide-slate-100 min-h-100">
                    {[1, 2, 3, 4, 5, 6].map((col) => (
                      <div key={col} className="p-2 space-y-2">
                        {appointments
                          .filter(
                            (a: Appointment) => String(a.id) === String(col),
                          )
                          .map((a) => (
                            <div
                              key={a.id}
                              className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-700"
                            >
                              {a.time} - {a.name}
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SETTINGS (CLINIC INFO) */}
          {activeTab === "settings" && (
            <div className="max-w-2xl mx-auto animate-in fade-in duration-500 space-y-8">
              <section className="bg-white p-8 rounded-4xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-xl font-black text-slate-900">
                  Clinic Profile
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Clinic Name
                    </label>
                    <input
                      type="text"
                      defaultValue="BrightSmile Dental Clinic"
                      className="w-full p-3 bg-slate-50 border-none ring-1 ring-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Address
                    </label>
                    <input
                      type="text"
                      defaultValue="Ayala Avenue, Makati City"
                      className="w-full p-3 bg-slate-50 border-none ring-1 ring-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Phone
                      </label>
                      <input
                        type="text"
                        defaultValue="0912 345 6789"
                        className="w-full p-3 bg-slate-50 border-none ring-1 ring-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Operating Hours
                      </label>
                      <input
                        type="text"
                        defaultValue="9:00 AM - 6:00 PM"
                        className="w-full p-3 bg-slate-50 border-none ring-1 ring-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-slate-900 transition-all">
                  Save Changes
                </button>
              </section>

              <section className="bg-white p-8 rounded-4xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-black text-slate-900">
                  Notification Settings
                </h2>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                    <p className="text-sm font-bold">Browser Notifications</p>
                    <p className="text-xs text-slate-500">
                      Alert me when a new request arrives
                    </p>
                  </div>
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* DETAILS PANEL (SIDEBAR SLIDE-OVER) */}
        {selectedAppointment && (
          <>
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-all"
              onClick={() => setSelectedAppointment(null)}
            ></div>
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-black text-slate-900 text-lg">
                  Manage Appointment
                </h3>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-4xl bg-slate-900 flex items-center justify-center text-white text-3xl font-black">
                    {selectedAppointment.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 leading-tight">
                      {selectedAppointment.name}
                    </h4>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                        selectedAppointment.status === "confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : selectedAppointment.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {selectedAppointment.status}
                    </span>
                  </div>
                </div>

                {/* Primary Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Date
                    </p>
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                      <Calendar size={14} className="text-blue-600" />{" "}
                      {selectedAppointment.date}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Time Slot
                    </p>
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                      <Clock size={14} className="text-blue-600" />{" "}
                      {selectedAppointment.time}
                    </div>
                  </div>
                </div>

                {/* Contact List */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors cursor-pointer group">
                    <div className="p-2 bg-slate-50 rounded-xl text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                      <Phone size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Phone
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {selectedAppointment.phone}
                      </p>
                    </div>
                    <ChevronRight size={14} className="text-slate-300" />
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors cursor-pointer group">
                    <div className="p-2 bg-slate-50 rounded-xl text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                      <Mail size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Email
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {selectedAppointment.email}
                      </p>
                    </div>
                    <ChevronRight size={14} className="text-slate-300" />
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl">
                    <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                      <Stethoscope size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Service
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {selectedAppointment.service}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                    Patient Notes{" "}
                    <span className="text-blue-600 font-bold hover:underline cursor-pointer">
                      Edit
                    </span>
                  </p>
                  <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 italic">
                    "{selectedAppointment.notes}"
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-8 border-t border-slate-100 bg-slate-50/50 space-y-3">
                {selectedAppointment.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(selectedAppointment.id, "confirmed")
                      }
                      className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98]"
                    >
                      APPROVE & CONFIRM
                    </button>
                    <button
                      onClick={() =>
                        updateStatus(selectedAppointment.id, "cancelled")
                      }
                      className="w-full py-4 bg-white text-red-600 border border-red-100 rounded-2xl font-black text-sm hover:bg-red-50 transition-all active:scale-[0.98]"
                    >
                      REJECT REQUEST
                    </button>
                  </>
                )}
                {selectedAppointment.status === "confirmed" && (
                  <button
                    onClick={() =>
                      updateStatus(selectedAppointment.id, "completed")
                    }
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all active:scale-[0.98]"
                  >
                    MARK AS COMPLETED
                  </button>
                )}
                {(selectedAppointment.status === "completed" ||
                  selectedAppointment.status === "cancelled") && (
                  <button
                    onClick={() =>
                      updateStatus(selectedAppointment.id, "pending")
                    }
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-black transition-all active:scale-[0.98]"
                  >
                    MOVE BACK TO PENDING
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
