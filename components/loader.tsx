/**
 * Componente Loader.
 * @component
 * @example
 * import { Loader } from "@/components/Loader"
 *
 * function App() {
 *   return <Loader />
 * }
 */
export function Loader() {
  return (
    <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-primary" />
  );
}
