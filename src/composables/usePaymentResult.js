export function usePaymentResult() {
  const router = useRouter();

  const { query } = useRoute();

  function getResultUrl(options) {
    const { oid = query.oid, from = query.from, method = query.method, stringify = false } = options;
    if (stringify) {
      const url = new URL("/payment/result", window.location.origin);
      oid && url.searchParams.set("oid", oid);
      from && url.searchParams.set("from", from);
      method && url.searchParams.set("method", method);
      return url.toString();
    }

    return {
      path: "/payment/result",
      query: {
        oid,
        from,
        method,
      },
    };
  }

  function success({ oid, from, method }) {
    router.replace(getResultUrl({
      oid,
      from,
      method,
    }));
  }

  function fail({ oid, from, cancel, timeout }) {
    router.replace({
      path: "/payment/result",
      query: {
        oid,
        from,
        cancel,
        timeout,
      },
    });
  }

  return {
    success,
    fail,
    getResultUrl,
  };
}
