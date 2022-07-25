import "./App.css";
import React, { useEffect, useState } from "react";

const App = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("Kanto");

  useEffect(() => {
    const getAllPokemon = async () => {
      const kantoCount = 151;
      const johtoCount = 100;
      const hoennCount = 135;
      const sinnohCount = 106;
      const url =
        region === "Kanto"
          ? `https://pokeapi.co/api/v2/pokemon/?limit=${kantoCount}`
          : region === "Johto"
          ? `https://pokeapi.co/api/v2/pokemon/?limit=${johtoCount}&offset=${kantoCount}`
          : region === "Hoenn"
          ? `https://pokeapi.co/api/v2/pokemon/?limit=${hoennCount}&offset=${
              kantoCount + johtoCount
            }`
          : `https://pokeapi.co/api/v2/pokemon/?limit=${sinnohCount}&offset=${
              kantoCount + johtoCount + hoennCount
            }`;
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();

      const createPokemonObject = (result) => {
        result.forEach(async (pokemon) => {
          // console.log(_pokemon);
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          const data = await res.json();
          setAllPokemon((arr) => [...arr, data]);
        });
      };

      createPokemonObject(data.results);
      setLoading(false);
    };
    getAllPokemon();
  }, [region]);

  allPokemon.sort((a, b) => a.id - b.id);
  const pokemonNames = allPokemon.map((poke, i) => {
    const mainType = poke.types[0].type.name;
    const colorMap = {
      grass: "#a7de9b",
      bug: "#a7de9b",
      fire: "#e39d98",
      water: "#9bb4de",
      ground: "#918383",
      poison: "#a47dab",
      electric: "#cacc85",
      fairy: "#e6aae6",
      fighting: "#b8a5a6",
      psychic: "#6f4f75",
      rock: "#595759",
      ghost: "#3d2d40",
      ice: "#c0e9ed",
      dragon: "#e34d61",
    };
    const color = (arg) => {
      return colorMap[arg] || "#e3e6e4";
    };
    const theme =
      mainType === "rock" ||
      mainType === "psychic" ||
      mainType === "ground" ||
      mainType === "poison" ||
      mainType === "ghost"
        ? "#ededed"
        : "#1c1c1c";

    return (
      <div className="Pokemon" key={i} style={{ color: `${theme}` }}>
        <div
          className="Border"
          style={{
            backgroundColor: color(mainType),
          }}
        >
          <h2 className="Title">{poke.name}</h2>
          <img
            src={poke?.sprites?.front_default}
            alt={poke?.name}
            className="Avatar"
          />
          {poke.types.map((type, i) => (
            <h4 key={i} className="Type">
              {type.type.name}
            </h4>
          ))}

          <h3 className="PokeId">{poke?.id}</h3>
        </div>
      </div>
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  // const radioButtons = (
  //   <div style={{ marginTop: "1rem" }}>
  //     <button onClick={() => setRegion("Kanto")}>Kanto</button>
  //     <button onClick={() => setRegion("Johto")}>Johto</button>
  //     <button onClick={() => setRegion("Hoenn")}>Hoenn</button>
  //     <button onClick={() => setRegion("Sinnoh")}>Sinnoh</button>
  //   </div>
  // );

  return (
    <div className="App">
      {/* <div>{radioButtons}</div> */}
      <h1 className="MainTitle">Pokémon</h1>
      <div className="Container">{pokemonNames}</div>
      {region === "Kanto" && (
        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <button onClick={() => setRegion("Johto")}>See Johto Pokémon</button>
        </div>
      )}
      {region === "Johto" && (
        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <button onClick={() => setRegion("Hoenn")}>See Hoenn Pokémon</button>
        </div>
      )}
      {region === "Hoenn" && (
        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <button onClick={() => setRegion("Sinnoh")}>
            See Sinnoh Pokémon
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
