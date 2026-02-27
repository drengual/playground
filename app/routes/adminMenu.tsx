import React, { useMemo, useState } from "react";

/**
 * Merchant Admin MVP (single-file)
 * React + Tailwind
 * POS-style layout:
 * - Top navigation (Orders / Menu / Settings)
 * - Orders screen: 2 columns (Order Queue + Order Details)
 * - Menu screen: Products / Groups / Options with "Add" modals (visualize relationships)
 *
 * NOTE: This is UI-only (no backend). Data is kept in local component state.
 */

// ---------------------------------
// Types
// ---------------------------------

type OrderStatus = "New" | "Preparing" | "Ready" | "Completed" | "Cancelled";

type PaymentMethod = "GCash" | "Maya" | "Cash";

type PaymentStatus = "Unpaid" | "Paid" | "Failed";

type OrderType =
  | { kind: "Pickup"; pickupTime: "ASAP" | "Scheduled"; pickupAt?: string }
  | { kind: "Dine-in"; tableNumber: string };

type OrderItemModifier = {
  groupName: string;
  optionName: string;
  priceDelta: number;
};

type OrderItem = {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
  modifiers: OrderItemModifier[];
};

type Order = {
  id: string;
  number: string;
  createdAt: string;
  status: OrderStatus;
  type: OrderType;
  customerName: string;
  customerMobile: string;
  customerEmail?: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
};

type Category = { id: string; name: string };

type Product = {
  id: string;
  name: string;
  basePrice: number;
  categoryId: string;
  available: boolean;
  imageUrl?: string;
};

type ModifierGroup = {
  id: string;
  name: string;
  required: boolean;
  minSelect: number;
  maxSelect: number;
  linkedProductIds: string[];
};

type ModifierOption = {
  id: string;
  groupId: string;
  name: string;
  priceDelta: number;
};

type Settings = {
  storeName: string;
  contactNumber: string;
  openingHours: string;
  payments: {
    gcashEnabled: boolean;
    mayaEnabled: boolean;
    cashEnabled: boolean;
  };
};

type NavKey = "orders" | "menu" | "settings";

// ---------------------------------
// Helpers
// ---------------------------------

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

let __idSeq = 0;
function nextId(prefix: string) {
  __idSeq += 1;
  return `${prefix}-${__idSeq}`;
}

function money(n: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(n);
}

