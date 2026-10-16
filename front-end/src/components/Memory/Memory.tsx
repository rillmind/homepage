import { useRam } from "./useRam";

export default function Memory() {
  const mem = useRam();

  if (mem === null) {
    return <>Carregando...</>;
  }

  const porcent = (mem.usadoGB / mem.totalGB) * 100;

  return (
    <>
      {mem.usadoGB.toFixed(1)}
      {"\n"}
      {porcent.toFixed(0)}%
    </>
  );
}
