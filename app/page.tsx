import Hero from "@/app/components/home/Hero";
import RosalesDestacados from "@/app/components/home/RosalesDestacados";
import NuestrasPlantas from "@/app/components/home/NuestrasPlantas";
import PaisajismoTeaser from "@/app/components/home/PaisajismoTeaser";
import SobreNosotrosTeaser from "@/app/components/home/SobreNosotrosTeaser";
import ContactoTeaser from "@/app/components/home/ContactoTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RosalesDestacados />
      <NuestrasPlantas />
      <PaisajismoTeaser />
      <SobreNosotrosTeaser />
      <ContactoTeaser />
    </>
  );
}
