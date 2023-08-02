type Options = {
  callback?: () => void;
  props: Record<string, string | number>;
};
interface Window {
  plausible: (event: "addFox" | "removeFox", options?: Options) => void;
}
