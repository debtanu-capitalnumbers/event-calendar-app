import EventsPage from "../pages/EventsPage.vue"
import CreateEventPage from "../pages/CreateEventPage.vue"
import LoginPage from "../pages/LoginPage.vue"
import ResetPasswordPage from "../pages/ResetPasswordPage.vue"
import ForgotPasswordPage from "../pages/ForgotPasswordPage.vue"
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
        path: "/create-event",
        component: CreateEventPage,
        name: 'createevent',
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
        path: "/reset-password/:token",
        component: ResetPasswordPage,
        name: 'reset-password',
        // handle these as props
        props: true,
        meta: {
            guest: true,
        }
    },
    {
        path: "/forgot-password",
        component: ForgotPasswordPage,
        name: 'forgot-password',
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