using Microsoft.EntityFrameworkCore.Migrations;

namespace WheeloSolution.Migrations
{
    public partial class user_id_aspnet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IdAspNetUser",
                table: "User",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdAspNetUser",
                table: "User");
        }
    }
}
