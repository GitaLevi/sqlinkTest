using Microsoft.EntityFrameworkCore;
using sqlinkTest.Models;
using System;

namespace sqlinkTest.Data
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext>
options) : base(options)
        {

        }


        public DbSet<PersonalDetailsModel> Users { get; set; }
        public DbSet<ProjectModel> Projects { get; set; }
    }

}
