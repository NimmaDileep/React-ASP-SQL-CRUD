namespace crud_be.Models
{
    public class Employee
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public int Age { get; set; }
        public string? Country { get; set; }

        public string? Position { get; set; }

        public int Wage { get; set; }
    }
}
