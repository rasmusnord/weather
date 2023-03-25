import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

export interface TooltipState {
  x: number;
  y: number;
  text: string;
  visible: boolean;
}

interface TooltipContextValue {
  x: number;
  y: number;
  text: string;
  visible: boolean;
  setX: Dispatch<SetStateAction<number>>;
  setY: Dispatch<SetStateAction<number>>;
  setText: Dispatch<SetStateAction<string>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const TooltipContext = createContext<TooltipContextValue>(
  {} as TooltipContextValue
);

export const useTooltipContext = () => useContext(TooltipContext);

export function TooltipProvider(props: PropsWithChildren) {
  const { children } = props;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);

  const value: TooltipContextValue = {
    x,
    y,
    text,
    visible,
    setX,
    setY,
    setText,
    setVisible,
  };

  return (
    <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
  );
}
