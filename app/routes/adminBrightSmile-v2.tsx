import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  UserCheck,
  AlertCircle,
  Phone,
  CheckCircle2,
  Search,
  Plus,
  MoreVertical,
  Users,
  CreditCard,
  Settings,
  LayoutDashboard,
  BellRing,
  ArrowUpRight,
  TrendingUp,
  History,
  ShieldAlert,
  Filter,
  ChevronRight,
  Stethoscope,
} from "lucide-react";

// --- Types ---
type AppointmentStatus =
  | "Confirmed"
  | "Pending"
  | "In-Chair"
  | "Requested"
  | "Completed";
type ViewType =
  | "Dashboard"
  | "Appointments"
  | "Patients"
  | "Billing"
  | "Settings"
  | "Recall";

interface Appointment {
  id: number;
  time: string;
  patient: string;
  service: string;
  status: AppointmentStatus;
  type: string;
  doctor: string;
  room: string;
}

interface Patient {
  id: string;
  name: string;
  familyHead?: string;
  lastVisit: string;
  medicalAlert?: string;
  totalLTV: number;
  insurance: string;
}

// --- Mock Data ---
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    time: "09:00 AM",
    patient: "Juan Dela Cruz",
    service: "Cleaning",
    status: "Completed",
    type: "Routine",
    doctor: "Dr. Santos",
    room: "Room A",
  },
  {
    id: 2,
    time: "10:15 AM",
    patient: "Maria Clara",
    service: "Tooth Extraction",
    status: "Confirmed",
    type: "Emergency",
    doctor: "Dr. Garcia",
    room: "Room B",
  },
  {
    id: 3,
    time: "11:30 AM",
    patient: "Cardo Dalisay",
    service: "Check-up",
    status: "In-Chair",
    type: "Routine",
    doctor: "Dr. Santos",
    room: "Room A",
  },
  {
    id: 4,
    time: "01:00 PM",
    patient: "Jenny Lim",
    service: "Braces Adj.",
    status: "Requested",
    type: "Specialist",
    doctor: "Dr. Reyes",
    room: "Room C",
  },
  {
    id: 5,
    time: "02:00 PM",
    patient: "Roberto Gomez",
    service: "Root Canal",
    status: "Confirmed",
    type: "Urgent",
    doctor: "Dr. Garcia",
    room: "Room B",
  },
  {
    id: 6,
    time: "03:15 PM",
    patient: "Liza Soberano",
    service: "Crown Fitting",
    status: "Pending",
    type: "Restorative",
    doctor: "Dr. Santos",
    room: "Room A",
  },
  {
    id: 7,
    time: "04:30 PM",
    patient: "Coco Martin",
    service: "Consultation",
    status: "Requested",
    type: "New Patient",
    doctor: "Dr. Garcia",
    room: "Room B",
  },
  {
    id: 8,
    time: "05:15 PM",
    patient: "Elena Dela Cruz",
    service: "Fluoride Treatment",
    status: "Confirmed",
    type: "Pediatric",
    doctor: "Dr. Santos",
    room: "Room A",
  },
];

const PATIENTS_MOCK: Patient[] = [
  {
    id: "P1",
    name: "Juan Dela Cruz",
    familyHead: "Juan Dela Cruz",
    lastVisit: "2023-11-15",
    totalLTV: 4500,
    insurance: "PhilHealth",
    medicalAlert: "Latex Allergy",
  },
  {
    id: "P2",
    name: "Elena Dela Cruz",
    familyHead: "Juan Dela Cruz",
    lastVisit: "2024-01-10",
    totalLTV: 1200,
    insurance: "PhilHealth",
  },
  {
    id: "P3",
    name: "Maria Clara",
    lastVisit: "2023-05-20",
    totalLTV: 8900,
    insurance: "Maxicare",
    medicalAlert: "Diabetes",
  },
  {
    id: "P4",
    name: "Pedro Penduko",
    lastVisit: "2023-02-14",
    totalLTV: 300,
    insurance: "None",
  },
];

// --- Sub-Components ---

const StatCard = ({
  icon,
  label,
  value,
  color = "border-slate-200",
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
  trend?: string;
}) => (
  <div className={`bg-white p-5 rounded-xl border ${color} shadow-sm`}>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </span>
      </div>
      {trend && (
        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
          <TrendingUp size={10} /> {trend}
        </span>
      )}
    </div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
  </div>
);

