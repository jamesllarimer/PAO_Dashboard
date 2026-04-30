import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("pages/homePage.tsx"),
    route("/pao/dashboard", "pages/dashboard.tsx"),
    route("/hq/dashboard", "pages/headquartersDashboard.tsx"),
    route("/pao/events/new", "pages/EventForm.tsx"),
] satisfies RouteConfig;