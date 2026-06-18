import logo from "@/assets/logo.png";

const MaintenanceScreen = ({ message }: { message?: string | null }) => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
    <img src={logo} alt="La salida de la caverna" className="w-24 h-24 mb-8 object-contain" />
    <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
      Volvemos pronto
    </h1>
    <p className="text-muted-foreground max-w-md text-lg">
      {message || "Estamos haciendo mejoras. Vuelve en un momento."}
    </p>
  </div>
);

export default MaintenanceScreen;