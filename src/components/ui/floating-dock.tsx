import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { CoolMode } from "./cool-mode";

type FloatinDockItemsType = {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export const FloatingDock = ({
  items,
  className,
  setTheme,
  theme,
}: {
  items: FloatinDockItemsType[];
  className?: string;
  setTheme: () => void;
  theme?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop
        items={items}
        className={className}
        setTheme={setTheme}
        theme={theme}
      />
    </>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  setTheme,
  theme,
}: {
  items: FloatinDockItemsType[];
  className?: string;
  setTheme: () => void;
  theme?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex gap-2 h-16 md:gap-4 items-end rounded-2xl bg-neutral-100 dark:bg-neutral-900 px-4 pb-3 z-40",
        className
      )}
    >
      <>
        {items.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}

        <IconContainer
          mouseX={mouseX}
          key={"theme"}
          icon={theme === "light" ? <IconMoon /> : <IconSun />}
          title="Theme"
          onClick={setTheme}
        />
      </>
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <>
      {onClick ? (
        <button onClick={onClick}>
          <motion.div
            ref={ref}
            style={{ width, height }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="aspect-square rounded-full bg-neutral-300 dark:bg-neutral-800 flex items-center justify-center relative"
          >
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 2, x: "-50%" }}
                  className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -bottom-10 w-fit text-xs"
                >
                  {title}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              style={{ width: widthIcon, height: heightIcon }}
              className="flex items-center justify-center"
            >
              {icon}
            </motion.div>
          </motion.div>
        </button>
      ) : (
        <>
          {!!href && (
            <CoolMode>
              <Link href={href} target={`${href === "#" ? "_self" : "_blank"}`}>
                <motion.div
                  ref={ref}
                  style={{ width, height }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className="aspect-square rounded-full bg-neutral-300 dark:bg-neutral-800 flex items-center justify-center relative"
                >
                  <AnimatePresence>
                    {hovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 2, x: "-50%" }}
                        className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -bottom-10 w-fit text-xs"
                      >
                        {title}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center"
                  >
                    {icon}
                  </motion.div>
                </motion.div>
              </Link>
            </CoolMode>
          )}
        </>
      )}
    </>
  );
}
