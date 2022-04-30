using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ListingAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Newspapers",
                columns: table => new
                {
                    SerialNumber = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Issued = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Edition = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Newspapers", x => new { x.SerialNumber, x.Issued, x.Edition });
                });

            migrationBuilder.CreateTable(
                name: "Listings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    CreatorId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SerialNumber = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Issued = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Edition = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Listings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Listings_Newspapers_SerialNumber_Issued_Edition",
                        columns: x => new { x.SerialNumber, x.Issued, x.Edition },
                        principalTable: "Newspapers",
                        principalColumns: new[] { "SerialNumber", "Issued", "Edition" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Listings_SerialNumber_Issued_Edition",
                table: "Listings",
                columns: new[] { "SerialNumber", "Issued", "Edition" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Listings");

            migrationBuilder.DropTable(
                name: "Newspapers");
        }
    }
}
