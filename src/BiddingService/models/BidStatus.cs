using MongoDB.Entities;

namespace BiddingService.models;

public enum BidStatus
{
    Accepted,
    AcceptedBelowReserve,
    TooLow,
    Finished
}