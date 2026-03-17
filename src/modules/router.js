export const install = ({ app, router }) => {
  // 路由守卫保持不变
  // 可见
  const isVisiblePages = ["", "Home", "Scan", "Map", "Home", "Login", "Register", "Invite", "ForgotPassword"];

  router.beforeEach((to, from) => {
    const guestId = localStorage.getItem("guestId");
    const token = localStorage.getItem("token");

    const isVisible = isVisiblePages.includes(to.name);

    if (isVisible) {
      return true;
    }

    if (!token && !guestId && to.name !== "Login") {
      return {
        name: "Login",
        query: {
          redirect: to.fullPath,
        },
      };
    }
    return true;
  });
  app.use(router);
};
