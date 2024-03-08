'use client'

import React, {Fragment, useEffect, useState} from 'react';
import {User} from "next-auth";
import {Auction, Bid} from "@/types";
import {useBidStore} from "@/hooks/useBidStore";
import {getBidsForAuction} from "@/app/actions/auctionAction";
import toast from "react-hot-toast";
import Heading from "@/app/components/Heading";
import BidItem from "@/app/auctions/details/[id]/BidItem";
import {numberWithCommas} from "@/app/lib/numberWithComma";
import EmptyFilter from "@/app/components/EmptyFilter";
import BidForm from "@/app/auctions/details/[id]/BidForm";

type Props = {
    user: User | null
    auction: Auction
}

function BidList({user, auction}: Props) {
    const [loading, setLoading] = useState(true);
    const bids = useBidStore(state => state.bids);
    const setBids = useBidStore(state => state.setBids);
    const highBid = bids.reduce((prev, current) => prev > current.amount 
        ? prev 
        : current.amount, 0);
    
    useEffect(() => {
        getBidsForAuction(auction.id)
            .then((res: any) => {
                if(res.error) {
                    throw res.error;
                }
                setBids(res as Bid[]);
            }).catch(err => {
                toast.error(err.message)
            }).finally(() => setLoading(false))
    }, [auction.id, setLoading, setBids])
    
    if(loading) return <span>Loading bids...</span>
    return (
        <div className='rounded-lg shadow-md'>
            <div className='py-2 px-4 bg-white'>
                <div className='sticky top-0 bg-white p-2'>
                    <Heading title={`Current high bid is $${numberWithCommas(highBid)}`}/>
                </div>
            </div>
            <div className='overflow-auto h-[400px] flex flex-col-reverse px-2'>
                {bids.length === 0 ? (
                    <EmptyFilter title='No bids for this item' 
                         subtitle='Please feel free to make a bid'/>
                ) : (
                    <Fragment>
                        {bids.map(bid => (
                            <BidItem key={bid.id} bid={bid}/>
                        ))}
                    </Fragment>
                )}
            </div>
            <div className='px-2 pb-2 text-gray-500'>
                <BidForm auctionId={auction.id} highBid={highBid} />
            </div>
        </div>
    );
}

export default BidList;