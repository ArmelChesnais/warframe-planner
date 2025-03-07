// TYPES
import type { Resource } from './types';
import type { State } from '../dataHelpers';

// DATA
import starchart from './starchart';
import empyrean from './empyrean';
import plains_of_eidolon from './plains_of_eidolon';
import warframes from './warframes';
import quests from './quests';
import dojo from './dojo';

const _itemMap = {
  ...starchart,
  ...empyrean,
  ...plains_of_eidolon,
  ...warframes,
  ...dojo,
  ...quests,
};

export const itemMap:Record<
  keyof typeof _itemMap,
  Resource<State>
> = _itemMap;

export default Object.values(itemMap);
