export const helpHttp = () => {
    const customFetch = async (endpoint, options,multiPart=false ) => {
        const defaultHeaders =multiPart?{}: {
          //  accept: "application/json"
            'Content-Type': 'application/json'
        };
        const controller = new AbortController();
        options.signal = controller.signal;

        options.method = options.method || "GET";
        options.headers = options.headers ? {
            ...defaultHeaders,
            ...options.headers
        } : defaultHeaders;

        if (multiPart) { 
        }else{
            options.body = JSON.stringify(options.body) || false;
        }
        if (!options.body) delete options.body;
      //  console.log(options);
        setTimeout(() => { 
            controller.abort()
        }, 10000);
        try {
            const res = await fetch(endpoint, options);
            let data = "", status = res.status || '00';

            if (!res.ok) {
                data = await res.text().then(text => text);
            }
            return await (res.ok ? res.json() : Promise.reject(
                {
                    err: true,
                    status,
                    statusText: res.statusText || "An error occurred",
                    error_text: status == 401 || status >= 500 ? res.statusText : Object.values(JSON.parse(data)).toString().replace(',', '')
                }
            ));
        } catch (err) {
            return err.hasOwnProperty('err') ? err :
                {
                    err: true,
                    status: err.status || '00',
                    statusText: err.statusText || "An error occurred",
                    error_text: err.message
                };
        }
    }
    const get = (url, options = {},multiPart=false) => customFetch(url, options,multiPart)
    const post = (url, options = {},multiPart=false) => {
        options.method="POST";
        return customFetch(url, options,multiPart)
    }
    const put = (url, options = {},multiPart=false) => {
        options.method="PUT";
        return customFetch(url, options,multiPart)
    }
    const del = (url, options = {},multiPart=false) => {
        options.method="DELETE";
        return customFetch(url, options,multiPart)
    }

    return {
        get,
        post,
        put,
        del
    }
}