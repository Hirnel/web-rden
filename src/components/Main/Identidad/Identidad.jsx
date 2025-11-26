import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/components/_Identidad.scss";


const Identidad = () => {
  return (
    <section className="identidad" aria-labelledby="identidad-title">
      {/* HERO */}
      <div className="identidad__hero">
        <div className="identidad__hero-bg" aria-hidden="true" />
        <div className="identidad__hero-content">
          <span className="identidad__ribbon">The Continent of Érden</span>
          <h2 id="identidad-title" className="identidad__title">¿Quiénes somos?</h2>
          <p className="identidad__subtitle">
            En Érden, somos un grupo de entusiastas dedicados a la creación de un mundo rico y envolvente. Amantes de los detalles, la coherencia y la profundidad 
            narrativa, vivimos en un mundo en el que los limites lo marcan la biologia especulativa, la fisica ajustada a nuestras leyes y todo te lo contamos a través 
            de nuestros juegos de rol y proyectos creativos. Ya sean cuentos, salmos, juegos de mesa o cualquier forma que encontremos para compartirlo.
          </p>
          <div className="identidad__cta">
            <a className="btn btn--primary" href="#vision">Conoce la visión</a>
            <a className="btn btn--ghost" href="#cronologia">Cronología</a>
          </div>
        </div>
      </div>

      {/* INTRO */}
      <div className="identidad__intro" id="vision">
        <p className="lead">
          Érden es un universo de frecuencias, resonancias y mitologías antiguas. El azul profundo representa a Omnes; el morado, un legado exiliado. 
          ¿El resto de colores? Creemos que es mejor descubras tú mismo el significado de cada uno. 
          Nuestra misión es ofrecer un espacio donde la fantasía y la ciencia se entrelazan para contar historias inolvidables.
        </p>
      </div>

      {/* GRID DE VALORES */}
      <ul className="identidad__grid">
        <li className="identidad__card">
          <div className="identidad__card-medallon" aria-hidden="true" />
          <h3 className="identidad__card-title">Mundo vivo:</h3>
          <p className="identidad__card-text">Religiones y dogmas, culturas, leyendas, folklore, idiomas, historia, biología, flora y fauna, mapas. Buscamos crear un universo rico, inmersivo y detallado.</p>
        </li>
        <li className="identidad__card">
          <div className="identidad__card-medallon" aria-hidden="true" />
          <h3 className="identidad__card-title">Lo conocido como Magia:</h3>
          <p className="identidad__card-text">Nerkia; esa propiedad que tiene todo lo creado por la mano de Omnes. Basada en frecuencia: plausible, coherente y bella. A veces simple, a veces compleja.</p>
        </li>
        <li className="identidad__card">
          <div className="identidad__card-medallon" aria-hidden="true" />
          <h3 className="identidad__card-title">Historia oculta:</h3>
          <p className="identidad__card-text">Lo olvidado regresa como señal para los curiosos. Trozos de historia escondidos en textos, en conversaciones, en verdades o incluso dentro de mentiras. </p>
        </li>








        <li className="identidad__card identidad__card--action">
            <div className="identidad__card-medallon" aria-hidden="true" />
            <h3 className="identidad__card-title">Calendario</h3>
            <p className="identidad__card-text">
            Pulsa aquí y consulta el calendario de Érden, aquí podrás encontrar la equivalencia
            para saber tu fecha de nacimiento y descubrir más sobre quien podrías ser.
            </p>

            <Link to="/calendario" className="stretched-link" aria-label="Abrir Calendario Grilihim" />
        </li>




      </ul>

      {/* CITA / LORE */}
      <figure className="identidad__quote">
        <blockquote>

            <p>
            <h4>Salmo a Hirnel de una misa.</h4>
            </p>

            <p>
            "En la perenne luz del Sol Negro, Hirnel, hallamos el fulgor que guía nuestros pasos en la penumbra.
            Oh, excelso Hirnel, donador del buen hacer, tu esplendor bendice nuestros días y aclara los senderos en los tiempos de incertidumbre. 
            Tú eres el guardián de nuestros corazones, el custodio de nuestras almas, y en ti hallamos refugio y fortaleza.
            </p>
            
            <p>
            Sin embargo, en las profundidades de la sombra, yace la oscuridad, el abismo de la incertidumbre. Allí, los susurros de la tentación y el miedo acechan,
            desafiando la fe de los Caminantes del Sol en la eterna luz de Hirnel. ¿Cómo enfrentar los dictados del destino cuando la sombra amenaza con engullir
            nuestras almas?
            </p>
            
            <p>
            ¡Oh, Hirnel, deidad del Sol Negro, escucha nuestras plegarias y derrama tu gracia sobre aquellos que te buscan con fervor! Otorga a tus seguidores la fuerza 
            para resistir la seducción de la oscuridad y la sabiduría para discernir el auténtico sendero hacia la verdad y la justicia.
            </p>
            
            <p>
            En el sempiterno conflicto entre la luz y la sombra, en la pugna entre el bien y el mal, nos vemos desorientados y perdidos. ¿Cuál es el propósito de nuestra
            existencia en este vasto cosmos? ¿Somos meras marionetas en manos de fuerzas más allá de nuestra comprensión, o aguarda un destino majestuoso?
            </p>
            
            <p>
            Gloria a ti, Hirnel, deidad del Sol Negro, por los tiempos sin fin. Que tu luminiscencia perdure, dando así a nuestros corazones para colmarlos en nuestras vidas con tu bendición eterna. Así sea".
           </p>
            
        </blockquote>
        <figcaption>— “Entrada al Salmo de Albahal 23.86”</figcaption>
      </figure>

      {/* CRONO MINI */}
      <div className="identidad__timeline" id="cronologia" aria-label="Cronología breve">
        <div className="identidad__timeline-line" />
        <ol className="identidad__timeline-items">
          <li className="identidad__timeline-item">
            <span className="identidad__pill">Origen</span>
            <p>Nace Todo y Él lo ordena. Érden es el jardín favorito de Omnes y el lugar donde Todo comienza.</p>
          </li>
          <li className="identidad__timeline-item">
            <span className="identidad__pill">Eras</span>
            <p>Después de un tiempo incontable, todo sucumbe ante el deseo de Él. 15.000 años de historia y al final, todo cambia. Ahora los dioses peligran con ser olvidados.</p>
          </li>
          <li className="identidad__timeline-item">
            <span className="identidad__pill">Presente</span>
            <p>Lo que durmió durante milenios ahora despierta. Nuevos tiempos, nuevos ciclos, nuevas eras, nuevos poderes resuenan con la frecuencia que Omnes dejó atrás.</p>
          </li>
        </ol>
      </div>
        

      <div>
        {/* Espaciador final */}
        <div style={{ height: "100px" }} aria-hidden="true" />
      </div>
    </section>
  );

 
};

export default Identidad;
