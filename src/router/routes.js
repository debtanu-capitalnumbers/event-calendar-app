import CalendarPage from "../pages/events/CalendarPage.vue"
import EventsPage from "../pages/events/EventsPage.vue"
import CreateEventPage from "../pages/events/CreateEventPage.vue"
import EditEventPage from "../pages/events/EditEventPage.vue"
import ImportEventCSVPage from "../pages/events/ImportEventCSVPage.vue"
import ImportEventICSPage from "../pages/events/ImportEventICSPage.vue"
import ExportEventCSVPage from "../pages/events/ExportEventCSVPage.vue"
import ExportEventICSPage from "../pages/events/ExportEventICSPage.vue"
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
        path: "/import-event-from-csv",
        component: ImportEventCSVPage,
        name: 'importeventcsv',
        meta: {
            auth: true,
        }
    },
    {
        path: "/import-event-from-ics",
        component: ImportEventICSPage,
        name: 'importeventics',
        meta: {
            auth: true,
        }
    },
    {
        path: "/export-event-from-csv",
        component: ExportEventCSVPage,
        name: 'exporteventcsv',
        meta: {
            auth: true,
        }
    },
    {
        path: "/export-event-from-ics",
        component: ExportEventICSPage,
        name: 'exporteventics',
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