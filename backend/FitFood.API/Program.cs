using Microsoft.EntityFrameworkCore;
using FitFood.API.Data;
using System;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVercel",
        policy =>
        {
            policy.WithOrigins("https://fit-food-radar.vercel.app")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "FitFood API V1");
    c.RoutePrefix = "swagger"; 
});



app.UseHttpsRedirection();

app.UseCors("AllowVercel");

app.UseAuthorization();

app.MapControllers();

app.Run();
