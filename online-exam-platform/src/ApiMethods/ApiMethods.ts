async function get(url: String) {
  try {
    const res = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
    return await res.json();
  } catch (error) {
    throw error;
  }
}

async function post(url: string, body: any): Promise<any> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return { status: res.status, ok: res.ok, data };

  } catch (error) {
    console.error("Error in POST request:", error);
    return { status: 0, ok: false, data: null, error };
  }
}


async function update(url:String, body:any) {
  try {
    const res = await fetch(`${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Update ${url} failed: ${res.status}`);
    return await res.json();
  } catch (error) {
    throw error;
  }
}

async function del(url:String) {
  try {
    const res = await fetch(`${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error(`DELETE ${url} failed: ${res.status}`);
    return await res.json();
  } catch (error) {
    throw error;
  }
}
const ApiMethods = { get, post, update, del }
export default ApiMethods;
