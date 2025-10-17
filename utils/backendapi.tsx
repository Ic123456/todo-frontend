
import api from "@/utils/apiClient";


const APIURL = "/api/api/";


interface Tag {
  id?: number;
  name?: string;
  color?: string;
}

// one function for all operations
export const handleTag = async (
  method: "get" | "post" | "put" | "delete",
  data?: Tag
) => {
  try {
    let res;

    if (method === "get") {
      res = await api.get(`${APIURL}tag`);
    } else if (method === "post") {
      res = await api.post(`${APIURL}tag`, {
        name: data?.name,
        color: data?.color,
      });
    } else if (method === "put") {
      if (!data?.id) throw new Error("Missing tag ID for update");
      res = await api.put(`${APIURL}tag/${data.id}/`, {
        name: data?.name,
        color: data?.color,
      });
    } else if (method === "delete") {
      if (!data?.id) throw new Error("Missing tag ID for delete");
      res = await api.delete(`${APIURL}tag/${data.id}/`);
    }

    return res?.data;
  } catch (err) {
  }
};

interface Todo {
  id?: number;
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  tags?: number[];
  completed?: boolean;
  week?: number
}

export const handleTodo = async (
  method: "get" | "post" | "patch" | "delete",
  data?: Todo
) => {
  try {
    let res;

    if (method === "get") {
      res = await api.get(`${APIURL}todo`);
    } else if (method === "post") {
      res = await api.post(`${APIURL}todo`, {
        title: data?.title,
        description: data?.description,
        date: data?.date,
        time: data?.time,
        tags: data?.tags,
        completed: data?.completed,
        week: data?.week
      });
    } else if (method === "patch") {
      if (!data?.id) throw new Error("Missing tag ID for update");
      res = await api.patch(`${APIURL}todo/${data.id}/`, {
        id: data?.id,
        title: data?.title,
        description: data?.description,
        time: data?.time,
        tags: data?.tags,
        completed: data?.completed,
      });
    } else if (method === "delete") {
      if (!data?.id) throw new Error("Missing tag ID for delete");
      res = await api.delete(`${APIURL}todo/${data.id}/`);
    }

    return res?.data;
  } catch (err) {
    throw err;
  }
};

interface TemplateTodo {
  id?: number;
  title: string;
  description?: string;
  time?: string; 
  tags?: number[];
  completed?: boolean;
}

interface Template {
  id?: number;
  name?: string;
  template_todos?: TemplateTodo[];
  date?: string;
}



export const handleTemplate = async (
  method: "get" | "post" | "patch" | "delete",
  data?: Template
) => {
  try {
    let res;

    if (method === "get") {
      res = await api.get(`${APIURL}applycurrenttemplate`);
    } else if (method === "post") {
      res = await api.post(`${APIURL}applycurrenttemplate`, {
        name: data?.name,
        date: data?.date,
      });
    } else if (method === "patch") {
      if (!data?.id) throw new Error("Missing tag ID for update");
      res = await api.patch(`${APIURL}template/${data.id}/`, {
        id: data?.id,
        name: data?.name,
        template_todos: data?.template_todos,
      });
    } else if (method === "delete") {
      if (!data?.id) throw new Error("Missing tag ID for delete");
      res = await api.delete(`${APIURL}template/${data.id}/`);
    }

    return res?.data;
  } catch (err) {
  }
};