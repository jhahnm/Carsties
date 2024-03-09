'use client'

import React from 'react';
import {FieldValues, useForm} from "react-hook-form";
import {useBidStore} from "@/hooks/useBidStore";
import {placeBidForAuction} from "@/app/actions/auctionAction";
import {numberWithCommas} from "@/app/lib/numberWithComma";
import toast from "react-hot-toast";

type Props = {
    auctionId: string;
    highBid: number;
}

function BidForm({auctionId, highBid}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();
    const addBid = useBidStore(state => state.addBid);

    function onSubmit(data: FieldValues) {
         placeBidForAuction(auctionId, +data.amount).then(bid => {
             if(bid.error) throw bid.error;
             addBid(bid);
             reset();
         }).catch(err => toast.error(err.message));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex items-center border-2 rounded-lg py-2'>
            <input 
                type="number"
                {...register('amount')}
                className='input-custom text-sm text-gray-600'
                placeholder={`Enter you bid (minimum bid is $${numberWithCommas(highBid + 1)})`}
            />
        </form>
    );
}

export default BidForm;