import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import login from "../components/login";
import dashboard from "../components/dashboard";
import register from "../components/register";
import note from "../components/note";
import archive from "../components/archive";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import trash from "../components/trash";
Vue.use(VueMaterial);
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: "login"
    }
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/register",
    name: "register",
    component: register
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    beforeEnter: (to, from, next) => {
      if (
        localStorage.getItem("token") === "" ||
        localStorage.getItem("token") === "undefined" ||
        localStorage.getItem("token") === null
      ) {
        next("/login");
      } else {
        next(true);
      }
    },
    children: [
      {
        path: "/",
        redirect: "note",
        pathMatch: "full"
      },
      {
        path: "note",
        component: note
      },
      {
        path: "archive",
        component: archive
      },
      {
        path: "trash",
        component: trash
      }
    ]
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
