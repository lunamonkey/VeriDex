import { getType } from 'typesafe-actions';

import { CollectiblesState } from '../../util/types';
import * as actions from '../actions';
import { RootAction } from '../reducers';

const initialCollectibles: CollectiblesState = {
    userCollectibles: {},
    allCollectibles: {},
};

export function collectibles(state: CollectiblesState = initialCollectibles, action: RootAction): CollectiblesState {
    switch (action.type) {
        case getType(actions.fetchAllCollectiblesAsync.success):
            const allCollectibles = {
                ...state.allCollectibles,
            };
            const userCollectibles = {
                ...state.userCollectibles,
            };

            // tslint:disable-next-line:no-shadowed-variable
            const { collectibles, ethAccount } = action.payload;
            collectibles.forEach(collectible => {
                allCollectibles[collectible.tokenId] = collectible;

                if (collectible.currentOwner.toLowerCase() === ethAccount.toLowerCase()) {
                    userCollectibles[collectible.tokenId] = collectible;
                }
            });
            return { ...state, allCollectibles, userCollectibles };
        default:
            return state;
    }
}