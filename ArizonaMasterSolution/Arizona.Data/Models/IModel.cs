namespace Arizona.Data.Models
{
    /*
     *  [TableName("Customers")]
        public sealed class Customer : ModelBase<Customer>, IModel
        {
            public int ID { get; set; }

            [Required]
            [StringLength(32, MinimumLength = 1)]
            [JsonProperty("firstName")]
            public string Firstname { get; set; }

            [Required]
            [StringLength(32, MinimumLength = 1)]
            [JsonProperty("lastName")]
            public string Lastname { get; set; }
            . 
            .
            .
            .
            [JsonProperty("lastUserID")]
            [CompositeKeyColumn]
            [UpdateIfNull]
            public int? LastUserID { get; set; }

            [JsonProperty("created")]
            [RowVerColumn]
            public DateTime Created { get; set; }

            [VirtualColumn]
            [JsonProperty("details")]
            [Ignore]
            public IList<OrderDetail> Details { get; set; }

            [JsonProperty("lastUpdatedOn")]
            public DateTime LastUpdatedOn { get; set; }

            [Ignore]
            [RowVerColumn]
            public long Ticks => Created.Ticks;

            [VirtualColumn]
            [JsonProperty("isZero")]
            public bool IsZero
            {
                get { return !(Details?.Select(d => !d.Price.Equals(0f)).Any()) ?? false; }
            }
         */

    public interface IModel
    {
        int ID { get; set; }
    }
}
