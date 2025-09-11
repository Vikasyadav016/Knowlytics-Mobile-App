
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

// async function post(url:String, body:any) {
//   try {
//     const res = await fetch(`${url}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });
//     if (!res.ok) return await res
//     return await res.json();
//   } catch (error) {
//     console.log("err",error)
//     throw error;
//   }
// }

async function post(url: string, body: any): Promise<any> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Always try to parse JSON response
    const data = await res.json();

    // Return object with status and data so caller can handle errors
    return { status: res.status, ok: res.ok, data };

  } catch (error) {
    console.error("Error in POST request:", error);
    // Return error info instead of throwing
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
