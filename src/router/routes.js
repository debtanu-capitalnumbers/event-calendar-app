import EventsPage from "../pages/EventsPage.vue"
import LoginPage from "../pages/LoginPage.vue"
import RegisterPage from "../pages/RegisterPage.vue"
import CalendarPage from "../pages/CalendarPage.vue"
import HomePage from "../pages/HomePage.vue"
import NotFoundErrorPage from "../pages/errors/NotFoundErrorPage.vue"


const routes = [
    {
        path: "/",
        component: HomePage,
        name: 'home',
        meta: {
            guest: true,
        }
    },
    {
        path: "/events",
        component: EventsPage,
        name: 'events',
        meta: {
            auth: true,
        }
    },
    {
        path: "/login",
        component: LoginPage,
        name: 'login',
        meta: {
            guest: true,
        }
    },
    {
        path: "/register",
        component: RegisterPage,
        name: 'register',
        meta: {
            guest: true,
        }
    },
    {
        path: "/calendar",
        component: CalendarPage,
        name: 'calendar',
        meta: {
            auth: true,
        }
    },
    {
        path: "/:notFound(.*)",
        name: 'error.404',
        component: NotFoundErrorPage,
    }
]

export default routes