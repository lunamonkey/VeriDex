import { createAsyncAction } from 'typesafe-actions';

import { Collectible, ThunkCreator } from '../../util/types';
import { getEthAccount, getNetworkId } from '../selectors';

export const fetchAllCollectiblesAsync = createAsyncAction(
    'collectibles/ALL_COLLECTIBLES_fetch_request',
    'collectibles/ALL_COLLECTIBLES_fetch_success',
    'collectibles/ALL_COLLECTIBLES_fetch_failure',
)<
    void,
    {
        collectibles: Collectible[];
        ethAccount: string;
    },
    Error
>();

export const getAllCollectibles: ThunkCreator = () => {
    return async (dispatch, getState, { getCollectiblesMetadataGateway }) => {
        dispatch(fetchAllCollectiblesAsync.request());
        try {
            const state = getState();
            const networkId = getNetworkId(state);
            const ethAccount = getEthAccount(state);
            const collectiblesMetadataGateway = getCollectiblesMetadataGateway();
            const collectibles = await collectiblesMetadataGateway.fetchAllCollectibles(networkId);
            dispatch(fetchAllCollectiblesAsync.success({ collectibles, ethAccount }));
        } catch (err) {
            dispatch(fetchAllCollectiblesAsync.failure(err));
        }
    };
};