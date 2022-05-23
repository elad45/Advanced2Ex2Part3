using System.ComponentModel.DataAnnotations;

namespace ReviewsPart2.Models
{
    public class Review
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        public string Feedback { get; set; }

        [Range(1,5)]
        public int Rating { get; set; }

        public DateTime Date { get; set; }
    }
}
