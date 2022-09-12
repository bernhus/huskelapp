using System.ComponentModel.DataAnnotations.Schema;

namespace Huskelapp_Backend.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string Title { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedDate { get; set; }
        public DateTime DueDate { get; set; }
        public String Category { get; set; } 
        public Boolean  IsDone { get; set; } 

    }
}