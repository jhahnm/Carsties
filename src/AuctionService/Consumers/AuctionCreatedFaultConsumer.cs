using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionCreatedFaultConsumer: IConsumer<Fault<AuctionsCreated>>
{
    public async Task Consume(ConsumeContext<Fault<AuctionsCreated>> context)
    {
        Console.WriteLine("--> Consuming faulty creation");
        var exception = context.Message.Exceptions.First();
        if (exception.ExceptionType == "System.ArgumentException")
        {
            context.Message.Message.Model = "FooBar";
            await context.Publish(context.Message.Message);
        }
        else
        {
            Console.WriteLine("Not an argument exception - update error dashboard somewhere");
        }
    }
}