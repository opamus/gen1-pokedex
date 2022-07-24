import "./App.css";
import React, { useEffect, useState } from "react";

const App = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const pokemonCount = 151;
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${pokemonCount}`;

  const getAllPokemon = async () => {
    const res = await fetch(url);
    const data = await res.json();

    const createPokemonObject = (result) => {
      result.forEach(async (_pokemon, i) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
      });
    };

    createPokemonObject(data.results);
  };

  // console.log(allPokemons);
  useEffect(() => {
    getAllPokemon();
  }, []);

  // console.log(allPokemons);

  allPokemons.sort((a, b) => a.id - b.id);
  const pokemonNames = allPokemons.map((poke, i) => {
    const type = poke.types[0].type.name;
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
      type === "rock" ||
      type === "psychic" ||
      type === "ground" ||
      type === "poison" ||
      type === "ghost"
        ? "#ededed"
        : "#1c1c1c";

    console.log(theme);
    return (
      <div className="Pokemon" key={i} style={{ color: `${theme}` }}>
        <div
          className="Border"
          style={{
            backgroundColor: color(type),
          }}
        >
          <h2 className="Title">
            {String(poke.name).charAt(0).toUpperCase() + poke.name.slice(1)}
          </h2>
          <img
            src={poke?.sprites?.front_default}
            alt={poke?.name}
            className="Avatar"
          />
          <h3 className="Type">{`Type: ${poke?.types[0].type.name}`}</h3>
          <h3 className="PokeId">{poke?.id}</h3>
        </div>
      </div>
    );
  });

  return (
    <div className="App">
      <h1 className="MainTitle">1st Gen Pokémon</h1>
      <div className="Container">{pokemonNames}</div>
    </div>
  );
};

export default App;
