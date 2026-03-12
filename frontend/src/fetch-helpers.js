export const getTodos = async () => {
  try {
    const response = await fetch('/api/todos');
    if (!response.ok) throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const createTodo = async (task) => {
  try {
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    };
    const response = await fetch('/api/todos', config);
    if (!response.ok) throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const updateTodo = async (id, changes) => {
  try {
    const config = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes),
    };
    const response = await fetch(`/api/todos/${id}`, config);
    if (!response.ok) throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const deleteTodo = async (id) => {
  try {
    const config = { method: 'DELETE' };
    const response = await fetch(`/api/todos/${id}`, config);
    if (!response.ok) throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    return { data: true, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
