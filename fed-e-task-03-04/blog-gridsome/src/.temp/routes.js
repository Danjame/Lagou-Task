const c1 = () => import(/* webpackChunkName: "page--src--pages--posts-vue" */ "/Users/danjunxie/Desktop/myGit/Lagou-Task/fed-e-task-03-04/blog-gridsome/src/pages/Posts.vue")
const c2 = () => import(/* webpackChunkName: "page--src--pages--projects-vue" */ "/Users/danjunxie/Desktop/myGit/Lagou-Task/fed-e-task-03-04/blog-gridsome/src/pages/Projects.vue")
const c3 = () => import(/* webpackChunkName: "page--src--pages--about-vue" */ "/Users/danjunxie/Desktop/myGit/Lagou-Task/fed-e-task-03-04/blog-gridsome/src/pages/About.vue")
const c4 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/danjunxie/Desktop/myGit/Lagou-Task/fed-e-task-03-04/blog-gridsome/node_modules/gridsome/app/pages/404.vue")
const c5 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/danjunxie/Desktop/myGit/Lagou-Task/fed-e-task-03-04/blog-gridsome/src/pages/Index.vue")

export default [
  {
    path: "/posts/",
    component: c1
  },
  {
    path: "/projects/",
    component: c2
  },
  {
    path: "/about/",
    component: c3
  },
  {
    name: "404",
    path: "/404/",
    component: c4
  },
  {
    name: "home",
    path: "/",
    component: c5
  },
  {
    name: "*",
    path: "*",
    component: c4
  }
]
