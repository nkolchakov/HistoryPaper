using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ListingAPI.Migrations
{
    public partial class Add_BlobLocation_To_Listing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BlobLocation",
                table: "Listings",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BlobLocation",
                table: "Listings");
        }
    }
}
