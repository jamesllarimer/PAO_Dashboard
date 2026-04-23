import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("pages/homePage.tsx"),
    route("/dashboard", "pages/dashboard.tsx"),
    route("/headquartersDashboard", "pages/headquartersDashboard.tsx"),
] satisfies RouteConfig;