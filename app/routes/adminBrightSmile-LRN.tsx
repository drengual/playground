import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  Users,
  Settings,
  Bell,
  Search,
  Plus,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  LogOut,
  ArrowRight,
  X,
} from "lucide-react";

// --- SHARED UI COMPONENTS ---

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}
  >
    {children}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  className?: string;
  children: ReactNode;
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const variants: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline: "border border-slate-200 text-slate-600 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
  };
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all active:scale-95 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...props }: InputProps) => (
  <div className="space-y-1.5">
    {label && (
      <label className="text-sm font-medium text-slate-700">{label}</label>
    )}
    <input
      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
      {...props}
    />
  </div>
);

// --- AUTHENTICATION PAGES ---

interface LoginPageProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

const LoginPage = ({ onLogin, onSwitchToRegister }: LoginPageProps) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="text-white w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
        <p className="text-slate-500">Sign in to manage your clinic</p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }}
      >
        <Input
          label="Email Address"
          type="email"
          placeholder="admin@clinic.com"
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          required
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Remember me
          </label>
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Forgot password?
          </a>
        </div>
        <Button className="w-full py-3">
          Sign In <ArrowRight size={18} />
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-slate-600 text-sm">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-blue-600 font-bold hover:underline"
          >
            Register Clinic
          </button>
        </p>
      </div>
    </Card>
  </div>
);

interface RegisterPageProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

const RegisterPage = ({ onRegister, onSwitchToLogin }: RegisterPageProps) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    <Card className="w-full max-w-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Create Clinic Account
        </h1>
        <p className="text-slate-500">
          Start managing your practice effectively
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onRegister();
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" placeholder="John" required />
          <Input label="Last Name" placeholder="Doe" required />
        </div>
        <Input label="Clinic Name" placeholder="City Health Center" required />
        <Input
          label="Email Address"
          type="email"
          placeholder="contact@clinic.com"
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          required
        />

        <p className="text-xs text-slate-500">
          By registering, you agree to our Terms of Service and Privacy Policy.
        </p>

        <Button className="w-full py-3">
          Create Account <ArrowRight size={18} />
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-slate-600 text-sm">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 font-bold hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </Card>
  </div>
);

// --- MAIN APPLICATION ---

