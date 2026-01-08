type HeaderCounterProps = {
  current: number;
  total: number;
};

export function HeaderCounter({ current, total }: HeaderCounterProps) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2">
      <span className="badge">
        Jogador {current} de {total}
      </span>
    </div>
  );
}
