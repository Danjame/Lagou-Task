const c1 = () => import(/* webpackChunkName: "page--src--pages--social-vue" */ "/Users/danjunxie/Desktop/myGit/Lagou-Task/fed-e-task-03-04/blog-gridsome/src/pages/Social.vue")
const c2 = () => import(/* webpackChunkName: "page--src--pages--posts-vue" */ "/Users/danjunxie/Desktop/myGit/Lagou-Task/fed-e-task-03-04/blog-gridsome/src/pages/Posts.vue")
const c3 = () => import(/* webpackChunkName: "page--src--templates--article-vue" */ "/Users/danjunxie/Desktop/myGit/Lagou-Task/fed-e-task-03-04/blog-gridsome/src/templates/Article.vue")
const c4 = () => import(/* webpackChunkName: "page--src--pages--projects-vue" */ "/Users/danjunxie/Desktop/myGit/Lagou-Task/fed-e-task-03-04/blog-gridsome/src/pages/Projects.vue")
const c5 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/danjunxie/Desktop/myGit/Lagou-Task/fed-e-task-03-04/blog-gridsome/node_modules/gridsome/app/pages/404.vue")
const c6 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/danjunxie/Desktop/myGit/Lagou-Task/fed-e-task-03-04/blog-gridsome/src/pages/Index.vue")

export default [
  {
    path: "/social/:page(\\d+)?/",
    component: c1
  },
  {
    path: "/posts/:page(\\d+)?/",
    component: c2
  },
  {
    path: "/article/:id/",
    component: c3
  },
  {
    path: "/projects/",
    component: c4
  },
  {
    name: "404",
    path: "/404/",
    component: c5
  },
  {
    name: "home",
    path: "/",
    component: c6
  },
  {
    name: "*",
    path: "*",
    component: c5
  }
]