export default function App() {
  const [view, setView] = useState("login"); // login, register, dashboard
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Appointment",
      message: "Sarah Smith booked for tomorrow at 10 AM",
      time: "2 mins ago",
      type: "info",
      read: false,
    },
    {
      id: 2,
      title: "Urgent: Staff Change",
      message: "Dr. Miller is on leave today",
      time: "1 hour ago",
      type: "warning",
      read: false,
    },
    {
      id: 3,
      title: "System Update",
      message: "The database was backed up successfully",
      time: "5 hours ago",
      type: "success",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  // Auth Handlers
  const handleLogin = () => setView("dashboard");
  const handleRegister = () => setView("dashboard");
  const handleLogout = () => setView("login");

  if (view === "login")
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToRegister={() => setView("register")}
      />
    );
  if (view === "register")
    return (
      <RegisterPage
        onRegister={handleRegister}
        onSwitchToLogin={() => setView("login")}
      />
    );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <CheckCircle2 className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">MedFlow</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active
          />
          <NavItem icon={<CalendarIcon size={20} />} label="Schedule" />
          <NavItem icon={<Users size={20} />} label="Patients" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-4 p-2">
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="avatar"
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">Dr. Alex Rivers</p>
              <p className="text-xs text-slate-500 truncate">Administrator</p>
            </div>
          </div>
          <Button
            variant="danger"
            className="w-full justify-start px-3"
            onClick={handleLogout}
          >
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10">
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-1.5 w-96">
            <Search className="text-slate-400 w-4 h-4 mr-2" />
            <input
              placeholder="Search patients, doctors, records..."
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                className="p-2 hover:bg-slate-100 rounded-full transition-colors relative"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell size={20} className="text-slate-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="font-bold text-sm">Notifications</h3>
                    <button
                      onClick={markAllRead}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-100 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-3 relative group ${!notif.read ? "bg-blue-50/30" : ""}`}
                        >
                          <div
                            className={`mt-1 p-1.5 rounded-full ${notif.type === "warning" ? "bg-amber-100 text-amber-600" : notif.type === "success" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"}`}
                          >
                            {notif.type === "warning" ? (
                              <AlertCircle size={14} />
                            ) : notif.type === "success" ? (
                              <CheckCircle2 size={14} />
                            ) : (
                              <Clock size={14} />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-900">
                              {notif.title}
                            </p>
                            <p className="text-xs text-slate-500 leading-relaxed mb-1">
                              {notif.message}
                            </p>
                            <span className="text-[10px] text-slate-400">
                              {notif.time}
                            </span>
                          </div>
                          <button
                            onClick={() => removeNotification(notif.id)}
                            className="text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-400">
                        <Bell size={32} className="mx-auto mb-2 opacity-20" />
                        <p className="text-sm">No new notifications</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Button>
              <Plus size={18} /> New Appointment
            </Button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-8 overflow-y-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              Dashboard Overview
            </h1>
            <p className="text-slate-500">
              Welcome back, Dr. Rivers. Here's what's happening today.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              label="Today's Appointments"
              value="24"
              change="+12%"
              icon={<CalendarIcon className="text-blue-600" size={24} />}
            />
            <StatCard
              label="Pending Forms"
              value="8"
              change="-2"
              icon={<Clock className="text-amber-600" size={24} />}
              color="amber"
            />
            <StatCard
              label="New Patients"
              value="142"
              change="+18%"
              icon={<Users className="text-emerald-600" size={24} />}
              color="emerald"
            />
            <StatCard
              label="Urgent Alerts"
              value="3"
              change="Immediate"
              icon={<AlertCircle className="text-red-600" size={24} />}
              color="red"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Schedule Table */}
            <Card className="lg:col-span-2">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-bold text-lg">Upcoming Appointments</h2>
                <Button variant="outline" className="text-sm py-1">
                  View Schedule
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Patient</th>
                      <th className="px-6 py-4">Time</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Staff</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <PatientRow
                      name="Sarah Smith"
                      time="09:00 AM"
                      status="Confirmed"
                      staff="Dr. Miller"
                    />
                    <PatientRow
                      name="Robert Fox"
                      time="10:30 AM"
                      status="In Progress"
                      staff="Dr. Rivers"
                    />
                    <PatientRow
                      name="Elena Gilbert"
                      time="11:45 AM"
                      status="Pending"
                      staff="Dr. Miller"
                    />
                    <PatientRow
                      name="Michael Chen"
                      time="02:00 PM"
                      status="Confirmed"
                      staff="Dr. Rivers"
                    />
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Side Analytics */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold mb-4">Clinic Utilization</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-medium text-slate-600">
                      Bed Occupancy
                    </span>
                    <span className="text-lg font-bold">82%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[82%]" />
                  </div>

                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-medium text-slate-600">
                      Daily Goal
                    </span>
                    <span className="text-lg font-bold">18/25</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[72%]" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-blue-600 text-white border-none">
                <h3 className="font-bold mb-2">MedFlow Pro Tips</h3>
                <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                  You can now automate SMS reminders for all pending
                  appointments in the settings tab.
                </p>
                <Button
                  variant="secondary"
                  className="w-full text-blue-600 border-none"
                >
                  Configure Alerts
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
        active
          ? "bg-blue-50 text-blue-600 shadow-sm border border-blue-100"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({
  label,
  value,
  change,
  icon,
  color = "blue",
}: {
  label: string;
  value: string;
  change?: string;
  icon: ReactNode;
  color?: string;
}) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 border-blue-100 text-blue-600",
    amber: "bg-amber-50 border-amber-100 text-amber-600",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
    red: "bg-red-50 border-red-100 text-red-600",
  };

  return (
    <Card className="p-5 hover:border-blue-300 transition-colors cursor-default">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colors[color]}`}>{icon}</div>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full ${change?.startsWith("+") ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
        >
          {change}
        </span>
      </div>
      <div>
        <h4 className="text-slate-500 text-sm font-medium">{label}</h4>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
    </Card>
  );
}

function PatientRow({
  name,
  time,
  status,
  staff,
}: {
  name: string;
  time: string;
  status: string;
  staff: string;
}) {
  const statusColors: Record<string, string> = {
    Confirmed: "bg-blue-100 text-blue-700",
    "In Progress": "bg-amber-100 text-amber-700",
    Pending: "bg-slate-100 text-slate-600",
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
            {name.charAt(0)}
          </div>
          <span className="font-semibold text-sm">{name}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{time}</td>
      <td className="px-6 py-4">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${statusColors[status]}`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-500">{staff}</td>
      <td className="px-6 py-4 text-right">
        <button className="p-1 hover:bg-white rounded-md border border-transparent hover:border-slate-200 text-slate-400 hover:text-slate-600 transition-all">
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
}
