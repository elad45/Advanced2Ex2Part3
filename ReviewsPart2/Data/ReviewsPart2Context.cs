using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ReviewsPart2.Models;

namespace ReviewsPart2.Data
{
    public class ReviewsPart2Context : DbContext
    {
        public ReviewsPart2Context (DbContextOptions<ReviewsPart2Context> options)
            : base(options)
        {
        }

        public DbSet<ReviewsPart2.Models.Review>? Review { get; set; }
    }
}
