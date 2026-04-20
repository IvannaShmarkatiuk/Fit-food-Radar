using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FitFood.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Favorites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RestaurantId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorites", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Restaurants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Categories = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<double>(type: "float", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MapImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Restaurants", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RestaurantId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AvatarUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Restaurants",
                columns: new[] { "Id", "Address", "Categories", "ImageUrl", "MapImageUrl", "Name", "Rating" },
                values: new object[,]
                {
                    { 1, "вул. Богдана Гаврилишина, 24 (1 поверх)", "[\"\\u041A\\u0430\\u0432\\u0430\",\"\\u0412\\u0438\\u043F\\u0456\\u0447\\u043A\\u0430\",\"\\u041F\\u0435\\u0440\\u0435\\u043A\\u0443\\u0441\",\"\\u0428\\u0432\\u0438\\u0434\\u043A\\u0435 \\u0445\\u0430\\u0440\\u0447\\u0443\\u0432\\u0430\\u043D\\u043D\\u044F\"]", "/images/restaurants/bufet.jpg", "/images/maps/map_bufet.jpg", "Буфет", 4.0 },
                    { 2, "Берестейський просп., 24", "[\"\\u0424\\u0430\\u0441\\u0442\\u0444\\u0443\\u0434\",\"\\u041A\\u0443\\u0440\\u043A\\u0430\",\"\\u0411\\u0443\\u0440\\u0433\\u0435\\u0440\\u0438\",\"\\u0428\\u0432\\u0438\\u0434\\u043A\\u0435 \\u0445\\u0430\\u0440\\u0447\\u0443\\u0432\\u0430\\u043D\\u043D\\u044F\"]", "/images/restaurants/kfc.jpg", "/images/maps/map_kfc.jng", "KFC", 4.2000000000000002 },
                    { 3, "вул. Богдана Гаврилишина, 12/16", "[\"\\u0423\\u043A\\u0440\\u0430\\u0457\\u043D\\u0441\\u044C\\u043A\\u0430 \\u043A\\u0443\\u0445\\u043D\\u044F\",\"\\u0414\\u043E\\u043C\\u0430\\u0448\\u043D\\u0456 \\u0441\\u0442\\u0440\\u0430\\u0432\\u0438\",\"\\u041E\\u0431\\u0456\\u0434\"]", "/images/restaurants/nadecudogadzi.jpg", "/images/maps/map_nadecudogadzi.jpg", "На-децу-до-газди", 4.5 },
                    { 4, "Берестейський просп., 24 (Smart Plaza)", "[\"\\u0428\\u0432\\u0438\\u0434\\u043A\\u0435 \\u0445\\u0430\\u0440\\u0447\\u0443\\u0432\\u0430\\u043D\\u043D\\u044F\",\"\\u0428\\u0430\\u0443\\u0440\\u043C\\u0430\",\"\\u0424\\u0430\\u0441\\u0442\\u0444\\u0443\\u0434\",\"\\u041F\\u0435\\u0440\\u0435\\u043A\\u0443\\u0441\"]", "/images/restaurants/greekhouse.jpg", "/images/maps/map_greekhouse.jpg", "Greek House", 4.4000000000000004 },
                    { 5, "вул. Богдана Гаврилишина, 7", "[\"\\u042F\\u043F\\u043E\\u043D\\u0441\\u044C\\u043A\\u0430 \\u043A\\u0443\\u0445\\u043D\\u044F\",\"\\u0420\\u043E\\u043B\\u0438\",\"\\u0421\\u0443\\u0448\\u0456\",\"\\u041E\\u0431\\u0456\\u0434\"]", "/images/restaurants/menyamusashi.jpg", "/images/maps/map_menyamusashi.jpg", "Мenya Musashi", 4.5999999999999996 },
                    { 6, "вул. Політехнічна (Смарт Плаза)", "[\"\\u0423\\u043A\\u0440\\u0430\\u0457\\u043D\\u0441\\u044C\\u043A\\u0430 \\u043A\\u0443\\u0445\\u043D\\u044F\",\"\\u041E\\u0431\\u0456\\u0434\",\"\\u0414\\u043E\\u043C\\u0430\\u0448\\u043D\\u0456 \\u0441\\u0442\\u0440\\u0430\\u0432\\u0438\"]", "/images/restaurants/puzata_hata.jpg", "/images/maps/map_puzata.jpg", "Пузата Хата", 4.5 },
                    { 7, "Берестейський просп., 24", "[\"\\u042F\\u043F\\u043E\\u043D\\u0441\\u044C\\u043A\\u0430 \\u043A\\u0443\\u0445\\u043D\\u044F\",\"\\u0421\\u0443\\u0448\\u0456\",\"\\u0420\\u043E\\u043B\\u0438\",\"\\u041E\\u0431\\u0456\\u0434\"]", "/images/restaurants/sushiya.jpg", "/images/maps/map_sushiya.jpg", "Сушія", 4.2000000000000002 },
                    { 8, "вул. Довженка, 1", "[\"\\u0411\\u0443\\u0440\\u0433\\u0435\\u0440\\u0438\",\"\\u0424\\u0430\\u0441\\u0442\\u0444\\u0443\\u0434\",\"\\u0428\\u0432\\u0438\\u0434\\u043A\\u0435 \\u0445\\u0430\\u0440\\u0447\\u0443\\u0432\\u0430\\u043D\\u043D\\u044F\",\"\\u041F\\u0435\\u0440\\u0435\\u043A\\u0443\\u0441\"]", "/images/restaurants/yudginburger.jpg", "/images/maps/map_yudginburger.jpg", "Юджин Бургер", 4.4000000000000004 },
                    { 9, "ст. м. Політехнічний інститут", "[\"\\u0412\\u0438\\u043F\\u0456\\u0447\\u043A\\u0430\",\"\\u041A\\u0430\\u0432\\u0430\",\"\\u041F\\u0435\\u0440\\u0435\\u043A\\u0443\\u0441\",\"\\u041D\\u0430\\u043F\\u043E\\u0457\"]", "/images/restaurants/lvivcroissants.jpg", "/images/maps/map_lvivcroissants.jpg", "Львівські Круасани", 4.7999999999999998 },
                    { 10, "вул. Богдана Гаврилишина, 6", "[\"\\u041D\\u0430\\u043F\\u043E\\u0457\",\"\\u0417\\u0430\\u043A\\u0443\\u0441\\u043A\\u0438\",\"\\u041F\\u0435\\u0440\\u0435\\u043A\\u0443\\u0441\"]", "/images/restaurants/hop_hey.jpg", "/images/maps/map_hop_hey.jpg", "Hop Hey", 4.0999999999999996 },
                    { 11, "вул. Богдана Гаврилишина, 6", "[\"\\u041A\\u0430\\u0432\\u0430\",\"\\u0412\\u0438\\u043F\\u0456\\u0447\\u043A\\u0430\",\"\\u041F\\u0435\\u0440\\u0435\\u043A\\u0443\\u0441\",\"\\u041D\\u0430\\u043F\\u043E\\u0457\"]", "/images/restaurants/talk.jpg", "/images/maps/map_talk.jpg", "TALK (кав'ярня)", 4.2999999999999998 },
                    { 12, "вул. Богдана Гаврилишина, 3", "[\"\\u041A\\u0430\\u0432\\u0430\",\"\\u0412\\u0438\\u043F\\u0456\\u0447\\u043A\\u0430\",\"\\u041D\\u0430\\u043F\\u043E\\u0457\",\"\\u041F\\u0435\\u0440\\u0435\\u043A\\u0443\\u0441\"]", "/images/restaurants/coffee_gang.jpg", "/images/maps/map_coffee_gang.jpg", "Coffee Gang", 4.7999999999999998 },
                    { 13, "Берестейський просп., 24", "[\"\\u0428\\u0430\\u0443\\u0440\\u043C\\u0430\",\"\\u0424\\u0430\\u0441\\u0442\\u0444\\u0443\\u0434\",\"\\u0428\\u0432\\u0438\\u0434\\u043A\\u0435 \\u0445\\u0430\\u0440\\u0447\\u0443\\u0432\\u0430\\u043D\\u043D\\u044F\",\"\\u041A\\u0443\\u0440\\u043A\\u0430\"]", "/images/restaurants/doner.png", "/images/maps/map_doner.jpg", "Doner Маркет", 3.7000000000000002 },
                    { 14, "Берестейський просп., 32", "[\"\\u0411\\u0443\\u0440\\u0433\\u0435\\u0440\\u0438\",\"\\u0424\\u0430\\u0441\\u0442\\u0444\\u0443\\u0434\",\"\\u0428\\u0432\\u0438\\u0434\\u043A\\u0435 \\u0445\\u0430\\u0440\\u0447\\u0443\\u0432\\u0430\\u043D\\u043D\\u044F\",\"\\u041F\\u0435\\u0440\\u0435\\u043A\\u0443\\u0441\",\"\\u041D\\u0430\\u043F\\u043E\\u0457\"]", "/images/restaurants/mcdonalds.jpg", "/images/maps/map_mcdonalds.jpg", "McDonald's", 3.8999999999999999 },
                    { 15, "Берестейський просп., 26А", "[\"\\u0428\\u0430\\u0443\\u0440\\u043C\\u0430\",\"\\u0424\\u0430\\u0441\\u0442\\u0444\\u0443\\u0434\",\"\\u041F\\u0435\\u0440\\u0435\\u043A\\u0443\\u0441\",\"\\u0428\\u0432\\u0438\\u0434\\u043A\\u0435 \\u0445\\u0430\\u0440\\u0447\\u0443\\u0432\\u0430\\u043D\\u043D\\u044F\"]", "/images/restaurants/vah_shaurma.jpg", "/images/maps/map_vah_shaurma.jpg", "Vah Shaurma", 4.0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Favorites");

            migrationBuilder.DropTable(
                name: "Restaurants");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
