import {getBidsForAuction, getDetailedViewData} from "@/app/actions/auctionAction";
import Heading from "@/app/components/Heading";
import CountdownTimer from "@/app/auctions/CountdownTimer";
import CarImage from "@/app/auctions/CarImage";
import DetailedSpecs from "@/app/auctions/details/[id]/DetailedSpecs";
import {getCurrentUser} from "@/app/actions/authActions";
import EditButton from "@/app/auctions/details/[id]/EditButton";
import {Fragment} from "react";
import DeleteButton from "@/app/auctions/details/[id]/DeleteButton";
import BidItem from "@/app/auctions/details/[id]/BidItem";
import BidList from "@/app/auctions/details/[id]/BidList";

export default async function Details({params}: {params: {id: string}}) {
    const data = await getDetailedViewData(params.id);
    const user = await getCurrentUser();
    const bids = await getBidsForAuction(params.id);
    return (
        <div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Heading title={`${data.make} ${data.model}`} />
                    {user?.username === data.seller && (
                        <Fragment>
                            <EditButton id={data.id} />
                            <DeleteButton id={data.id} />
                        </Fragment>
                    )}
                </div>
                <div className='flex gap-3'>
                    <h3 className='text-2xl font-semibold'>Time remaining:</h3>
                    <CountdownTimer auctionEnd={data.auctionEnd} />
                </div>
            </div>
            <div className='grid grid-cols-2 gap-6 mt-3'>
                <div className='w-full bg-gray-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden'>
                    <CarImage imageUrl={data.imageUrl} />
                </div>
                <BidList user={user} auction={data} />
            </div>
            <div className='mt-3 grid grid-cols-1 rounded-lg'>
                <DetailedSpecs auction={data} />
            </div>
        </div>
    )
}