import { createFetch } from "@vueuse/core";
import router from "@/router";
import { getLocale } from "@/utils";
import { TIMEOUT } from "@/constants";

const fetchAPI = createFetch({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  options: {
    timeout: TIMEOUT.API,
    async beforeFetch({ options }) {
      const { getToken } = useUserStore();
      const token = getToken();
      options.headers = {
        ...options.headers,
        token: token || "",
        // 添加语言
        lang: getLocale(),
      };

      return { options };
    },
    async afterFetch(ctx) {
      if (ctx.data && ctx.data.code !== 0) {
        // const message = window.$message;
        // message.error(ctx.data.msg);

        if (ctx.data.code === 999) {
          router.replace("/login");
        }
        const customError = new Error(ctx.data.msg);
        throw customError;
      }
      ctx.data = ctx.data.data || {};
      return ctx;
    }
  },
  fetchOptions: {
    mode: "cors",
  },
});

function fetchAPIWithArgs(fetchAPI, url, ...args) {
  if (!args.length) {
    return fetchAPI(url);
  } else if (args.length === 1) {
    const [arg0] = args;
    return fetchAPI(url, arg0);
  } else {
    const [arg0, arg1] = args;
    return fetchAPI(url, arg0, arg1);
  }
}

function omitNil(obj) {
  const entries = Array.from(obj.entries()).filter(([_, value]) => {
    if (value === null || value === undefined || value === "null") return false;
    if (value.trim() === "") return false;
    return true;
  });
  return new URLSearchParams(entries);
}

export function createApi(baseUrl) {
  return (url, ...args) => {
    const _url = computed(() => {
      return `${toValue(baseUrl)}/${toValue(url)}`.replace(/\/+/g, "/");
    });
    return fetchAPIWithArgs(useApi, _url, ...args);
  };
}

export function useApi(url, ...args) {
  function setGetMethod() {
    return (payload) => {
      const fullURL = computed(() => {
        const params = toValue(payload);
        const newParams = omitNil(new URLSearchParams(params)).toString();
        return newParams ? [toValue(url), newParams].join("?") : toValue(url);
      });
      return fetchAPIWithArgs(fetchAPI, fullURL, ...args).get();
    };
  }

  function setMethod(method) {
    return (payload, type) => {
      return fetchAPIWithArgs(fetchAPI, url, ...args)[method.toLowerCase()](
        payload,
        type
      );
    };
  }

  const shell = {
    get: setGetMethod(),
    post: setMethod("POST"),
    put: setMethod("PUT"),
    delete: setMethod("DELETE"),
    patch: setMethod("PATCH"),
    head: setMethod("HEAD"),
    options: setMethod("OPTIONS"),
  };

  return shell;
}
