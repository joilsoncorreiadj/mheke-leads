
export default function ExplanationSection({ onContinue }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-2 lg:px-4">
      <div className="text-center max-w-3xl mx-auto">
        <div className="card-modern px-2 lg:px-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Sabemos que cada marca tem uma{' '}
            <span className="text-highlight">história única</span> — por isso, cada análise também precisa ser{' '}
            <span className="text-highlight">personalizada</span>.
          </h2>

          <div className="space-y-4 px-2 lg:px-4 text-base lg:text-lg text-muted mb-8">
            <p>
              <strong className="text-foreground">Importante:</strong><br className="block lg:hidden"/> Esta inscrição não garante a sua análise gratuita.
            {/* </p>
            <p> */}
              Selecionamos os perfis com base no <span className="text-highlight">potencial de crescimento</span>, momento do negócio e fit com os nossos serviços.
            {/* </p>
            <p> */}
              Mas só de estar aqui, você já deu um passo à frente.
            </p>
          </div>

          <button
            onClick={onContinue}
            className="btn-primary text-base"
          >
            Continuar
          </button>
        </div>
      </div>
    </section>
  );
}