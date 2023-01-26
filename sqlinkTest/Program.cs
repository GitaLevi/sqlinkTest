using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using sqlinkTest.Data;
using sqlinkTest.Repositories;
using sqlinkTest.Repositories.Interfaces;
using sqlinkTest.Services;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IGenrateTokenService, GenrateTokenService>();
builder.Services.AddScoped<IUserDetailsRepository, UserDetailsRepository>();

builder.Services.AddDbContext<ApiContext>
(o => o.UseInMemoryDatabase("SqlinkTestDb"));


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey
        (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

////AddTestData(app);

app.UseHttpsRedirection();
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();







//static async Task AddTestData(WebApplication app)
//{
//    var scope = app.Services.CreateScope();
//    var db = scope.ServiceProvider.GetService<ApiContext>();

//    //var customer1 = new Customer
//    //{
//    //    CustomerID = "Customer ID 1",
//    //    CustomerName = "Customer Name 1"
//    //};

//    //var customer2 = new Customer
//    //{
//    //    CustomerID = "Customer ID 2",
//    //    CustomerName = "Customer Name 2"
//    //};

//    //var customer3 = new Customer
//    //{
//    //    CustomerID = "Customer ID 3",
//    //    CustomerName = "Customer Name 3"
//    //};

//    //db.Customers.Add(customer1);
//    //db.Customers.Add(customer2);
//    //db.Customers.Add(customer3);

//    //db.SaveChangesAsync();
//}
