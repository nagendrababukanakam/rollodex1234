
import { monsterActionTypes } from "./monster.type";

//search monster action creator geeting us payload of username from the home component

export const searchMonster =(username) =>({
    type : monsterActionTypes.SEARCH_MONSTER,

    payload : username
})
