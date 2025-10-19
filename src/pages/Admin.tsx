import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Download, Plus, Trash2, Save } from "lucide-react";
import type { 
  AboutData, 
  ExperienceData, 
  SkillsData, 
  ProjectsData, 
  AwardsData,
  WorkExperience,
  Project,
  Award
} from "@/types/portfolio";

const Admin = () => {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [experienceData, setExperienceData] = useState<ExperienceData | null>(null);
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [awardsData, setAwardsData] = useState<AwardsData | null>(null);

  useEffect(() => {
    // Load all data
    const loadData = async () => {
      try {
        const [about, experience, skills, projects, awards] = await Promise.all([
          fetch("./data/about.json").then((r) => r.json()),
          fetch("./data/experience.json").then((r) => r.json()),
          fetch("./data/skills.json").then((r) => r.json()),
          fetch("./data/projects.json").then((r) => r.json()),
          fetch("./data/awards.json").then((r) => r.json()),
        ]);
        setAboutData(about);
        setExperienceData(experience);
        setSkillsData(skills);
        setProjectsData(projects);
        setAwardsData(awards);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load data");
      }
    };

    loadData();
  }, [navigate]);

  const downloadAllData = () => {
    const allData = {
      about: aboutData,
      experience: experienceData,
      skills: skillsData,
      projects: projectsData,
      awards: awardsData,
    };

    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio_data.json";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Data downloaded successfully!");
  };

  const saveData = (type: string, data: AboutData | ExperienceData | SkillsData | ProjectsData | AwardsData) => {
    // In a real implementation, this would save to the JSON files
    // For now, we'll just show a message
    toast.info(
      "To save changes permanently, download the data and replace the JSON files in the /public/data folder, then commit to GitHub."
    );
  };

  if (!aboutData || !experienceData || !skillsData || !projectsData || !awardsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
            <h1 className="text-3xl font-bold">Portfolio Admin</h1>
          </div>
          <Button onClick={downloadAllData}>
            <Download className="w-4 h-4 mr-2" />
            Download All Data
          </Button>
        </div>

        <Card className="p-6">
          <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              <strong>Development Only:</strong> This admin panel is only
              accessible in development mode. To update your live site, download
              the data, replace the JSON files in /public/data, and commit to
              GitHub.
            </p>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="awards">Awards</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={aboutData.name}
                    onChange={(e) =>
                      setAboutData({ ...aboutData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Age</label>
                  <Input
                    type="number"
                    value={aboutData.age}
                    onChange={(e) =>
                      setAboutData({ ...aboutData, age: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Headline</label>
                  <Input
                    value={aboutData.headline}
                    onChange={(e) =>
                      setAboutData({ ...aboutData, headline: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea
                    value={aboutData.bio}
                    onChange={(e) =>
                      setAboutData({ ...aboutData, bio: e.target.value })
                    }
                    rows={5}
                  />
                </div>
                <Button onClick={() => saveData("about", aboutData)}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Work Experience</h3>
                {experienceData.work.map((job: WorkExperience, index: number) => (
                  <Card key={job.id} className="p-4 mb-4">
                    <div className="grid gap-3">
                      <Input
                        placeholder="Company"
                        value={job.company}
                        onChange={(e) => {
                          const newWork = [...experienceData.work];
                          newWork[index].company = e.target.value;
                          setExperienceData({ ...experienceData, work: newWork });
                        }}
                      />
                      <Input
                        placeholder="Position"
                        value={job.position}
                        onChange={(e) => {
                          const newWork = [...experienceData.work];
                          newWork[index].position = e.target.value;
                          setExperienceData({ ...experienceData, work: newWork });
                        }}
                      />
                      <Input
                        placeholder="Period"
                        value={job.period}
                        onChange={(e) => {
                          const newWork = [...experienceData.work];
                          newWork[index].period = e.target.value;
                          setExperienceData({ ...experienceData, work: newWork });
                        }}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const newWork = experienceData.work.filter(
                            (_, i: number) => i !== index
                          );
                          setExperienceData({ ...experienceData, work: newWork });
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              <Button onClick={() => saveData("experience", experienceData)}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Edit skill categories and proficiency levels
              </p>
              <Button onClick={() => saveData("skills", skillsData)}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <div className="mb-4">
                {projectsData.projects.map((project: Project, index: number) => (
                  <Card key={project.id} className="p-4 mb-4">
                    <div className="grid gap-3">
                      <Input
                        placeholder="Project Title"
                        value={project.title}
                        onChange={(e) => {
                          const newProjects = [...projectsData.projects];
                          newProjects[index].title = e.target.value;
                          setProjectsData({
                            ...projectsData,
                            projects: newProjects,
                          });
                        }}
                      />
                      <Textarea
                        placeholder="Short Description"
                        value={project.shortDescription}
                        onChange={(e) => {
                          const newProjects = [...projectsData.projects];
                          newProjects[index].shortDescription = e.target.value;
                          setProjectsData({
                            ...projectsData,
                            projects: newProjects,
                          });
                        }}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const newProjects = projectsData.projects.filter(
                            (_, i: number) => i !== index
                          );
                          setProjectsData({
                            ...projectsData,
                            projects: newProjects,
                          });
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              <Button onClick={() => saveData("projects", projectsData)}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </TabsContent>

            <TabsContent value="awards" className="space-y-4">
              <div className="mb-4">
                {awardsData.awards.map((award: Award, index: number) => (
                  <Card key={award.id} className="p-4 mb-4">
                    <div className="grid gap-3">
                      <Input
                        placeholder="Title"
                        value={award.title}
                        onChange={(e) => {
                          const newAwards = [...awardsData.awards];
                          newAwards[index].title = e.target.value;
                          setAwardsData({ ...awardsData, awards: newAwards });
                        }}
                      />
                      <Input
                        placeholder="Issuer"
                        value={award.issuer}
                        onChange={(e) => {
                          const newAwards = [...awardsData.awards];
                          newAwards[index].issuer = e.target.value;
                          setAwardsData({ ...awardsData, awards: newAwards });
                        }}
                      />
                      <Input
                        placeholder="Date"
                        value={award.date}
                        onChange={(e) => {
                          const newAwards = [...awardsData.awards];
                          newAwards[index].date = e.target.value;
                          setAwardsData({ ...awardsData, awards: newAwards });
                        }}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          const newAwards = awardsData.awards.filter(
                            (_, i: number) => i !== index
                          );
                          setAwardsData({ ...awardsData, awards: newAwards });
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              <Button onClick={() => saveData("awards", awardsData)}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
