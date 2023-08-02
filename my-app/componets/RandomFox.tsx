// import type { FunctionComponent, FC } from "react";
// export const RandomFox = () => {
//   return <img />;
// };
// export const RandomFox2: FunctionComponent = () => {
//   return <img />;
// };
// export const RandomFox3: FC = () => {
//   return <img />;
// };
import { useEffect, useRef, useState } from "react";
import { ImgHTMLAttributes } from "react";
import "../app/globals.css";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  onLazyLoad?: (node: HTMLImageElement) => void;
}
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNative;
export const LazyImage = ({
  src,
  alt,
  onLazyLoad,
  ...imgProps
}: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );
  useEffect(() => {
    //nuevo observdor
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSrc(src);
          onLazyLoad && onLazyLoad(entry.target as HTMLImageElement);
          observer.unobserve(entry.target);
        }
      });
    });

    // observer node
    if (node.current) {
      observer.observe(node.current);
    }
    //desconectar
    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <img
      ref={node}
      // width={320}
      // height="auto"
      src={currentSrc}
      alt={alt}
      // className="bg-gray-400 rounded-3xl"
      {...imgProps}
    />
  );
};
//una funcion( callback) cuyo primer argumento es un nodo del DOM tipo imagen y que no retirna nada (void)
