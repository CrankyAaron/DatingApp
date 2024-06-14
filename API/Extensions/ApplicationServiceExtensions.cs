using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            var connectionString = config.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");
            if (string.IsNullOrEmpty(connectionString))
            {
                services.AddDbContext<DataContext>(opt =>
                    opt.UseSqlServer(config.GetConnectionString("DefaultConnection")));
            }
            else
            {
                services.AddDbContext<DataContext>(opt =>
                {
                    services.AddDbContext<DataContext>(opt => opt.UseSqlServer(connectionString));
                });
            }

            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();
            return services;
        }
    }
}