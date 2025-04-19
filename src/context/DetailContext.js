import { createContext, useState } from "react";

export const DetailContext = createContext();

export default function DetailProvider({ children }) {
  const [details, setDetails] = useState(null);
}
