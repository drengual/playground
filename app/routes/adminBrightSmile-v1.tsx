import React, { useState } from "react";
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
} from "lucide-react";

// Define types for the appointment data
type AppointmentStatus = "Confirmed" | "Pending" | "In-Chair" | "Requested";

interface Appointment {
  id: number;
  time: string;
  patient: string;
  service: string;
  status: AppointmentStatus;
  type: string;
}

const DentalDashboard = () => {
  const [activeTab, setActiveTab] = useState("Today");

  // Mock data for the "Live Schedule"
  const appointments: Appointment[] = [
    {
      id: 1,
      time: "09:00 AM",
      patient: "Juan Dela Cruz",
      service: "Cleaning",
      status: "Confirmed",
      type: "Routine",
    },
    {
      id: 2,
      time: "10:15 AM",
      patient: "Maria Clara",
      service: "Tooth Extraction",
      status: "Pending",
      type: "Emergency",
    },
    {
      id: 3,
      time: "11:30 AM",
      patient: "Cardo Dalisay",
      service: "Check-up",
      status: "In-Chair",
      type: "Routine",
    },
    {
      id: 4,
      time: "01:00 PM",
      patient: "Jenny Lim",
      service: "Braces Adj.",
      status: "Requested",
      type: "Specialist",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 hidden lg:block">
        <div className="flex items-center gap-2 mb-10 text-blue-600">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <Plus size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">
            SmileSync
          </span>
        </div>

        <nav className="space-y-1">
          {["Dashboard", "Appointments", "Patients", "Billing", "Settings"].map(
            (item) => (
              <button
                key={item}
                className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-colors ${item === "Dashboard" ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"}`}
              >
                {item}
              </button>
            ),
          )}
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Calendar className="text-blue-500" />}
            label="Today's Total"
            value="12"
          />
          <StatCard
            icon={<AlertCircle className="text-orange-500" />}
            label="Pending Action"
            value="5"
            color="border-orange-200"
          />
          <StatCard
            icon={<CheckCircle2 className="text-green-500" />}
            label="Confirmed"
            value="7"
          />
          <StatCard
            icon={<UserCheck className="text-purple-500" />}
            label="Checked In"
            value="2"
          />
        </div>

        {/* Live Schedule Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Daily Schedule</h2>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search patients..."
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
              />
            </div>
          </div>

          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Time / Slot</th>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Procedure</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.map((apt) => (
                <tr
                  key={apt.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-700 flex items-center gap-2">
                    <Clock size={14} className="text-slate-400" /> {apt.time}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">
                      {apt.patient}
                    </div>
                    <div className="text-xs text-slate-400">{apt.type}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{apt.service}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={apt.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* 3. THE TRIAGE SIDEBAR (The Staff's To-Do) */}
      <aside className="w-80 bg-white border-l border-slate-200 p-6 hidden xl:block">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          New Web Requests{" "}
          <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            3
          </span>
        </h3>

        <div className="space-y-4">
          {[1, 2].map((req) => (
            <div
              key={req}
              className="p-4 bg-orange-50 border border-orange-100 rounded-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-400" />
              <div className="text-sm font-bold text-slate-800 mb-1">
                Jenny Lim
              </div>
              <div className="text-xs text-slate-500 mb-3 italic underline">
                "My wisdom tooth hurts!"
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-white border border-orange-200 text-orange-600 py-2 rounded-lg text-xs font-bold hover:bg-orange-100 flex items-center justify-center gap-1">
                  <Phone size={12} /> Call
                </button>
                <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-xs font-bold hover:bg-orange-600">
                  Confirm
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

// Helper Components
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

const StatCard = ({
  icon,
  label,
  value,
  color = "border-slate-200",
}: StatCardProps) => (
  <div className={`bg-white p-5 rounded-xl border ${color} shadow-sm`}>
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
        {label}
      </span>
    </div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
  </div>
);

interface StatusBadgeProps {
  status: AppointmentStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles: Record<AppointmentStatus, string> = {
    Confirmed: "bg-green-100 text-green-700",
    Pending: "bg-orange-100 text-orange-700",
    "In-Chair": "bg-blue-100 text-blue-700",
    Requested: "bg-slate-100 text-slate-600",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default DentalDashboard;
