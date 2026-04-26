import { useState } from "react";

export const useAddItem = () => {
  const [localItems, setLocalItems] = useState([]);

  const addItem = (item) => {
    // Əgər element artıq siyahıda yoxdursa əlavə et
    setLocalItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  return { localItems, addItem };
};