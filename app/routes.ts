import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("brightsmile", "routes/brightsmile.tsx"),
  route("brightsmile-vtwo", "routes/brightsmile-vtwo.tsx"),
  route("brightsmile-vthree", "routes/brightsmile-vthree.tsx"),
  route("adminBrightSmile", "routes/adminBrightSmile.tsx"),
  route("adminBrightSmile-LRN", "routes/adminBrightSmile-LRN.tsx"),
  route("aldrenbagual-v1", "routes/aldrenbagual-v1.tsx"),
  route("aldrenbagual-v2", "routes/aldrenbagual-v2.tsx"),
  route("adminBrightSmile-v1", "routes/adminBrightSmile-v1.tsx"),
  route("adminBrightSmile-v2", "routes/adminBrightSmile-v2.tsx"),
  route("adminMenu", "routes/adminMenu.tsx"),
  route("para", "routes/para.tsx"),
  route("para2", "routes/para2.tsx"),
  route("para3", "routes/para3.tsx"),
] satisfies RouteConfig;
