// import Image from "next/image";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />   
      <div className="container">
      <h1 className="title has-text-centered">Bienvenido a Nuestro Portal de Mentorías</h1>
      <h2 className="subtitle has-text-centered">Explora nuestras mentorías y artículos de interés</h2>

      <div className="columns is-multiline">
        {/* Columna 1 */}
        <div className="column is-one-third">
          <div className="box">
            <h3 className="title is-4">Mentoría en Desarrollo Web</h3>
            <img src="https://via.placeholder.com/150" alt="Desarrollo Web" />
            <p>Aprende a crear aplicaciones web modernas utilizando tecnologías como React y Next.js.</p>
          </div>
        </div>

        {/* Columna 2 */}
        <div className="column is-one-third">
          <div className="box">
            <h3 className="title is-4">Mentoría en Marketing Digital</h3>
            <img src="https://via.placeholder.com/150" alt="Marketing Digital" />
            <p>Descubre las mejores estrategias para impulsar tu negocio en línea.</p>
          </div>
        </div>

        {/* Columna 3 */}
        <div className="column is-one-third">
          <div className="box">
            <h3 className="title is-4">Mentoría en Diseño Gráfico</h3>
            <img src="https://via.placeholder.com/150" alt="Diseño Gráfico" />
            <p>Mejora tus habilidades de diseño y aprende a utilizar herramientas como Photoshop e Illustrator.</p>
          </div>
        </div>
      </div>

      <div className="notification is-info has-text-centered">
        <h3 className="title is-5">Artículo de Interés</h3>
        <p>¿Quieres aprender más sobre desarrollo web? Lee nuestro artículo sobre las últimas tendencias en tecnología.</p>
        <a href="https://hbr-org.translate.goog/2022/01/the-best-mentorships-help-both-people-grow?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc" className="button is-primary">Leer Artículo</a>
      </div>
    </div>  
    </div>
  );
}
