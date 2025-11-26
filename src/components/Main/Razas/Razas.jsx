import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/components/_Razas.scss";
import arquetipoImg from "../../../../public/Arquetipo.jpg";
import grilihimImg from "../../../../public/Grilihim.jpg";
import humanoImg from "../../../../public/Humano.jpg";
import maghutaImg from "../../../../public/Maghuta.jpg";
import temereImg from "../../../../public/Temere.jpg";
import tsunyaImg from "../../../../public/tsunya.jpg";
import yairaImg from "../../../../public/Yaira.jpg";

const Razas = () => {
  const navigate = useNavigate();

  // Información de las razas con sus rutas e imágenes
  const razas = [
    { nombre: "Arquetipo", ruta: "/razas/arquetipo", img: arquetipoImg },
    { nombre: "Grilihim", ruta: "/razas/grilihim", img: grilihimImg },
    { nombre: "Humano", ruta: "/razas/humano", img: humanoImg },
    { nombre: "Mag'huta", ruta: "/razas/maghuta", img: maghutaImg },
    { nombre: "Temere", ruta: "/razas/temere", img: temereImg },
    { nombre: "Tsunya", ruta: "/razas/tsunya", img: tsunyaImg },
    { nombre: "Yaira", ruta: "/razas/yaira", img: yairaImg },
  ];

  return (
    <div className="razas">
      <h2>Razas de Érden</h2>
      <div>
        <p>
          Existen los humanos originales de la creación que son llamados
          Arquetipos, Enanos reales o los actuales enanos se encuentran en
          diversas zonas del continente pero están agrupados al oeste en sus
          ciudades aisladas. Los humanos son el pueblo más común del continente
          y se extienden cada vez más como una plaga tomando todo lo que
          necesiten y se les antoje. Mag’huta, no-muertos que mantienen la
          personalidad de antes de morir, forjados con el poder de Veridium,
          Esposo de la muerte y patrón de la no-vida que pueden ser de cualquier
          raza anterior. Orcos, criaturas creadas por un Yaira para agonizar y
          sufrir durante su vida, castigados por haber nacido Arquetipos.
          Existen otros orcos que viven en la naturaleza y su piel es verde y
          su sangre blanca. Témeres, variantes de humanos que han evolucionado
          para aclimatarse al duro terreno del desierto. Tsunya, una raza que
          nadie sabe de dónde ha salido ni desde dónde han evolucionado, poseen
          costumbres muy antiguas e incluso bárbaricas, poco se saben de ellos
          puesto que sólo hacen vida dentro del Gran Fangal, los pocos Tsunyas
          que hay en el continente son esclavos y color morado son repudiados
          hasta entre ellos mismos. Los grandiosos Yaira, la raza summun que
          creó un antiguo dios exiliado y olvidado por casi todos en el mundo.
          Poderosos controladores de los elementos y vanidosos elitistas que
          están por encima de todo y todos. Hace pocos años despertaron de su
          éxtasis y han forjado un imperio que reclama lo que es suyo por
          herencia divina; Absolutamente todo.
        </p>
        <p>
          La raza que elijas no sólo afectará a tus aspectos como personaje
          jugador, si no que tambiÉn ayudará a crear una historia poderosa y
          contundente en este vasto universo. Cuando tomes la eleccion de tu
          raza y clase, esperamos que hayas tenido en cuenta que tipo de
          aventura quiere vivir, o mejor dicho, que tipo de aventura te puede
          tocar vivir. Este capítulo contiene una descripción de cada raza,
          aunque recuerda que puedes ser completamente retorcido y original a
          estas descripciones y crear personajes que se salgan de los moldes que
          hemos creado.
        </p>
      </div>

      <div className="atributos-raciales">
        <h3>Atributos Raciales</h3>
        <p>
          La descripción de cada raza incluye los atributos raciales que son
          comunes a los miembros de la misma. La mayoría de las razas contienen
          los siguientes apartados:
        </p>
        {/* Contenido adicional que no se modifica */}
      </div>

      <div className="razas-lista">
        {razas.map((raza, index) => (
          <div
            key={index}
            className="raza-item"
            onClick={() => navigate(raza.ruta)}
          >
            <img src={raza.img} alt={`Imagen de ${raza.nombre}`} />
            <span>{raza.nombre}</span>
          </div>
        ))}
      </div>

      <section className="comun-razas">
        <h2>Común a todas las razas</h2>
        <p>
          Todas las razas de Érden tienen un don con la magia por designio de Omnes. Todos nacen con el poder de la Telequinesis. Todas las razas comparten la siguiente tabla, el caso de los Magos, Druidas, Clérigos, Brujos y Chamanes es distinto.
        </p>
        <table>
          <thead>
            <tr>
              <th>Nivel</th>
              <th>Peso (Lb/Kg)</th>
              <th>Daño</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>5 Lb / 2,25 Kg</td>
              <td>1D4</td>
            </tr>
            <tr>
              <td>2</td>
              <td>7,5 Lb / 3,4 Kg</td>
              <td>1D6</td>
            </tr>
            <tr>
              <td>3</td>
              <td>10 Lb / 4,5 Kg</td>
              <td>1D8 + 1D4</td>
            </tr>
            <tr>
              <td>4</td>
              <td>12,5 Lb / 5,6 Kg</td>
              <td>1D8 + 2D4 + 1D6</td>
            </tr>
            <tr>
              <td>5</td>
              <td>15 Lb / 7 Kg</td>
              <td>1D8</td>
            </tr>
            <tr>
              <td>6</td>
              <td>15 Lb / 7 Kg</td>
              <td>1D8 + 1D4</td>
            </tr>
            <tr>
              <td>7</td>
              <td>20 Lb / 9 Kg</td>
              <td>1D8 + 1D4 + 1D6</td>
            </tr>
            <tr>
              <td>8</td>
              <td>25 Lb / 11 Kg</td>
              <td>1D8 + 2D4 + 1D6</td>
            </tr>
            <tr>
              <td>9</td>
              <td>30 Lb / 13 Kg</td>
              <td>1D8</td>
            </tr>
            <tr>
              <td>10</td>
              <td>50 Lb / 22,6 Kg</td>
              <td>5D8</td>
            </tr>
            <tr>
              <td>11</td>
              <td>100 Lb / 45 Kg</td>
              <td>4D8</td>
            </tr>
            <tr>
              <td>12</td>
              <td>150 Lb / 68 Kg</td>
              <td>7D8</td>
            </tr>
            <tr>
              <td>13</td>
              <td>200 Lb / 90 Kg</td>
              <td>6D8</td>
            </tr>
            <tr>
              <td>14</td>
              <td>250 Lb / 113 Kg</td>
              <td>7D8</td>
            </tr>
            <tr>
              <td>15</td>
              <td>350 Lb / 158 Kg</td>
              <td>8D8</td>
            </tr>
            <tr>
              <td>16</td>
              <td>400 Lb / 181 Kg</td>
              <td>9D8</td>
            </tr>
            <tr>
              <td>17</td>
              <td>450 Lb / 204 Kg</td>
              <td>10D8</td>
            </tr>
            <tr>
              <td>18</td>
              <td>500 Lb / 226 Kg</td>
              <td>12D8</td>
            </tr>
            <tr>
              <td>19</td>
              <td>700 Lb / 320 Kg</td>
              <td>14D8</td>
            </tr>
            <tr>
              <td>20</td>
              <td>1000 Lb / 453 Kg</td>
              <td>20D8</td>
            </tr>
          </tbody>
        </table>
        <p>
          En los niveles 21 y consiguientes, el peso aumenta en 200 Libras/Nivel.
        </p>
        <p>
          Por cada nivel que subas tu golpe telequinético aumenta en 5 dados.
        </p>
        <p>
          El resto de clases pueden usar también esta aptitud natural de todas las razas pero a la mitad de su poder.
        </p>
      </section>
    </div>
  );
};

export default Razas;
