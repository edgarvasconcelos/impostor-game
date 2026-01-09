type ScreenProps = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  onBack?: () => void;
};

export function Screen({
  header,
  footer,
  children,
  onBack
}: ScreenProps) {
  return (
    <div className="h-screen w-screen bg-slate-900 text-white flex justify-center">
      <div className="w-full max-w-md h-full flex flex-col">
        {/* HEADER */}
        {header && (
          <div className="pt-6 pb-4 px-4 flex items-center gap-3">

            {/* BOTÃO VOLTAR */}
            {onBack && (
              <button
                onClick={onBack}
                className="text-white text-3xl font-semibold active:scale-90 transition-transform"
                aria-label="Voltar"
              >
                &lt;
              </button>
            )}

            {/* CONTEÚDO DO HEADER */}
            <div className="flex-1 text-center">
              {header}
            </div>

            {/* ESPAÇADOR DIREITO */}
            {onBack && <div className="w-6" />}
          </div>
        )}

        {/* CONTEÚDO SCROLLÁVEL */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
          {children}
        </div>

        {/* FOOTER FIXO */}
        {footer && (
          <div className="pb-6 px-4 border-t border-white/10">
            {footer}
          </div>
        )}

      </div>
    </div>
  );
}
