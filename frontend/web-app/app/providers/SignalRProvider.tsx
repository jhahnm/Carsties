'use client'

import {ReactNode, useEffect, useState} from 'react';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {useAuctionStore} from "@/hooks/useAuctionStore";
import {useBidStore} from "@/hooks/useBidStore";
import {Auction, AuctionFinished, Bid} from "@/types";
import {User} from "next-auth";
import toast from "react-hot-toast";
import AuctionCreatedToast from "@/app/components/AuctionCreatedToast";
import {getDetailedViewData} from "@/app/actions/auctionAction";
import AuctionFinishedToast from "@/app/components/AuctionFinishedToast";
type Props = {
    children: ReactNode;
    user: User | null;
}
function SignalRProvider({children, user}: Props) {
    const [connection, setConnection] = 
        useState<HubConnection | null>(null);
    const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice)
    const addBid = useBidStore(state => state.addBid);
    const apiUrl = process.env.NODE_ENV === 'production'
        ? 'https://api.jhahn.store/notifications'
        : process.env.NEXT_PUBLIC_NOTIFY_URL;
    
    
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(apiUrl!)
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, [apiUrl]);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected to notification hub')
                    connection.on('BidPlaced', (bid: Bid) => {
                        if(bid.bidStatus.includes('Accepted')) {
                            setCurrentPrice(bid.auctionId, bid.amount);
                        }
                        addBid(bid);
                    });
                    connection.on('AuctionCreated', (auction: Auction) => {
                        if(user?.username !== auction.seller) {
                            return toast(<AuctionCreatedToast auction={auction} />, {duration: 5000})
                        }
                    });
                    connection.on('AuctionFinished', (finishedAuction: AuctionFinished) => {
                        const auction = getDetailedViewData(finishedAuction.auctionId);
                        return toast.promise(auction, {
                            loading: 'Loading',
                            success: (auction) => 
                                <AuctionFinishedToast 
                                    finishedAuction={finishedAuction} 
                                    auction={auction} 
                                />,
                            error: (err) => 'Auction finished!'
                        }, {success: {duration: 5000, icon:null}})
                    })
                }).catch(error => console.log(error));
        }
        
        return () => {
            connection?.stop();
        }
    }, [connection, setCurrentPrice, addBid, user?.username]);
    return (
        children
    );
}

export default SignalRProvider;