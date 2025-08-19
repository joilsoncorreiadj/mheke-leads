"use client";
import Lottie from 'lottie-react';
import confent from '@/assets/lottiefiles/confetes-2.json';
import { useRef } from 'react';

export default function ThankYouSection({ onRestart }) {
  const lottieRef = useRef();

  return (
    <section className="min-h-screen flex items-center justify-center px-2 lg:px-4 relative">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 pointer-events-none">
        <Lottie
          lottieRef={lottieRef}
          animationData={confent}
          loop={false}
          autoplay={true}
          className="w-full h-full z-30"
        />
      </div>

      <div className="relative">
        <div className="text-center max-w-3xl mx-auto relative z-20">
          <div className="card-modern">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Parabéns por dar o primeiro passo rumo ao{' '}
                <span className="text-highlight">sucesso da sua marca</span>!
              </h2>
            </div>

            <div className="space-y-4 text-lg text-muted mb-8">
              <p>
                Recebemos um grande volume de inscrições, mas se o seu perfil for selecionado, entraremos em contato para agendar sua análise gratuita.
              </p>
              <p>
                Fique atenta ao seu <span className="text-highlight">WhatsApp</span> ou <span className="text-highlight">Instagram</span> — sua jornada está prestes a dar um salto estratégico.
              </p>
              <p className="text-xl">
                Nos vemos em breve. 💻✨
              </p>
            </div>

            <button
              onClick={onRestart}
              className="btn-secondary cursor-pointer text-white"
            >
              Fazer Nova Análise
            </button>
          </div>
        </div>
      </div>
    </section>
  )

}