const SidebarItem = ({
  icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-semibold transition-all group ${
      active
        ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }`}
  >
    <div className="flex items-center gap-3">
      <span
        className={
          active ? "text-white" : "text-slate-400 group-hover:text-blue-500"
        }
      >
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </div>
    {badge !== undefined && badge > 0 && (
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${active ? "bg-blue-500 text-white" : "bg-orange-100 text-orange-600"}`}
      >
        {badge}
      </span>
    )}
  </button>
);

const TriageCard = ({
  name,
  note,
  time,
  urgent,
}: {
  name: string;
  note: string;
  time: string;
  urgent?: boolean;
}) => (
  <div
    className={`p-4 rounded-2xl border transition-all hover:shadow-md bg-white ${urgent ? "border-orange-200 shadow-sm shadow-orange-50" : "border-slate-100"}`}
  >
    <div className="flex justify-between items-start mb-2">
      <div>
        <div className="text-xs font-bold text-slate-800">{name}</div>
        <div className="text-[10px] text-slate-400">Requested for {time}</div>
      </div>
      {urgent && <span className="bg-orange-500 w-2 h-2 rounded-full" />}
    </div>
    <div
      className={`text-xs p-2 rounded-lg mb-3 ${urgent ? "bg-orange-50 text-orange-700 font-medium italic" : "bg-slate-50 text-slate-500 italic"}`}
    >
      "{note}"
    </div>
    <div className="flex gap-2">
      <button className="flex-1 bg-slate-50 text-slate-600 py-1.5 rounded-lg text-[10px] font-bold hover:bg-slate-100 flex items-center justify-center gap-1 border border-slate-200">
        <Phone size={10} /> Call
      </button>
      <button className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg text-[10px] font-bold hover:bg-blue-700 shadow-sm shadow-blue-100">
        Confirm
      </button>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: AppointmentStatus }) => {
  const styles: Record<AppointmentStatus, string> = {
    Confirmed: "bg-green-100 text-green-700",
    Pending: "bg-orange-100 text-orange-700",
    "In-Chair": "bg-blue-100 text-blue-700",
    Requested: "bg-slate-100 text-slate-600",
    Completed: "bg-slate-200 text-slate-500",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${styles[status]}`}
    >
      {status}
    </span>
  );
};

// --- Main App Component ---

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("Dashboard");
  const [appointmentFilter, setAppointmentFilter] = useState("All");

  const recallPatients = useMemo(() => {
    return PATIENTS_MOCK.filter((p) => {
      const lastDate = new Date(p.lastVisit);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return lastDate < sixMonthsAgo;
    });
  }, []);

  const inChairAppointments = INITIAL_APPOINTMENTS.filter(
    (a) => a.status === "In-Chair",
  );
  const upcomingAppointments = INITIAL_APPOINTMENTS.filter(
    (a) => a.status === "Confirmed",
  ).slice(0, 2);

  const renderContent = () => {
    switch (currentView) {
      case "Dashboard":
        return (
          <div className="animate-in fade-in duration-500 space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard
                icon={<CreditCard className="text-green-500" />}
                label="Today's Revenue"
                value="₱24,500"
                trend="12%"
                color="border-green-100"
              />
              <StatCard
                icon={<Calendar className="text-blue-500" />}
                label="Total Booked"
                value={INITIAL_APPOINTMENTS.length}
                color="border-blue-100"
              />
              <StatCard
                icon={<AlertCircle className="text-orange-500" />}
                label="Medical Alerts"
                value="2"
                color="border-red-100"
              />
              <StatCard
                icon={<CheckCircle2 className="text-purple-500" />}
                label="Completion"
                value="15%"
                color="border-purple-100"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Status Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Stethoscope size={18} className="text-blue-600" />{" "}
                    Currently In-Chair
                  </h3>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded uppercase animate-pulse">
                    Live
                  </span>
                </div>
                <div className="p-6">
                  {inChairAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {inChairAppointments.map((apt) => (
                        <div
                          key={apt.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg shrink-0">
                              {apt.patient.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800">
                                {apt.patient}
                              </h4>
                              <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mt-0.5">
                                <span className="font-medium text-blue-600">
                                  {apt.service}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span>{apt.doctor}</span>
                                <span className="text-slate-300">•</span>
                                <span className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide font-semibold">
                                  {apt.room}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-bold hover:bg-slate-50 hover:text-blue-600 transition-all text-xs">
                              Chart
                            </button>
                            <button className="flex-1 sm:flex-none px-3 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all text-xs shadow-sm shadow-blue-100">
                              Finish
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      No patient currently in session.
                    </div>
                  )}
                </div>
              </div>

              {/* Next Up List */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">Next Up</h3>
                  <button
                    onClick={() => setCurrentView("Appointments")}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    View Schedule
                  </button>
                </div>
                <div className="divide-y divide-slate-50">
                  {upcomingAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center bg-slate-100 rounded-lg p-2 min-w-15">
                          <div className="text-[10px] font-bold text-slate-400 uppercase">
                            Time
                          </div>
                          <div className="text-xs font-bold text-slate-700">
                            {apt.time.split(" ")[0]}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">
                            {apt.patient}
                          </div>
                          <div className="text-xs text-slate-500">
                            {apt.service} • {apt.room}
                          </div>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-white rounded-full text-slate-400">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  ))}
                  <div className="p-8 text-center flex flex-col items-center">
                    <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold text-xs hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
                      <Plus size={14} /> Quick-Book Emergency
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Appointments":
        return (
          <div className="animate-in slide-in-from-bottom-2 duration-500 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  {["All", "Confirmed", "Pending", "In-Chair"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setAppointmentFilter(tab)}
                      className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${appointmentFilter === tab ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="h-6 w-px bg-slate-200" />
                <button className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600">
                  <Filter size={14} /> More Filters
                </button>
              </div>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
                <Plus size={18} /> Book Appointment
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Time / Room</th>
                      <th className="px-6 py-4">Patient Details</th>
                      <th className="px-6 py-4">Procedure</th>
                      <th className="px-6 py-4">Doctor</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Management</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {INITIAL_APPOINTMENTS.filter(
                      (a) =>
                        appointmentFilter === "All" ||
                        a.status === appointmentFilter,
                    ).map((apt) => (
                      <tr
                        key={apt.id}
                        className="hover:bg-slate-50/50 group transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                            <Clock size={14} className="text-blue-500" />{" "}
                            {apt.time}
                          </div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase ml-5 tracking-tighter">
                            {apt.room}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800">
                            {apt.patient}
                          </div>
                          <div className="flex gap-2 mt-1">
                            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded uppercase">
                              {apt.type}
                            </span>
                            {apt.type === "Emergency" && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-red-100 text-red-600 rounded uppercase">
                                Pain
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {apt.service}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-500 italic">
                          {apt.doctor}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={apt.status} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"
                              title="Check-in"
                            >
                              <UserCheck size={16} />
                            </button>
                            <button className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "Patients":
        return (
          <div className="animate-in slide-in-from-bottom-2 duration-400">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-800">
                  Patient Database
                </h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search by name, ID, or family..."
                      className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-3">Patient Name</th>
                      <th className="px-6 py-3">Family Group</th>
                      <th className="px-6 py-3">Medical Alerts</th>
                      <th className="px-6 py-3">Insurance</th>
                      <th className="px-6 py-3 text-right">Total Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PATIENTS_MOCK.map((patient) => (
                      <tr
                        key={patient.id}
                        className="hover:bg-slate-50 cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-800">
                            {patient.name}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Last visit: {patient.lastVisit}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {patient.familyHead ? (
                            <span className="flex items-center gap-1.5 text-xs text-blue-600 font-medium">
                              <Users size={12} />{" "}
                              {patient.familyHead.split(" ")[0]}'s Family
                            </span>
                          ) : (
                            <span className="text-slate-300 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {patient.medicalAlert ? (
                            <span className="px-2 py-0.5 rounded bg-red-50 text-red-600 text-[10px] font-bold flex items-center gap-1 w-fit">
                              <ShieldAlert size={10} /> {patient.medicalAlert}
                            </span>
                          ) : (
                            <span className="text-green-500 text-[10px]">
                              No allergies
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-600">
                          {patient.insurance}
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-slate-700">
                          ₱{patient.totalLTV.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "Recall":
        return (
          <div className="animate-in slide-in-from-right-4 duration-400">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Retention & Recall
              </h2>
              <p className="text-slate-500">
                Patients who haven't visited in over 6 months.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recallPatients.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                        {p.name.charAt(0)}
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">
                          Last Visit
                        </div>
                        <div className="text-sm font-semibold text-slate-600">
                          {p.lastVisit}
                        </div>
                      </div>
                    </div>
                    <h4 className="font-bold text-slate-800">{p.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      High-value patient (LTV: ₱{p.totalLTV})
                    </p>
                  </div>
                  <button className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors">
                    <Phone size={14} /> Call to Book Recall
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <History size={48} className="mb-4 opacity-20" />
            <p>Module coming soon in next version.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
      {/* --- Sidebar Navigation --- */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 hidden lg:flex flex-col justify-between sticky top-0 h-screen">
        <div>
          <div className="flex items-center gap-3 mb-10 text-blue-600 px-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-lg shadow-blue-200">
              <Plus size={20} />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-800">
              SmileSync
            </span>
          </div>

          <nav className="space-y-1">
            <SidebarItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              active={currentView === "Dashboard"}
              onClick={() => setCurrentView("Dashboard")}
            />
            <SidebarItem
              icon={<Calendar size={18} />}
              label="Appointments"
              active={currentView === "Appointments"}
              onClick={() => setCurrentView("Appointments")}
            />
            <SidebarItem
              icon={<Users size={18} />}
              label="Patients"
              active={currentView === "Patients"}
              onClick={() => setCurrentView("Patients")}
            />
            <SidebarItem
              icon={<BellRing size={18} />}
              label="Recall List"
              active={currentView === "Recall"}
              onClick={() => setCurrentView("Recall")}
              badge={recallPatients.length}
            />
            <div className="my-4 border-t border-slate-100" />
            <SidebarItem
              icon={<CreditCard size={18} />}
              label="Billing"
              active={currentView === "Billing"}
              onClick={() => setCurrentView("Billing")}
            />
            <SidebarItem
              icon={<Settings size={18} />}
              label="Settings"
              active={currentView === "Settings"}
              onClick={() => setCurrentView("Settings")}
            />
          </nav>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="text-xs font-bold text-slate-400 uppercase mb-2">
            Staff Logged In
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-300" />
            <div>
              <div className="text-xs font-bold text-slate-700">
                Joy Receptionist
              </div>
              <div className="text-[10px] text-green-600 font-bold">
                Main Counter
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Main View --- */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="font-bold text-slate-800">{currentView}</h1>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all relative">
                <BellRing size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
              </button>
            </div>
            <div className="h-8 w-px bg-slate-200 mx-2" />
            <button className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              Clinic Admin <ArrowUpRight size={14} />
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto flex gap-8">
            {/* Main Content (Left) */}
            <div className="flex-1 min-w-0">{renderContent()}</div>

            {/* Triage Sidebar (Right) - Only visible on Dashboard view for MVP */}
            {currentView === "Dashboard" && (
              <aside className="w-80 hidden xl:block space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div>
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    Web Requests{" "}
                    <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full animate-pulse">
                      3
                    </span>
                  </h3>

                  <div className="space-y-4">
                    <TriageCard
                      name="Jenny Lim"
                      note="Wisdom tooth hurts!"
                      time="2:00 PM"
                      urgent
                    />
                    <TriageCard
                      name="Kevin Tan"
                      note="Regular cleaning request"
                      time="4:30 PM"
                    />
                  </div>
                </div>

                <div className="p-5 bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl text-white shadow-xl shadow-blue-100">
                  <h4 className="font-bold mb-1">Clinic Performance</h4>
                  <p className="text-blue-100 text-xs mb-4">
                    You've reached 85% of your monthly goal.
                  </p>
                  <div className="h-2 bg-blue-900/30 rounded-full mb-2 overflow-hidden">
                    <div className="h-full bg-white w-[85%]" />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-blue-200">
                    <span>₱170k</span>
                    <span>₱200k Goal</span>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
