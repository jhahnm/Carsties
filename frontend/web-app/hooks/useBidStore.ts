import {Auction, Bid, PagedResult} from "@/types";
import {createWithEqualityFn} from "zustand/traditional";
import {shallow} from "zustand/shallow";

type State = {
    bids: Bid[]
}

type Actions = {
    setBids: (bids: Bid[]) => void
    addBids: (bid: Bid) => void
}

export const useBidStore = createWithEqualityFn<State & Actions>((set) => ({
    bids: [],
    setBids: (bids) => {
        set(() => ({
            bids
        }))
    },
    addBids: (bid) => {
        set((state) => ({
            bids: !state.bids.find(x => x.id === bid.id) ? [bid, ...state.bids] : [...state.bids]
        }))
    }
}), shallow)