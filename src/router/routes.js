import CalendarPage from "../pages/events/CalendarPage.vue"
import EventsPage from "../pages/events/EventsPage.vue"
import CreateEventPage from "../pages/events/CreateEventPage.vue"
import EditEventPage from "../pages/events/EditEventPage.vue"
import ImportEventPage from "../pages/events/ImportEventPage.vue"
import ExportEventPage from "../pages/events/ExportEventPage.vue"
import LoginPage from "../pages/LoginPage.vue"
import ResetPasswordPage from "../pages/ResetPasswordPage.vue"
import ForgotPasswordPage from "../pages/ForgotPasswordPage.vue"
import RegisterPage from "../pages/RegisterPage.vue"
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
        path: "/edit-event/:id",
        component: EditEventPage,
        name: 'editevent',
        meta: {
            auth: true,
        }
    },
    {
        path: "/import-event",
        component: ImportEventPage,
        name: 'importevent',
        meta: {
            auth: true,
        }
    },
    {
        path: "/export-event",
        component: ExportEventPage,
        name: 'exportevent',
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