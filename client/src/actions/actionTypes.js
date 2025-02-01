export const SET_HEADER = "SET_HEADER";
export const SET_LINKS = "SET_LINKS";

export const setHeader = (header) => ({
  type: SET_HEADER,
  payload: header,
});

export const setLinks = (links) => ({
  type: SET_LINKS,
  payload: links,
});

