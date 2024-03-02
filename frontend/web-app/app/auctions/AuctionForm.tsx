'use client'

import {FieldValues, useForm} from "react-hook-form";
import {Button, TextInput} from "flowbite-react";
import Input from "@/app/components/Input";
import {useEffect} from "react";
import DateInput from "@/app/components/DateInput";
import {createAuction} from "@/app/actions/auctionAction";
import {useRouter} from "next/navigation";

export default function AuctionForm() {
    const router = useRouter();
    const {
        control,
        register, 
        handleSubmit, 
        setFocus,
        formState: {isSubmitting, isValid}
    } = useForm({
        mode: "onTouched"
    });
    
    useEffect(() => {
        setFocus("make")
    }, [setFocus])
    async function onSubmit(data: FieldValues) {
        try {
            const res = await createAuction(data);
            if(res.error) {
                throw new Error(res.error);
            }
            router.push(`/auctions/details/${res.id}`);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
            <Input label='Make' name='make' control={control} rules={{required: 'Make is required'}}/>
            <Input label='Model' name='model' control={control} rules={{required: 'Model is required'}}/>
            <Input label='Color' name='color' control={control} rules={{required: 'Color is required'}}/>
            <div className='grid grid-cols-2 gap-3'>
                <Input label='Year' name='year' control={control} type='number'
                       rules={{required: 'Year is required'}}/>
                <Input label='Milage' name='milage' control={control} type='number'
                       rules={{required: 'Color is required'}}/>
            </div>
            <Input label='Image URL' name='imageUrl' control={control}
                   rules={{required: 'Image URL is required'}}/>
            <div className='grid grid-cols-2 gap-3'>
                <Input label='Reserve Price (enter 0 if no reserve)' 
                       name='reservePrice' control={control} type='number'
                       rules={{required: 'Reserve price is required'}}/>
                <DateInput 
                    label='Auction end data/time' 
                    name='auctionEnd' 
                    control={control} 
                    dateFormat='dd MMMM yyyy h:mm a'
                    showTimeSelect
                    rules={{required: 'Auction end date is required'}}/>
            </div>
            <div className='flex justify-between'>
                <Button outline color='gray'>Cancel</Button>
                <Button
                    outline
                    isProcessing={isSubmitting}
                    disabled={!isValid}
                    type='submit'
                    color='success'>Submit</Button>
            </div>
        </form>
    )
}