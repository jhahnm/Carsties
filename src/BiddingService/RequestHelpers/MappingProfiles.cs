using AutoMapper;
using BiddingService.DTOs;
using BiddingService.models;

namespace BiddingService.RequestHelpers;

public class MappingProfiles: Profile
{
    public MappingProfiles()
    {
        CreateMap<Bid, BidDto>();
        
    }
}