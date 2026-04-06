import Image from "next/image";

const MENSAJE = "CALAVERA NO CHILLA";
const REPETICIONES_POR_SECUENCIA = 4;

type MarqueeSequenceProps = {
  ariaHidden?: boolean;
};

function MarqueeSequence({ ariaHidden = false }: MarqueeSequenceProps) {
  return (
    <div aria-hidden={ariaHidden} className="coral-marquee-sequence">
      <div className="coral-marquee-item">
        {Array.from({ length: REPETICIONES_POR_SECUENCIA }).map((_, indice) => (
          <span key={`segmento-${indice}`} className="coral-marquee-segment">
            <span className="font-coralbold coral-marquee-text">{MENSAJE}</span>
            <Image
              alt=""
              aria-hidden="true"
              className="coral-marquee-icon"
              height={96}
              src="/Isologo_Blanco.png"
              width={96}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export function CoralMarquee() {
  return (
    <section aria-label="Calavera no chilla" className="coral-marquee">
      <div className="coral-marquee-track">
        <MarqueeSequence />
        <MarqueeSequence ariaHidden />
      </div>
    </section>
  );
}
