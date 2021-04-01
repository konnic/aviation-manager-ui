const url = process.env.url || "http://localhost:8000";

export const getResource = async (path) => {
  const res = await fetch(`${url}${path}`);
  if (res.error) {
    console.error(res.error);
  } else return await res.json();
};

export const postResource = async (path, resource) => {
  const res = await fetch(`${url}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resource),
  });
  if (res.error) {
    console.error(res.error);
  } else return await res.json();
};

export const updateResource = async (path, resource) => {
  const res = await fetch(`${url}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resource),
  });
  if (res.error) {
    console.error(res.error);
  } else return await res.json();
};

export const deleteResource = async (path) => {
  const res = await fetch(`${url}${path}`, {
    method: "DELETE",
  });
  if (res.error) {
    console.error(res.error);
  }
};
