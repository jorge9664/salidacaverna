import { useEffect } from "react";

export const AdBlockFinal = () => {
  useEffect(() => {
    try {
      // Inicializa el bloque de anuncio cuando el componente se monta en la web
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error) {
      console.error("Error cargando el anuncio final:", error);
    }
  }, []);

  return (
    <div style={{ margin: "30px 0", textAlign: "center", minHeight: "250px", width: "100%" }}>
      <span style={{ display: "block", fontSize: "10px", color: "#aaa", marginBottom: "5px" }}>
        Anuncio
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6699785884452303"
        data-ad-slot="6827381387"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
