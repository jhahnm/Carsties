import {Auction, PagedResult} from "@/types";
import {createWithEqualityFn} from "zustand/traditional";
import {shallow} from "zustand/shallow";

type State = {
    auctions: Auction[]
    totalCount: number
    pageCount: number
}

type Actions = {
    setData: (data: PagedResult<Auction>) => void
    setCurrentPrice: (auctionId: string, amound: number) => void
}

const initialState: State = {
    auctions: [],
    pageCount: 0,
    totalCount: 0
}

export const useAuctionStore = createWithEqualityFn<State & Actions>((set) => ({
    ...initialState,
    setData: (data) => {
        set(() => ({
            auctions: data.results,
            totalCount: data.totalCount,
            pageCount: data.pageCount
        }))
    },
    setCurrentPrice: (auctionId, amount) => {
        set((state) => ({
            auctions: state.auctions.map((auction) => auction.id === auctionId
            ? {...auction, currentHighBid: amount} : auction)
        }))
    }
}), shallow)