function isoNowPlus(minutes: number) {
  const d = new Date(Date.now() + minutes * 60_000);
  return d.toISOString();
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function calcOrderTotal(order: Order) {
  return order.items.reduce((sum, it) => {
    const mods = it.modifiers.reduce((m, x) => m + x.priceDelta, 0);
    return sum + it.qty * (it.unitPrice + mods);
  }, 0);
}

function badgeClass(status: OrderStatus) {
  switch (status) {
    case "New":
      return "bg-indigo-100 text-indigo-800 border-indigo-300";
    case "Preparing":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "Ready":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    case "Completed":
      return "bg-slate-50 text-slate-700 border-slate-200";
    case "Cancelled":
      return "bg-rose-50 text-rose-700 border-rose-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
}

// ---------------------------------
// Seed Data
// ---------------------------------

const seedCategories: Category[] = [
  { id: "cat-drinks", name: "Drinks" },
  { id: "cat-food", name: "Food" },
  { id: "cat-sides", name: "Sides" },
];

const seedProducts: Product[] = [
  {
    id: "p-1",
    name: "Iced Latte",
    basePrice: 120,
    categoryId: "cat-drinks",
    available: true,
  },
  {
    id: "p-2",
    name: "Cheeseburger",
    basePrice: 180,
    categoryId: "cat-food",
    available: true,
  },
  {
    id: "p-3",
    name: "Fries",
    basePrice: 70,
    categoryId: "cat-sides",
    available: true,
  },
];

const seedModifierGroups: ModifierGroup[] = [
  {
    id: "g-1",
    name: "Sugar Level",
    required: true,
    minSelect: 1,
    maxSelect: 1,
    linkedProductIds: ["p-1"],
  },
  {
    id: "g-2",
    name: "Fries Flavor",
    required: true,
    minSelect: 1,
    maxSelect: 1,
    linkedProductIds: ["p-3"],
  },
  {
    id: "g-3",
    name: "Add-ons",
    required: false,
    minSelect: 0,
    maxSelect: 3,
    linkedProductIds: ["p-1", "p-2"],
  },
];

const seedModifierOptions: ModifierOption[] = [
  { id: "o-1", groupId: "g-1", name: "0%", priceDelta: 0 },
  { id: "o-2", groupId: "g-1", name: "50%", priceDelta: 0 },
  { id: "o-3", groupId: "g-1", name: "100%", priceDelta: 0 },
  { id: "o-4", groupId: "g-2", name: "BBQ", priceDelta: 0 },
  { id: "o-5", groupId: "g-2", name: "Cheese", priceDelta: 10 },
  { id: "o-6", groupId: "g-2", name: "Sour Cream", priceDelta: 10 },
  { id: "o-7", groupId: "g-3", name: "Extra Shot", priceDelta: 30 },
  { id: "o-8", groupId: "g-3", name: "Cheese", priceDelta: 20 },
  { id: "o-9", groupId: "g-3", name: "Bacon", priceDelta: 35 },
];

const seedOrders: Order[] = [
  {
    id: "ord-1",
    number: "A-1042",
    createdAt: isoNowPlus(-55),
    status: "New",
    type: { kind: "Dine-in", tableNumber: "12" },
    customerName: "Mika D.",
    customerMobile: "0917 123 4567",
    paymentMethod: "Cash",
    paymentStatus: "Unpaid",
    items: [
      {
        id: "it-1",
        name: "Fries",
        qty: 1,
        unitPrice: 70,
        modifiers: [
          { groupName: "Fries Flavor", optionName: "Cheese", priceDelta: 10 },
        ],
      },
      {
        id: "it-2",
        name: "Iced Latte",
        qty: 1,
        unitPrice: 120,
        modifiers: [
          { groupName: "Sugar Level", optionName: "50%", priceDelta: 0 },
          { groupName: "Add-ons", optionName: "Extra Shot", priceDelta: 30 },
        ],
      },
    ],
    notes: "No ice for latte, please.",
  },
  {
    id: "ord-2",
    number: "P-1043",
    createdAt: isoNowPlus(-38),
    status: "Preparing",
    type: { kind: "Pickup", pickupTime: "ASAP" },
    customerName: "Carlo R.",
    customerMobile: "0999 555 0001",
    customerEmail: "carlo@example.com",
    paymentMethod: "GCash",
    paymentStatus: "Paid",
    items: [
      {
        id: "it-3",
        name: "Cheeseburger",
        qty: 2,
        unitPrice: 180,
        modifiers: [
          { groupName: "Add-ons", optionName: "Bacon", priceDelta: 35 },
        ],
      },
    ],
  },
  {
    id: "ord-3",
    number: "A-1044",
    createdAt: isoNowPlus(-15),
    status: "Ready",
    type: { kind: "Dine-in", tableNumber: "5" },
    customerName: "Jen S.",
    customerMobile: "0918 222 1111",
    paymentMethod: "Maya",
    paymentStatus: "Paid",
    items: [
      {
        id: "it-4",
        name: "Iced Latte",
        qty: 1,
        unitPrice: 120,
        modifiers: [
          { groupName: "Sugar Level", optionName: "100%", priceDelta: 0 },
        ],
      },
    ],
  },
];

const seedSettings: Settings = {
  storeName: "Demo Cafe",
  contactNumber: "0917 000 0000",
  openingHours: "Mon–Sun, 8:00am–9:00pm",
  payments: { gcashEnabled: true, mayaEnabled: true, cashEnabled: true },
};

// ---------------------------------
// App
// ---------------------------------

export default function MerchantAdminMvp() {
  const [isAuthed, setIsAuthed] = useState(false);

  const [nav, setNav] = useState<NavKey>("orders");
  const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>(
    "ord-1",
  );

  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [categories] = useState<Category[]>(seedCategories);
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [groups, setGroups] = useState<ModifierGroup[]>(seedModifierGroups);
  const [options, setOptions] = useState<ModifierOption[]>(seedModifierOptions);
  const [settings, setSettings] = useState<Settings>(seedSettings);

  const [orderFilter, setOrderFilter] = useState<OrderStatus | "All">("All");
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    const base =
      orderFilter === "All"
        ? orders
        : orders.filter((o) => o.status === orderFilter);
    const q = search.trim().toLowerCase();
    if (!q) return base;
    return base.filter((o) => {
      const hay =
        `${o.number} ${o.customerName} ${o.customerMobile}`.toLowerCase();
      return hay.includes(q);
    });
  }, [orders, orderFilter, search]);

  const selectedOrder = useMemo(() => {
    if (!selectedOrderId) return undefined;
    return orders.find((o) => o.id === selectedOrderId);
  }, [orders, selectedOrderId]);

  const pageTitle =
    nav === "orders" ? "Orders" : nav === "menu" ? "Menu" : "Settings";

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <LoginCard onSuccess={() => setIsAuthed(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <TopNav
        storeName={settings.storeName}
        active={nav}
        onNav={(k) => setNav(k)}
        onLogout={() => {
          setIsAuthed(false);
          setNav("orders");
        }}
      />

      <main className="min-h-[calc(100vh-64px)]">
        <AppTopBar
          title={pageTitle}
          subtitle={
            nav === "orders"
              ? "Live incoming orders"
              : nav === "menu"
                ? "Products and add-ons"
                : "Store settings"
          }
          rightSlot={
            nav === "orders" ? (
              <div className="flex items-center gap-2">
                <SearchInput value={search} onChange={setSearch} />
                <button
                  className="rounded-xl bg-indigo-600 text-white px-3 py-2 text-sm font-semibold hover:bg-indigo-700 shadow"
                  onClick={() => alert("Add Order (manual) can be added later")}
                >
                  Add Order
                </button>
              </div>
            ) : null
          }
        />

        <div className="p-4 sm:p-6">
          {nav === "orders" ? (
            <OrdersPosLayout
              filter={orderFilter}
              onFilter={setOrderFilter}
              search={search}
              onSearch={setSearch}
              orders={filteredOrders}
              selectedOrderId={selectedOrderId}
              onSelectOrder={(id) => setSelectedOrderId(id)}
              selectedOrder={selectedOrder}
              onUpdateStatus={(orderId, next) => {
                setOrders((prev) =>
                  prev.map((o) =>
                    o.id === orderId ? { ...o, status: next } : o,
                  ),
                );
              }}
            />
          ) : null}

          {nav === "menu" ? (
            <MenuScreen
              categories={categories}
              products={products}
              groups={groups}
              options={options}
              onToggleProduct={(productId) => {
                setProducts((prev) =>
                  prev.map((p) =>
                    p.id === productId ? { ...p, available: !p.available } : p,
                  ),
                );
              }}
              onAddProduct={(draft) => {
                setProducts((prev) => [...prev, { ...draft, id: nextId("p") }]);
              }}
              onAddGroup={(draft) => {
                setGroups((prev) => [...prev, { ...draft, id: nextId("g") }]);
              }}
              onAddOption={(draft) => {
                setOptions((prev) => [...prev, { ...draft, id: nextId("o") }]);
              }}
            />
          ) : null}

          {nav === "settings" ? (
            <SettingsScreen settings={settings} onChange={setSettings} />
          ) : null}

          <DevTests />
        </div>
      </main>
    </div>
  );
}

// ---------------------------------
// Shell UI
// ---------------------------------

function TopNav(props: {
  storeName: string;
  active: NavKey;
  onNav: (k: NavKey) => void;
  onLogout: () => void;
}) {
  const navItem = (k: NavKey, label: string) => {
    const isActive = props.active === k;
    return (
      <button
        onClick={() => props.onNav(k)}
        className={cx(
          "px-4 py-2 text-sm font-semibold rounded-xl transition border",
          isActive
            ? "bg-indigo-600 text-white border-indigo-600 shadow"
            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <nav className="sticky top-0 z-30 bg-white border-b-2 border-slate-300 shadow-sm">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-lg font-bold text-slate-900 truncate">
            {props.storeName}
          </div>
          <div className="text-xs text-slate-500">Merchant Admin</div>
        </div>

        <div className="flex items-center gap-3">
          {navItem("orders", "Orders")}
          {navItem("menu", "Menu")}
          {navItem("settings", "Settings")}
          <button
            onClick={props.onLogout}
            className="ml-2 px-4 py-2 text-sm font-semibold rounded-xl border border-rose-300 text-rose-600 hover:bg-rose-50"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

function AppTopBar(props: {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}) {
  // TopNav is sticky top-0; this bar sticks beneath it.
  return (
    <header className="sticky top-16 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-lg font-semibold text-slate-900 truncate">
            {props.title}
          </div>
          {props.subtitle ? (
            <div className="text-sm text-slate-500 truncate">
              {props.subtitle}
            </div>
          ) : null}
        </div>
        <div className="shrink-0">{props.rightSlot}</div>
      </div>
    </header>
  );
}

function SearchInput(props: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <svg
        className="h-4 w-4 text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M21 21l-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-56 text-sm outline-none"
        placeholder="Search orders"
      />
    </div>
  );
}

// ---------------------------------
// Login
// ---------------------------------

function LoginCard(props: { onSuccess: () => void }) {
  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-semibold">
          M
        </div>
        <div>
          <div className="text-lg font-semibold text-slate-900">
            Merchant Login
          </div>
          <div className="text-sm text-slate-500">
            Use demo credentials to enter.
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <Field label="Email">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
            placeholder="you@store.com"
          />
        </Field>

        <Field label="Password">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
            placeholder="••••••••"
          />
        </Field>

        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <button
          onClick={() => {
            if (!email.trim() || !password.trim()) {
              setError("Please enter email and password.");
              return;
            }
            setError(undefined);
            props.onSuccess();
          }}
          className="w-full rounded-xl bg-slate-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-800"
        >
          Login
        </button>

        <div className="text-xs text-slate-500">
          Demo: email <span className="font-mono">admin@demo.com</span> ·
          password <span className="font-mono">password</span>
        </div>
      </div>
    </div>
  );
}

function Field(props: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-slate-600 mb-1">
        {props.label}
      </div>
      {props.children}
    </label>
  );
}

// ---------------------------------
// Orders POS layout
// ---------------------------------

function OrdersPosLayout(props: {
  filter: OrderStatus | "All";
  onFilter: (v: OrderStatus | "All") => void;
  search: string;
  onSearch: (v: string) => void;
  orders: Order[];
  selectedOrderId?: string;
  onSelectOrder: (id: string) => void;
  selectedOrder?: Order;
  onUpdateStatus: (orderId: string, next: OrderStatus) => void;
}) {
  const filters: Array<OrderStatus | "All"> = [
    "All",
    "New",
    "Preparing",
    "Ready",
    "Completed",
    "Cancelled",
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">
      {/* Left: Order Queue */}
      <div className="w-full lg:w-[420px] shrink-0 rounded-none lg:rounded-l-2xl border-2 border-indigo-300 bg-white shadow-xl overflow-hidden flex flex-col">
        <div className="p-4 sm:p-5 border-b-2 border-slate-200 bg-slate-50">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900">
                Order Queue
              </div>
              <div className="text-xs text-slate-500">
                Click an order to view details
              </div>
            </div>

            {/* Mobile-only search (desktop search is in the page top bar) */}
            <div className="sm:hidden">
              <SearchInput value={props.search} onChange={props.onSearch} />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => props.onFilter(f)}
                className={cx(
                  "rounded-full px-3 py-1.5 text-xs font-semibold border transition",
                  props.filter === f
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100 flex-1 overflow-auto max-h-[calc(100vh-220px)] lg:max-h-[calc(100vh-220px)]">
          {props.orders.length === 0 ? (
            <div className="p-6 text-sm text-slate-500">No orders found.</div>
          ) : null}

          {props.orders.map((o) => {
            const total = calcOrderTotal(o);
            const isSelected = props.selectedOrderId === o.id;
            const typeLabel =
              o.type.kind === "Pickup"
                ? "Pickup"
                : `Table #${o.type.tableNumber}`;

            return (
              <button
                key={o.id}
                onClick={() => props.onSelectOrder(o.id)}
                className={cx(
                  "w-full text-left p-4 sm:p-5 transition border-l-4 hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300",
                  isSelected
                    ? "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-200"
                    : "border-transparent",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900">
                      {o.number}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      {formatDate(o.createdAt)} · {typeLabel}
                    </div>
                  </div>
                  <span
                    className={cx(
                      "inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold",
                      badgeClass(o.status),
                    )}
                  >
                    {o.status}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-600 truncate">
                    {o.customerName} · {o.customerMobile}
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {money(total)}
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <div className="truncate">
                    {o.paymentMethod} · {o.paymentStatus}
                  </div>
                  <div>
                    {o.items.length} item{o.items.length === 1 ? "" : "s"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Selected Order */}
      <div className="w-full lg:flex-1 min-w-0 rounded-none lg:rounded-r-2xl border-2 border-slate-300 bg-white shadow-xl flex flex-col">
        <OrderDetailPanel
          order={props.selectedOrder}
          onUpdateStatus={props.onUpdateStatus}
        />
      </div>
    </div>
  );
}

function OrderDetailPanel(props: {
  order?: Order;
  onUpdateStatus: (orderId: string, next: OrderStatus) => void;
}) {
  if (!props.order) {
    return (
      <div className="p-8">
        <div className="text-sm font-semibold text-slate-900">
          No order selected
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Select an order from the queue to view details.
        </p>
      </div>
    );
  }

  const o = props.order;
  const total = calcOrderTotal(o);
  const typeLabel =
    o.type.kind === "Pickup"
      ? `Pickup${o.type.pickupTime === "Scheduled" && o.type.pickupAt ? ` · ${formatDate(o.type.pickupAt)}` : ""}`
      : `Dine-in · Table #${o.type.tableNumber}`;

  const statusSteps: OrderStatus[] = ["New", "Preparing", "Ready", "Completed"];

  return (
    <div className="flex flex-col">
      <div className="p-5 border-b border-slate-200">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xl font-semibold text-slate-900">
              {o.number}
            </div>
            <div className="mt-1 text-sm text-slate-500">
              {formatDate(o.createdAt)} · {typeLabel}
            </div>
          </div>
          <span
            className={cx(
              "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold",
              badgeClass(o.status),
            )}
          >
            {o.status}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoBox
            title="Customer"
            lines={[o.customerName, o.customerMobile, o.customerEmail ?? "—"]}
          />
          <InfoBox
            title="Payment"
            lines={[
              `${o.paymentMethod}`,
              `${o.paymentStatus}`,
              `Total: ${money(total)}`,
            ]}
          />
        </div>
      </div>

      <div className="p-5">
        <div className="text-sm font-semibold text-slate-900">Items</div>
        <div className="mt-3 space-y-3">
          {o.items.map((it) => {
            const mods = it.modifiers.reduce((m, x) => m + x.priceDelta, 0);
            const unitWithMods = it.unitPrice + mods;
            const lineTotal = it.qty * unitWithMods;

            return (
              <div
                key={it.id}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 min-w-[2rem] items-center justify-center rounded-lg bg-slate-900 text-white text-xs font-bold px-2">
                          {it.qty}×
                        </span>
                        <div className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                          {it.name}
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <span className="text-slate-500">Base</span>
                          <span className="font-semibold text-slate-700">
                            {money(it.unitPrice)}
                          </span>
                        </span>
                        {mods !== 0 ? (
                          <span className="inline-flex items-center gap-1">
                            <span className="text-slate-500">Add-ons</span>
                            <span className="font-semibold text-slate-700">
                              {mods > 0 ? "+" : ""}
                              {money(mods)}
                            </span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <span className="text-slate-500">Add-ons</span>
                            <span className="font-semibold text-slate-700">
                              —
                            </span>
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1">
                          <span className="text-slate-500">Unit</span>
                          <span className="font-semibold text-slate-700">
                            {money(unitWithMods)}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="text-xs text-slate-500">Line total</div>
                      <div className="text-base font-bold text-slate-900">
                        {money(lineTotal)}
                      </div>
                    </div>
                  </div>

                  {it.modifiers.length > 0 ? (
                    <div className="mt-4">
                      <div className="text-xs font-semibold text-slate-600">
                        Selections
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {it.modifiers.map((m, idx) => (
                          <span
                            key={`${it.id}-m-${idx}`}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
                          >
                            <span className="font-semibold text-slate-600">
                              {m.groupName}:
                            </span>
                            <span className="font-semibold text-slate-900">
                              {m.optionName}
                            </span>
                            {m.priceDelta !== 0 ? (
                              <span className="text-slate-600">
                                ({m.priceDelta > 0 ? "+" : ""}
                                {money(m.priceDelta)})
                              </span>
                            ) : null}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 text-xs text-slate-500">
                      No modifiers.
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 bg-slate-50 px-4 sm:px-5 py-3">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>
                      Qty {it.qty} × {money(unitWithMods)}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {money(lineTotal)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {o.notes ? (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="text-xs font-semibold text-slate-700">
              Customer notes
            </div>
            <div className="mt-1 text-sm text-slate-700">{o.notes}</div>
          </div>
        ) : null}

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
          <div className="text-sm font-semibold text-slate-900">
            Update Status
          </div>
          <div className="mt-3 grid grid-cols-2 lg:grid-cols-5 gap-2">
            {statusSteps.map((s) => (
              <button
                key={s}
                onClick={() => props.onUpdateStatus(o.id, s)}
                disabled={o.status === "Cancelled"}
                className={cx(
                  "rounded-xl border px-3 py-2 text-sm font-semibold",
                  o.status === s
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "bg-white border-slate-200 hover:bg-slate-50",
                  o.status === "Cancelled" && "opacity-50 cursor-not-allowed",
                )}
              >
                {s}
              </button>
            ))}

            <button
              onClick={() => props.onUpdateStatus(o.id, "Cancelled")}
              className={cx(
                "rounded-xl border px-3 py-2 text-sm font-semibold border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
                o.status === "Cancelled" && "opacity-80",
              )}
            >
              Cancel
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            MVP tip: cancel keeps a record (no hard delete).
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoBox(props: { title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
      <div className="text-xs font-semibold text-slate-500">{props.title}</div>
      <div className="mt-2 space-y-1">
        {props.lines.map((l, idx) => (
          <div
            key={`${props.title}-${idx}`}
            className="text-sm text-slate-700 truncate"
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------
// Menu (with modals)
// ---------------------------------

function MenuScreen(props: {
  categories: Category[];
  products: Product[];
  groups: ModifierGroup[];
  options: ModifierOption[];
  onToggleProduct: (productId: string) => void;
  onAddProduct: (draft: Omit<Product, "id">) => void;
  onAddGroup: (draft: Omit<ModifierGroup, "id">) => void;
  onAddOption: (draft: Omit<ModifierOption, "id">) => void;
}) {
  const catNameById = useMemo(() => {
    const m = new Map<string, string>();
    props.categories.forEach((c) => m.set(c.id, c.name));
    return m;
  }, [props.categories]);

  const productsById = useMemo(() => {
    const m = new Map<string, Product>();
    props.products.forEach((p) => m.set(p.id, p));
    return m;
  }, [props.products]);

  const [modal, setModal] = useState<"product" | "group" | "option" | null>(
    null,
  );

  // Product modal fields
  const [pName, setPName] = useState("");
  const [pPrice, setPPrice] = useState("0");
  const [pCatId, setPCatId] = useState<string>(
    props.categories.at(0)?.id ?? "",
  );
  const [pAvailable, setPAvailable] = useState(true);

  // Group modal fields
  const [gName, setGName] = useState("");
  const [gRequired, setGRequired] = useState(true);
  const [gMin, setGMin] = useState("1");
  const [gMax, setGMax] = useState("1");
  const [gLinked, setGLinked] = useState<string[]>([]);

  // Option modal fields
  const [oGroupId, setOGroupId] = useState<string>(
    props.groups.at(0)?.id ?? "",
  );
  const [oName, setOName] = useState("");
  const [oDelta, setODelta] = useState("0");

  function openProductModal() {
    setPName("");
    setPPrice("0");
    setPCatId(props.categories.at(0)?.id ?? "");
    setPAvailable(true);
    setModal("product");
  }

  function openGroupModal() {
    setGName("");
    setGRequired(true);
    setGMin("1");
    setGMax("1");
    setGLinked([]);
    setModal("group");
  }

  function openOptionModal() {
    setOGroupId(props.groups.at(0)?.id ?? "");
    setOName("");
    setODelta("0");
    setModal("option");
  }

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card
          title="Products"
          subtitle="Show/hide items from the customer menu"
          right={
            <button
              className="rounded-lg border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50"
              onClick={openProductModal}
            >
              + Add
            </button>
          }
        >
          <div className="space-y-2">
            {props.products.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-slate-200 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {p.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {catNameById.get(p.categoryId) ?? "Uncategorized"} ·{" "}
                      {money(p.basePrice)}
                    </div>
                  </div>
                  <button
                    onClick={() => props.onToggleProduct(p.id)}
                    className={cx(
                      "rounded-full border px-2 py-1 text-xs font-semibold",
                      p.available
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : "bg-slate-50 text-slate-600 border-slate-200",
                    )}
                  >
                    {p.available ? "Available" : "Hidden"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Modifier Groups"
          subtitle="Questions shown on a product (required/optional + min/max)"
          right={
            <button
              className="rounded-lg border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50"
              onClick={openGroupModal}
            >
              + Add
            </button>
          }
        >
          <div className="space-y-2">
            {props.groups.map((g) => (
              <div
                key={g.id}
                className="rounded-xl border border-slate-200 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {g.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {g.required ? "Required" : "Optional"} · min {g.minSelect}
                      , max {g.maxSelect}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    Linked: {g.linkedProductIds.length}
                  </div>
                </div>

                {g.linkedProductIds.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {g.linkedProductIds.map((pid) => {
                      const p = productsById.get(pid);
                      return (
                        <span
                          key={`${g.id}-p-${pid}`}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600"
                        >
                          {p?.name ?? "Unknown"}
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Modifier Options"
          subtitle="Choices inside a group (with price add-ons)"
          right={
            <button
              className="rounded-lg border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50"
              onClick={openOptionModal}
            >
              + Add
            </button>
          }
        >
          <div className="space-y-2">
            {props.options.map((o) => {
              const groupName =
                props.groups.find((g) => g.id === o.groupId)?.name ?? "Unknown";
              return (
                <div
                  key={o.id}
                  className="rounded-xl border border-slate-200 p-3"
                >
                  <div className="text-xs text-slate-500">{groupName}</div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-semibold text-slate-900">
                      {o.name}
                    </div>
                    <div className="text-sm text-slate-700">
                      {o.priceDelta === 0
                        ? "—"
                        : `${o.priceDelta > 0 ? "+" : ""}${money(o.priceDelta)}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 text-sm text-slate-600">
        <div className="font-semibold text-slate-900">
          How to think about it
        </div>
        <p className="mt-1">
          Product = item. Group = question for that item. Option = answers
          inside the question.
        </p>
      </div>

      {/* --- Modals --- */}
      <Modal
        open={modal === "product"}
        title="Add Product"
        description="Create a menu item customers can order"
        onClose={() => setModal(null)}
      >
        <div className="space-y-3">
          <Field label="Name">
            <input
              value={pName}
              onChange={(e) => setPName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="e.g. Iced Latte"
            />
          </Field>

          <Field label="Base Price (PHP)">
            <input
              value={pPrice}
              onChange={(e) => setPPrice(e.target.value)}
              inputMode="numeric"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="e.g. 120"
            />
          </Field>

          <Field label="Category">
            <select
              value={pCatId}
              onChange={(e) => setPCatId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
            >
              {props.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
            <div>
              <div className="text-sm font-semibold text-slate-700">
                Available
              </div>
              <div className="text-xs text-slate-500">
                Show this item on the customer menu
              </div>
            </div>
            <button
              onClick={() => setPAvailable((v) => !v)}
              className={cx(
                "relative inline-flex h-7 w-12 items-center rounded-full border transition",
                pAvailable
                  ? "bg-emerald-500 border-emerald-600"
                  : "bg-slate-200 border-slate-300",
              )}
              aria-pressed={pAvailable}
            >
              <span
                className={cx(
                  "inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
                  pAvailable ? "translate-x-6" : "translate-x-1",
                )}
              />
            </button>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              onClick={() => setModal(null)}
            >
              Cancel
            </button>
            <button
              className="rounded-xl bg-indigo-600 text-white px-4 py-2 text-sm font-semibold hover:bg-indigo-700 shadow"
              onClick={() => {
                const name = pName.trim();
                const basePrice = Number(pPrice);
                const categoryId = pCatId;
                if (
                  !name ||
                  !Number.isFinite(basePrice) ||
                  basePrice < 0 ||
                  !categoryId
                ) {
                  alert("Please enter name, price, and category.");
                  return;
                }
                props.onAddProduct({
                  name,
                  basePrice,
                  categoryId,
                  available: pAvailable,
                });
                setModal(null);
              }}
            >
              Add Product
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={modal === "group"}
        title="Add Modifier Group"
        description="This is a question shown on a product (e.g., Sugar Level)"
        onClose={() => setModal(null)}
      >
        <div className="space-y-3">
          <Field label="Group Name">
            <input
              value={gName}
              onChange={(e) => setGName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="e.g. Sugar Level"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Field label="Required?">
              <select
                value={gRequired ? "yes" : "no"}
                onChange={(e) => setGRequired(e.target.value === "yes")}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              >
                <option value="yes">Required</option>
                <option value="no">Optional</option>
              </select>
            </Field>

            <Field label="Min Select">
              <input
                value={gMin}
                onChange={(e) => setGMin(e.target.value)}
                inputMode="numeric"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              />
            </Field>

            <Field label="Max Select">
              <input
                value={gMax}
                onChange={(e) => setGMax(e.target.value)}
                inputMode="numeric"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              />
            </Field>
          </div>

          <div className="rounded-2xl border border-slate-200 p-3">
            <div className="text-xs font-semibold text-slate-600">
              Link to products
            </div>
            <div className="mt-2 space-y-2">
              {props.products.map((p) => {
                const checked = gLinked.includes(p.id);
                return (
                  <label
                    key={p.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-700 truncate">
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {catNameById.get(p.categoryId) ?? "Uncategorized"}
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        setGLinked((prev) =>
                          checked
                            ? prev.filter((id) => id !== p.id)
                            : [...prev, p.id],
                        );
                      }}
                      className="h-4 w-4"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              onClick={() => setModal(null)}
            >
              Cancel
            </button>
            <button
              className="rounded-xl bg-indigo-600 text-white px-4 py-2 text-sm font-semibold hover:bg-indigo-700 shadow"
              onClick={() => {
                const name = gName.trim();
                const minSelect = Number(gMin);
                const maxSelect = Number(gMax);
                if (
                  !name ||
                  !Number.isFinite(minSelect) ||
                  !Number.isFinite(maxSelect)
                ) {
                  alert("Please enter a group name and numeric min/max.");
                  return;
                }
                if (minSelect < 0 || maxSelect < 0 || maxSelect < minSelect) {
                  alert("Min/Max selection must be valid (max >= min). ");
                  return;
                }
                props.onAddGroup({
                  name,
                  required: gRequired,
                  minSelect,
                  maxSelect,
                  linkedProductIds: gLinked,
                });
                setModal(null);
              }}
            >
              Add Group
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={modal === "option"}
        title="Add Modifier Option"
        description="A choice inside a group (e.g., Extra Shot, +₱30)"
        onClose={() => setModal(null)}
      >
        <div className="space-y-3">
          <Field label="Group">
            <select
              value={oGroupId}
              onChange={(e) => setOGroupId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
            >
              {props.groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Option Name">
            <input
              value={oName}
              onChange={(e) => setOName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="e.g. Extra Shot"
            />
          </Field>

          <Field label="Price Add-on (PHP)">
            <input
              value={oDelta}
              onChange={(e) => setODelta(e.target.value)}
              inputMode="numeric"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="e.g. 30"
            />
          </Field>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <div className="text-xs font-semibold text-slate-600">Preview</div>
            <div className="mt-2 rounded-xl border border-slate-200 bg-white p-3">
              <div className="text-xs text-slate-500">
                {props.groups.find((g) => g.id === oGroupId)?.name ?? "Group"}
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-slate-900">
                  {oName.trim() || "Option name"}
                </div>
                <div className="text-sm text-slate-700">
                  {Number(oDelta) === 0
                    ? "—"
                    : `${Number(oDelta) > 0 ? "+" : ""}${money(Number(oDelta))}`}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              onClick={() => setModal(null)}
            >
              Cancel
            </button>
            <button
              className="rounded-xl bg-indigo-600 text-white px-4 py-2 text-sm font-semibold hover:bg-indigo-700 shadow"
              onClick={() => {
                const groupId = oGroupId;
                const name = oName.trim();
                const priceDelta = Number(oDelta);
                if (!groupId) {
                  alert("Please select a group first.");
                  return;
                }
                if (!name || !Number.isFinite(priceDelta)) {
                  alert("Please enter an option name and numeric price.");
                  return;
                }
                props.onAddOption({ groupId, name, priceDelta });
                setModal(null);
              }}
            >
              Add Option
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

function Modal(props: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!props.open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Close modal"
        onClick={props.onClose}
      />
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-semibold text-slate-900">
              {props.title}
            </div>
            {props.description ? (
              <div className="mt-0.5 text-sm text-slate-500">
                {props.description}
              </div>
            ) : null}
          </div>
          <button
            className="rounded-xl border border-slate-200 px-2 py-1 text-xs font-semibold hover:bg-slate-50"
            onClick={props.onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-4">{props.children}</div>
      </div>
    </div>
  );
}

function Card(props: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border-2 border-slate-300 bg-white shadow-md">
      <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-bold text-slate-800 tracking-wide">
              {props.title}
            </div>
            {props.subtitle ? (
              <div className="text-xs text-slate-500 mt-0.5">
                {props.subtitle}
              </div>
            ) : null}
          </div>
          {props.right ? <div className="shrink-0">{props.right}</div> : null}
        </div>
      </div>
      <div className="p-5">{props.children}</div>
    </div>
  );
}

// ---------------------------------
// Settings
// ---------------------------------

function SettingsScreen(props: {
  settings: Settings;
  onChange: (s: Settings) => void;
}) {
  const s = props.settings;

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card
          title="Store Info"
          subtitle="Used for receipts, contact, and branding"
        >
          <div className="space-y-3">
            <Field label="Store Name">
              <input
                value={s.storeName}
                onChange={(e) =>
                  props.onChange({ ...s, storeName: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              />
            </Field>

            <Field label="Contact Number">
              <input
                value={s.contactNumber}
                onChange={(e) =>
                  props.onChange({ ...s, contactNumber: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              />
            </Field>

            <Field label="Opening Hours">
              <input
                value={s.openingHours}
                onChange={(e) =>
                  props.onChange({ ...s, openingHours: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              />
            </Field>
          </div>
        </Card>

        <Card title="Payments" subtitle="Enable or disable payment methods">
          <div className="space-y-3">
            <ToggleRow
              label="GCash"
              checked={s.payments.gcashEnabled}
              onChange={(v) =>
                props.onChange({
                  ...s,
                  payments: { ...s.payments, gcashEnabled: v },
                })
              }
            />
            <ToggleRow
              label="Maya"
              checked={s.payments.mayaEnabled}
              onChange={(v) =>
                props.onChange({
                  ...s,
                  payments: { ...s.payments, mayaEnabled: v },
                })
              }
            />
            <ToggleRow
              label="Cash"
              checked={s.payments.cashEnabled}
              onChange={(v) =>
                props.onChange({
                  ...s,
                  payments: { ...s.payments, cashEnabled: v },
                })
              }
            />

            <button
              className="mt-2 w-full rounded-xl bg-indigo-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-indigo-700 shadow"
              onClick={() => alert("Save settings: connect to backend later")}
            >
              Save Settings
            </button>
          </div>
        </Card>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 text-sm text-slate-600">
        <div className="font-semibold text-slate-900">Next improvements</div>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>Account page: change password</li>
          <li>Brand settings: logo + primary color</li>
          <li>Kitchen display mode (full-screen)</li>
        </ul>
      </div>
    </section>
  );
}

function ToggleRow(props: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 bg-white">
      <div className="text-sm font-semibold text-slate-700">{props.label}</div>
      <button
        onClick={() => props.onChange(!props.checked)}
        className={cx(
          "relative inline-flex h-7 w-12 items-center rounded-full border transition",
          props.checked
            ? "bg-emerald-500 border-emerald-600"
            : "bg-slate-200 border-slate-300",
        )}
        aria-pressed={props.checked}
      >
        <span
          className={cx(
            "inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
            props.checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}

// ---------------------------------
// Dev tests (tiny, safe)
// ---------------------------------

function DevTests() {
  // These run once on mount. They help catch regressions if you keep editing.
  useMemo(() => {
    // 1) calcOrderTotal
    const t1: Order = {
      id: "t1",
      number: "T-1",
      createdAt: isoNowPlus(0),
      status: "New",
      type: { kind: "Pickup", pickupTime: "ASAP" },
      customerName: "Test",
      customerMobile: "000",
      paymentMethod: "Cash",
      paymentStatus: "Unpaid",
      items: [
        {
          id: "i1",
          name: "Item",
          qty: 2,
          unitPrice: 100,
          modifiers: [
            { groupName: "Add", optionName: "Extra", priceDelta: 10 },
          ],
        },
      ],
    };
    const total = calcOrderTotal(t1);
    console.assert(total === 220, `Expected 220, got ${total}`);

    // 2) badgeClass never returns empty
    const b = badgeClass("New");
    console.assert(b.trim().length > 0, "badgeClass should return classes");

    // 3) nextId unique
    const a = nextId("x");
    const c = nextId("x");
    console.assert(a !== c, "nextId should create unique ids");

    return null;
  }, []);

  return null;
}
