using Huskelapp_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Huskelapp_Backend.Data
{
    public class MyDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public MyDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
           // options.UseNpgsql(Configuration.GetConnectionString("WebApiDatabase")); //brukt til postgres
           options.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase"));
        }

        public DbSet <Todo> Todos { get; set; }
        public DbSet <Category> Categories { get; set; }
    }
}
