import { motion as m } from "framer-motion";

export const Main: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <m.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {props.children}
    </m.main>
  );
};

export default Main;
