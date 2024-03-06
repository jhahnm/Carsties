using BiddingService.models;
using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Consumers;

public class AuctionCreatedConsumer : IConsumer<AuctionsCreated>
{
    public async Task Consume(ConsumeContext<AuctionsCreated> context)
    {
        var auction = new Auction
        {
            ID = context.Message.Id.ToString(),
            Seller = context.Message.Seller,
            AuctionEnd = context.Message.AuctionEnd,
            ReservePrice = context.Message.ReservePrice
        };
        
        await auction.SaveAsync();
    }
}