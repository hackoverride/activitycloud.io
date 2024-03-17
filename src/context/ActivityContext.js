import { createContext } from "react";

const ActivityContext = createContext({});

export const ActivityHubProvider = ActivityContext.Provider;

export default ActivityContext;
