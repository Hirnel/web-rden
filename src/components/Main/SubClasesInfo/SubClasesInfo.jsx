import React from "react";
import "../../../styles/components/_SubClasesInfo.scss";

const SubClasesInfo = () => {
  return (
    <div className="sub-clases-info">
      <h2>Información de Subclases, cómo funcionan:</h2>

      <section>
        <h3>¿Qué es una Subclase?</h3>
        <p>
          En Érden, las clases se dividen entre las 11 que has visto anteriormente; estas son las 11 clases originales. Para que las clases no se repitieran y no fueran
          repetitivas y monótonas, se nos ocurrió la idea de que una misma clase pudiera desbloquear dinámicas distintas con subclases.
        </p>

        <p>
          Pongamos un ejemplo: quieres investigar las virtudes de ser un Paladín, así que eliges esta clase. Pero eso solo es el inicio. La clase Paladín tiene diversas
          subclases: <strong>Elevado de la Justicia</strong>, <strong>Escudo de la Fe</strong>, <strong>Justicar del Vacío</strong>, <strong>Paladín Guerrero</strong> y <strong>Uno con lo Sagrado</strong>.
          Al elegir una de estas subclases, determinas el camino que tu personaje seguirá durante su historia.
        </p>

        <p>
          Es importante investigar sobre los talentos de cada clase porque puedes ser clase Paladín y tener 1 punto en <strong>Elevado de la Justicia</strong>, y al nivel 3,
          poner otro punto en <strong>Uno con lo Sagrado</strong>. Cada subclase tiene su rama de talentos, lo cual hace que sea extremadamente difícil repetir personajes,
          incluso si llevas jugando mucho tiempo.
        </p>


      </section>

      <section>
        <h3>Puntos de Gloria</h3>
        <p>
          Desbloqueas un <strong>Punto de Gloria</strong> a los niveles <strong>1, 3, 5, 7, 9, 12, 15, 17, 19 y 20</strong>.
        </p>
        <p>
          Puedes obtener hasta <strong>6 Puntos de Gloria extras</strong>. Además, el resto de jugadores en la mesa puede otorgarte hasta 3 puntos por unanimidad, mientras que el máster tiene la capacidad de brindarte otros 3. Estos puntos están diseñados para recompensar el esfuerzo adicional y la creatividad dentro y fuera del juego.
        </p>

        <p>
          Por ejemplo, la mesa puede otorgarte Puntos de Gloria por proponer grandes ideas que ayuden a resolver conflictos o avanzar la trama, por destacar en la interpretación de tu personaje al rolear, o por realizar un trabajo de investigación fuera de la partida. Este último podría incluir crear teorías sobre la historia, vincular detalles previamente explorados o aportar contenido que enriquezca la narrativa y haga la experiencia más inmersiva para todos.
        </p>

        <p>
          El sistema de Puntos de Gloria fomenta la colaboración y el compromiso entre los jugadores, reconociendo aquellas acciones que no solo mejoran el desarrollo individual, sino también la experiencia grupal. Es una forma de incentivar la creatividad y el entusiasmo dentro del mundo de Érden.
        </p>

      </section>

      <section>
        <h3>Poder Interno</h3>
        <p>
          Ahora obtienes una característica que se llama <strong>Poder Interno</strong>. Esta característica te indica cuántos
          usos disponibles tienes para usar tus <strong>Talentos Activos</strong>.
        </p>
        <table>
          <thead>
            <tr>
              <th>Nivel de Personaje</th>
              <th>Usos por Día</th>
              <th>Nivel de Personaje</th>
              <th>Usos por Día</th>
            </tr>
          </thead>
          <tbody>
            {[
              [1, 2, 11, 22],
              [2, 4, 12, 24],
              [3, 6, 13, 26],
              [4, 8, 14, 28],
              [5, 10, 15, 30],
              [6, 12, 16, 32],
              [7, 14, 17, 34],
              [8, 16, 18, 36],
              [9, 18, 19, 38],
              [10, 20, 20, 40],
            ].map(([lvl1, use1, lvl2, use2]) => (
              <tr key={lvl1}>
                <td>{`Nivel ${lvl1}`}</td>
                <td>{`${use1} usos/día`}</td>
                <td>{`Nivel ${lvl2}`}</td>
                <td>{`${use2} usos/día`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Por cada uso que exceda tu límite de <strong>Poder Interno</strong>, obtienes un punto de <strong>Fatiga</strong>.
        </p>
      </section>

      <section>
        <h3>Fatiga</h3>
        <p>
          Algunas habilidades especiales y peligros del entorno, como el hambre y las altas o bajas temperaturas,
          pueden llevar a una condición especial llamada <strong>Fatiga</strong>. La condición fatiga está dividida en 6 niveles.
        </p>
        <table>
          <thead>
            <tr>
              <th>Nivel</th>
              <th>Efecto</th>
            </tr>
          </thead>
          <tbody>
            {[
              [1, "Desventaja en las pruebas de característica."],
              [2, "Movimiento reducido a la mitad."],
              [3, "Desventaja en tiradas de ataque y de salvación."],
              [4, "Puntos de Golpe totales reducidos a la mitad."],
              [5, "Movimiento reducido a 0."],
              [6, "Muerte."],
            ].map(([level, effect]) => (
              <tr key={level}>
                <td>{`Nivel ${level}`}</td>
                <td>{effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Si una criatura que ya sufre la condición fatiga, es afectada por otro efecto que cause la misma condición,
          su nivel actual de fatiga se incrementa por la cantidad indicada en la descripción del efecto.
        </p>
        <p>
          Una criatura fatigada sufre la penalización de su respectivo nivel de fatiga y también la de los anteriores.
          Por ejemplo, una criatura que sufre de la condición fatiga en el grado 2 reducirá su movimiento a la mitad y
          también tendrá desventaja en las pruebas de característica.
        </p>
        <p>
          Un efecto que remueva la condición fatiga reducirá en la criatura la cantidad de grados de fatiga especificada
          por el efecto. Para que todos los efectos de la condición terminen, el grado de fatiga de la criatura debe ser
          reducido a 0. Terminar un descanso prolongado reduce en 1 grado el nivel de fatiga de la criatura, siempre y
          cuando esta haya comido y bebido algo.
        </p>
      </section>

    </div>
  );
};

export default SubClasesInfo;
