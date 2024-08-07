import { useEffect, useState } from "react"
import axios from "axios";
import SpellCard from "./SpellCard";

function App() {
  const [spells, setSpells] = useState([]);
  const [charClass, setCharClass] = useState("druid");
  const [spell, setSpell] = useState(null)

  const classes = [
    "barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"
  ];

  useEffect(() => {
    const getSpells = async () => {
      try {
        const { data } = await axios.get(`https://www.dnd5eapi.co/api/classes/${charClass}/spells`)
        setSpells(data.results)
        setSpell(null)
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
    getSpells()
  }, [charClass])

  return (
    <>
      <h1>D&D Spells by Class</h1>

      <section id="main">
        <div id="spell-list">
          <label htmlFor="class-select">Choose a class: </label>
          <select id="class-select" class="nanum-gothic-coding-regular" value={charClass} onChange={(e) => setCharClass(e.target.value)}>
            {classes.map((classItem) => (
              <option key={classItem} value={classItem} >
                {classItem.charAt(0).toUpperCase() + classItem.slice(1)}
              </option>
            ))}
          </select>

          {spells.length > 0 ? (
            <ul>
              {spells.map((spell) => (
                <li key={spell.index} onClick={(e) => {
                  e.preventDefault();
                  setSpell(spell);
                }}>
                  <strong>{spell.name}</strong> <i>{spell.level}</i>
                </li>
              ))}
            </ul>
          ) : (
            <p>No spells available for this class.</p>
          )}
        </div>

        <div id="spell-card">
          {spell == null ?
            (spells.length == 0 ?
              null :
              <p>Select a spell to see details.</p>
            )
            :
            <SpellCard spell={spell} />
          }
        </div>
      </section >
    </>
  )
}

export default App
