import axios from "axios";
import { useState, useEffect } from "react";

const SpellCard = ({ spell }) => {
  const [spellDetails, setSpellDetails] = useState(null);

  useEffect(() => {
    if (!spell || !spell.index) return;

    const getSpell = async () => {
      try {
        console.log(spell.index);
        const { data } = await axios.get(`https://www.dnd5eapi.co/api/spells/${spell.index}`);
        setSpellDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Spell Card error: ", error);
      }
    };
    getSpell();
  }, [spell]);

  return (
    <>
      {spellDetails ? (
        <>
          <h1>{spellDetails.name}</h1>
          <div id="spell-description">
            <h3>Description</h3>
            {spellDetails.desc.map((line, index) =>
              <p key={index + line.slice(0, 5)}>{line}</p>
            )}
          </div>
          <ul id="spell-stats">
            <li>Level: {spellDetails.level}</li>
            <li>Range: {spellDetails.range}</li>
            <li>Ritual: {spellDetails.ritual ? "Yes" : "No"}</li>
            <li>Duration: {spellDetails.duration}</li>
            <li>Concentration: {spellDetails.concentration ? "Yes" : "No"}</li>
            <li>
              Components:
              <ul>
                {spellDetails.components.map((line, index) => (
                  <li key={index} style={{ paddingLeft: '20px' }}>
                    {line}
                  </li>
                ))}
              </ul>
            </li>
            <li>Casting Time: {spellDetails.casting_time}</li>
            <li>School Name: {spellDetails.school.name}</li>
          </ul>

          {spellDetails.higher_level.length > 0 ?
            <div>
              <h3>Higher Levels</h3>
              {spellDetails.higher_level.map((line, index) =>
                <p key={index + line.slice(0, 5)}>{line}</p>
              )}</div>
            :
            <p></p>}

        </>
      ) : (
        <p>Select a spell to see details.</p>
      )
      }
    </>
  );
};

export default SpellCard;
