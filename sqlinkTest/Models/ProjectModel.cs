namespace sqlinkTest.Models
{
    public class ProjectModel
    {
        public string Id { get; set; }
        public int UserId { get; set; }
        public PersonalDetailsModel User { get; set; }
        public string Name { get; set; }
        public double Score { get; set; }
        public int DurationInDays { get; set; }
        public int BugsCount { get; set; }
        public bool MadeDadeline { get; set; }


    }
}
