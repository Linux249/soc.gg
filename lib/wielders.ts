import { BacteriaDTO, getLocaleBacteria } from "./bacterias";
import wieldersCollection from "./collections/wielders.json";
import { SpriteDTO } from "./sprites";
import { getTerm } from "./terms";

export const getWielders = (locale: string): WielderSimpleDTO[] => {
  const wielders = wieldersCollection.map((wielder) => ({
    ...wielder,
    name: getTerm(`${wielder.faction}/${wielder.type}/Name`, locale),
    description: getTerm(
      `${wielder.faction}/${wielder.type}/Description`,
      locale
    ),
  }));
  return wielders;
};

export const getWielder = (type: string, locale: string): WielderDTO | null => {
  const wielderSrc = wieldersCollection.find(
    (wielder) => wielder.type === type
  );
  if (!wielderSrc) {
    return null;
  }

  const wielder = {
    ...wielderSrc,
    name: getTerm(`${wielderSrc.faction}/${wielderSrc.type}/Name`, locale),
    description: getTerm(
      `${wielderSrc.faction}/${wielderSrc.type}/Description`,
      locale
    ),
    units: wielderSrc.units.map((unit) => ({
      languageKey: unit.languageKey,
      name: getTerm(`${wielderSrc.faction}/${unit.languageKey}/Name`, locale),
      description: getTerm(
        `${wielderSrc.faction}/${unit.languageKey}/Description`,
        locale
      ),
      size: unit.size,
    })),
    skills: wielderSrc.skills.map((skill) => ({
      id: skill.id,
      type: skill.type,
      lore: getTerm(`Skills/${skill.type}/Lore`, locale),
      name: getTerm(`Skills/${skill.type}`, locale),
      level: skill.level,
    })),
    specializations: wielderSrc.specializations.map((specialization) =>
      getLocaleBacteria(specialization, locale)
    ),
  };
  return wielder;
};

export type WielderSimpleDTO = {
  type: string;
  faction: string;
  portrait: SpriteDTO;
  name: string;
  description: string;
};

export type WielderDTO = {
  type: string;
  faction: string;
  portrait: SpriteDTO;
  name: string;
  description: string;
  stats: {
    defense: number;
    offense: number;
    movement: number;
    viewRadius: number;
    command: number;
  };
  skills: {
    id: number;
    type: string;
    lore: string;
    name: string;
    level: number;
  }[];
  units: {
    name: string;
    description: string;
    languageKey: string;
    size: number;
  }[];
  specializations: BacteriaDTO[];
};
