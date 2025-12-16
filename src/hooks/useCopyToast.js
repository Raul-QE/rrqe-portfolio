import { useState } from "react";

export function useCopyToast() {
  const [toast, setToast] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  function showCopyToast(text, event) {
    const { clientX, clientY } = event;

    setToast({
      visible: true,
      x: clientX,
      y: clientY,
      text,
    });

    setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 1200);
  }

  return { toast, showCopyToast };
}